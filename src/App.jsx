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
import { useState, useEffect } from 'react'
import { betAttempted, makeConnection } from './Services/Connection'
import { numberToString, stringToNumber } from './Utils/numberParser'
import { sendMove, registerWsCallback, sendGameStart } from './Services/Connection'
import validRelativePreviousBet from './Utils/validRelativePreviousBet'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import LobbyPage from './Components/LobbyPage'
import GameDisplay from './Components/GameDisplay'

makeConnection()
function App() {

  // const betRankBox = document.querySelector(".bet_multiplier input")
  const [selectedIndex, setSelectedIndex] = useState(undefined) // should really be selectedValue
  const [currentPlayerHand, setCurrentPlayerHand] = useState([])
  const [movesMade, setMovesMade] = useState([])
  const [playerClientIndex, setClientPlayerIndex] = useState(undefined)
  const [allCurrentHands, setAllCurrentHands] = useState([])
  const [currentTurn, setCurrentTurn] = useState(undefined)
  const [roundRevealHands, setRoundRevealHands] = useState([])
  const [roundRevealBet, setRoundRevealBet] = useState(undefined)
  const [betRankBoxValue, setBetRankBoxValue] = useState(1)
  const [currentHoveredValue, setCurrentHoveredValue] = useState(undefined)
  const [lobbyPlayerCount, setLobbyPlayerCount] = useState(undefined) // will probably be calculated from some array of lobby players in the future
  const [lobbyID, setLobbyID] = useState(undefined)
  const [showingPreviousHand, setShowingPreviousHand] = useState(false)
  const [isPalacifoRound, setIsPalacifoRound] = useState(false) // could be undefined, but false is alright
  const navigate = useNavigate()
  

  let wsStateDictionary = {
    selectedIndex, setSelectedIndex,
    currentPlayerHand, setCurrentPlayerHand,
    movesMade, setMovesMade,
    playerClientIndex, setClientPlayerIndex,
    allCurrentHands, setAllCurrentHands,
    currentTurn, setCurrentTurn,
    roundRevealHands, setRoundRevealHands,
    roundRevealBet, setRoundRevealBet,
    betRankBoxValue, setBetRankBoxValue,
    lobbyPlayerCount, setLobbyPlayerCount,
    lobbyID, setLobbyID,
    showingPreviousHand, setShowingPreviousHand,
    isPalacifoRound, setIsPalacifoRound,
    navigate
  }
  // useEffect(() => { makeConnection(wsStateDictionary) }, [])
  
  registerWsCallback(wsStateDictionary)


  // allCurrentHands[playerClientIndex] = currentPlayerHand

  // let isMyTurn = (playerClientIndex == currentTurn)
  // let canMakeBet = betRankBoxValue && selectedIndex && (validRelativePreviousBet(betRankBoxValue, selectedIndex, movesMade[0]?.MoveMade.Value))
  // let canDudo = movesMade[0]?.MoveMade.MoveType == "Bet"
  // let canCalza = (allCurrentHands.filter(x => x.length).length > 2) && canDudo
  // let lastBetRankMade = movesMade[1]?.MoveMade.Value.FaceVal

  let gameStateDictionary = {
    currentPlayerHand, currentHoveredValue, playerClientIndex, currentTurn, allCurrentHands, selectedIndex, setSelectedIndex, 
    betRankBoxValue, setBetRankBoxValue,
    roundRevealHands, roundRevealBet, 
    setCurrentHoveredValue, 
    movesMade,
    showingPreviousHand, setShowingPreviousHand,
    isPalacifoRound
  }

  // console.log(`The current value of selectedIndex is ${selectedIndex}`);
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/lobby/" element={<LobbyPage numPlayers={lobbyPlayerCount} navigate={navigate} LobbyID={lobbyID}/>}></Route>
      <Route path="/game/" element={<GameDisplay gameStateDictionary={gameStateDictionary}/>}>
      </Route>
    </Routes>  
  )
}

export default App
