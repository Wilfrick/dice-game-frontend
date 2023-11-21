import './styles.css'
import GameArea from './Components/GameArea'
// import DiceFace from './Compenents/DiceFace'
import Hand from './Components/Hand'
import LabelledHand from './Components/LabelledHand'
import Bet from './Components/Bet'
import Dudo from './Components/Dudo'
import Calza from './Components/Calza'
import PlayerAction from './Components/PlayerAction'
import BetSelector from './Components/BetSelector'
import { useState } from 'react'
import { betAttempted } from './Services/Connection'
import { numberToString, stringToNumber } from './Utils/numberParser'
import { sendMove, registerWsCallback, sendGameStart } from './Services/Connection'
import validRelativePreviousBet from './Utils/validRelativePreviousBet'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import LobbyPage from './Components/LobbyPage'

function App() {

  // const betRankBox = document.querySelector(".bet_multiplier input")
  const [selectedIndex, setSelectedIndex] = useState(undefined) // should really be selectedValue
  const [currentPlayerHand, setCurrentPlayerHand] = useState([])
  const [movesMade, setMovesMade] = useState([])
  const [playerClientIndex, setClientPlayerIndex] = useState(undefined)
  const [allCurrentHands, setAllCurrentHands] = useState([])
  const [currentTurn, setCurrentTurn] = useState(undefined)
  const [roundRevealHands, setRoundRevealHands] = useState([])
  const [betRankBoxValue, setBetRankBoxValue] = useState(1)
  const [currentHoveredValue, setCurrentHoveredValue] = useState(undefined)
  const [lobbyPlayerCount, setLobbyPlayerCount] = useState(undefined) // will probably be calculated from some array of lobby players in the future
  const [lobbyID, setLobbyID] = useState(undefined)
  const navigate = useNavigate()

  let wsStateDictionary = {
    selectedIndex, setSelectedIndex,
    currentPlayerHand, setCurrentPlayerHand,
    movesMade, setMovesMade,
    playerClientIndex, setClientPlayerIndex,
    allCurrentHands, setAllCurrentHands,
    currentTurn, setCurrentTurn,
    roundRevealHands, setRoundRevealHands,
    lobbyPlayerCount, setLobbyPlayerCount,
    lobbyID, setLobbyID,
    navigate
  }
  registerWsCallback(wsStateDictionary)

  allCurrentHands[playerClientIndex] = currentPlayerHand

  let isMyTurn = (playerClientIndex == currentTurn)
  let canMakeBet = betRankBoxValue && selectedIndex && (validRelativePreviousBet(betRankBoxValue, selectedIndex, movesMade[0]?.MoveMade.Value))
  let canCalza = allCurrentHands.filter(x => x.length).length > 2
  let lastBetRankMade = movesMade[1]?.MoveMade.Value.FaceVal

  // console.log(`The current value of selectedIndex is ${selectedIndex}`);
  return (

    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/lobby/" element={<LobbyPage numPlayers={lobbyPlayerCount} navigate={navigate} LobbyID={lobbyID}/>}></Route>
      <Route path="/game/" element={<>
        <GameArea>

          <div className={`hands${currentHoveredValue ? " " + currentHoveredValue : ""} selected`}>
            <p>You are player: {playerClientIndex}. It is currently Player {currentTurn}'s turn</p>
            {/* <Hand values={["one", "two", "three", "three", "four"]}></Hand>
          <Hand values={currentPlayerHand}></Hand> */}
            {allCurrentHands.map(
              (hand, i) => <LabelledHand values={hand} playerName={i} key={i}></LabelledHand>
            )}
          </div>
          <div className={`hands${lastBetRankMade ? " " + numberToString(lastBetRankMade) : ""} selected`}> {/* surly there is a better way than a ? : */}
            <p>Starting old hands</p>
            {roundRevealHands.map(
              (hand, j) => <LabelledHand values={hand} playerName={j} key={j + 20}></LabelledHand>
            )}
          </div>
          <div className="action_display">
            <div className="my_actions">
              <BetSelector selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
                betRankBoxValue={betRankBoxValue} setBetRankBoxValue={setBetRankBoxValue} setCurrentHoveredValue={setCurrentHoveredValue} />
              <button className="Make_Bet" type="button" onClick={() => betAttempted(betRankBoxValue, selectedIndex)} disabled={!(isMyTurn && canMakeBet)}>Make Bet</button>
              <button className="Dudo" type="button" onClick={() => sendMove("Dudo")} disabled={!isMyTurn}>Dudo</button>
              <button className="Calza" type="button" onClick={() => sendMove("Calza")} disabled={!(isMyTurn && canCalza)}>Calza</button>
            </div>
            <div className="bet_history">
              {movesMade.map(
                (move, i) => <PlayerAction MoveMade={move.MoveMade} PlayerIndex={move.PlayerIndex} key={i} />
              )}
              <Bet player_identifier="Jim" bet_multiplier={3} value="two" />
              <Bet player_identifier="Alexander the first" bet_multiplier={3} value="three" />


              <Dudo />
              <div className="action dudo">
                <p className="player_identifier">Player: 5</p>
                Dudo!</div>

              <div className="action calza">
                <p className="player_identifier">Player: 1</p>
                Calza!</div>

            </div>
          </div>
        </GameArea >
        <div className='my_actions'>
          <button className="start_game" type="button" onClick={() => { sendGameStart(); console.log("StartGameButton") }}>Start Game</button>
        </div>
      </>}>
      </Route>
    </Routes>
  )
}

export default App
