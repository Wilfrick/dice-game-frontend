import './styles.css'
import GameArea from './Components/GameArea'
// import DiceFace from './Compenents/DiceFace'
import Hand from './Components/Hand'
import Bet from './Components/Bet'
import Dudo from './Components/Dudo'
import Calza from './Components/Calza'
import PlayerAction from './Components/PlayerAction'
import BetSelector from './Components/BetSelector'
import { useState } from 'react'
import { betAttempted } from './Services/Connection'
import { numberToString, stringToNumber } from './Utils/numberParser'
import { sendMove, registerWsCallback, sendGameStart } from './Services/Connection'

function App() {

  const betRankBox = document.querySelector(".bet_multiplier input")
  const [selectedIndex, setSelectedIndex] = useState(undefined)
  const [currentPlayerHand, setCurrentPlayerHand] = useState([])
  const [movesMade, setMovesMade] = useState([])
  const [playerIndex, setPlayerIndex] = useState(undefined)
  const [allCurrentHands, setAllCurrentHands] = useState([])

  
  registerWsCallback(setCurrentPlayerHand, movesMade, setMovesMade, setPlayerIndex)





  // console.log(`The current value of selectedIndex is ${selectedIndex}`);
  return (
    <>
      <GameArea>
        <div className="hands six selected">
          <Hand values={["one", "two", "three", "three", "four"]}></Hand>
          <Hand values={currentPlayerHand}></Hand>

        </div>
        <div className="action_display">
          <div className="my_actions">
            <BetSelector setSelectedIndex={setSelectedIndex} />
            <button className="Make_Bet" type="button" onClick={() => betAttempted(betRankBox.value, selectedIndex)}>Make Bet</button>
            <button className="Dudo" type="button" onClick={() => sendMove("Dudo")}>Dudo</button>
            <button className="Calza" type="button" onClick={() => sendMove("Calza")}>Calza</button>
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
      </GameArea>
      <div className='my_actions'>
        <button className="start_game" type="button" onClick={() => { sendGameStart(); console.log("StartGameButton") }}>Start Game</button>
      </div>
    </>
  )
}

export default App
