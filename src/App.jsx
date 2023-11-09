import './styles.css'
import GameArea from './Components/GameArea'
// import DiceFace from './Compenents/DiceFace'
import Hand from './Components/Hand'
import Bet from './Components/Bet'
import { useState } from 'react'

import {numberToString, stringToNumber} from './Utils/numberParser'

const ws = new WebSocket("ws://localhost:12345/ws");




function MakeBet() {
  console.log("Hi from Jim")
}

function sendMove(playerMove) {
  let GameID = 1234
  let PlayerID = 123
  console.log(`Sending ${JSON.stringify(playerMove)}`)
  // let Contents = { GameID, PlayerID, MoveSTR: playerMove }
  let Contents = {MoveType: "Bet", Value: playerMove}
  let str_move = JSON.stringify({ "TypeDescriptor": "PlayerMove", "Contents": Contents })
  ws.send(str_move)

}


function App() {

  const betRankBox = document.querySelector(".bet_multiplier input")
  const [selectedIndex, setSelectedIndex] = useState(undefined)
  const [currentPlayerHand, setCurrentPlayerHand] = useState([])
  const [movesMade, setMovesMade] = useState([])


  ws.onmessage = (event) => {
    console.log(event.data);
    console.log(JSON.parse(event.data));
    let parsedMessage = JSON.parse(event.data)
    
    switch (parsedMessage?.TypeDescriptor) {
      case "PlayerHand": 
        let handData = parsedMessage.Contents.map(numberToString)
        setCurrentPlayerHand(handData)
        break
      
    
      case "RoundUpdate": 
        console.log(`movesMade: ${movesMade}`);
        console.log(parsedMessage.Contents);
        setMovesMade([parsedMessage.Contents, ...movesMade])
        // setBetsMade([parsedMessage.Contents.Value])
        break
      
    
    }
    
    // if (parsedMessage['TypeDescriptor'] == 'PlayerHand') {
      
    // }
    // log("Received " + event.data)
  }

  function betAttempted() {
    // const betButton = event.target


    console.log(`Bet Attempted: ${betRankBox.value} ${selectedIndex}`)
    if (Number(betRankBox.value) < 1) {
      console.log("Rank too low")
    }
    // other validation here


    //Passed all validation
    // let playerMove = betRankBox.value + " " + selectedIndex
    let playerMove = { NumDice: Number(betRankBox.value), FaceVal: stringToNumber(selectedIndex) }
    sendMove(playerMove)
  }


  console.log(`The current value of selectedIndex is ${selectedIndex}`);
  return (
    <GameArea>
      <div className="hands six selected">
        <Hand values={["one", "two", "three", "three", "four"]}></Hand>
        <Hand values={currentPlayerHand}></Hand>
        {/* <Hand values={["three", "three", "four", "five", "six"]}></Hand>
        <Hand values={["two", "two", "three", "three", "six"]}></Hand>
        <Hand values={["one", "one", "two", "five", "six"]}></Hand>
        <Hand values={["one", "two", "two", "four", "six"]}></Hand>
        <Hand values={["three", "four", "four", "four", "five"]}></Hand>
        <Hand values={["one", "one", "two", "two", "four"]}></Hand> */}
      </div>
      <div className="action_display">
        <div className="my_actions">
          <div className="bet">
            <div className="bet_multiplier"><input type="number" name="rank" />x</div>
            <Hand values={["one", "two", "three", "four", "five", "six"]} selectable={true} setSelectedIndex={setSelectedIndex}></Hand>
          </div>
          <button className="Make_Bet" type="button" onClick={() => betAttempted()}>Make Bet</button>
          <button className="Dudo" type="button" onClick={() => sendMove("Dudo")}>Dudo</button>
          <button className="Calza" type="button" onClick={() => sendMove("Calza")}>Calza</button>
        </div>
        <div className="other_actions">
          {movesMade.map(({
            MoveMade: {
              MoveType,
              Value: {
                NumDice,
                FaceVal } },
            PlayerIndex }, i) =>
            <Bet player_identifier={PlayerIndex.toString()} bet_multiplier={NumDice} value={numberToString(FaceVal)} key={i} />)}
          <Bet player_identifier="Jim" bet_multiplier={3} value="two"/>
          <Bet player_identifier="Alex" bet_multiplier={3} value="three"/>



          <div className="action dudo">
            <p className="player_identifier">Player: 5</p>
            Dudo!</div>

          <div className="action calza">
            <p className="player_identifier">Player: 1</p>
            Calza!</div>

        </div>
      </div>
    </GameArea>
  )
}

export default App
