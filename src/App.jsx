import './styles.css'
import GameArea from './Compenents/GameArea'
// import DiceFace from './Compenents/DiceFace'
import Hand from './Compenents/Hand'
import { useState } from 'react'

const ws = new WebSocket("ws://localhost:12345/echo");





function MakeBet() { 
  console.log("Hi from Jim")
}

function sendMove(playerMove) {
  let GameID = 1234
  let PlayerID = 123
  console.log(`Sending ${playerMove}`)
  let str_move = JSON.stringify({GameID, PlayerID, MoveSTR: playerMove})
  ws.send(str_move)
  
}


function App() {

  const betRankBox = document.querySelector(".bet_multiplier input")
  const [selectedIndex, setSelectedIndex] = useState(undefined)
  const [otherPlayerActions, setOtherPlayerActions] = useState([]) // will be used by betAttempted to check that the bet we want to make is acceptable

  function betAttempted() {
    // const betButton = event.target
    

    console.log(`Bet Attempted: ${betRankBox.value} ${selectedIndex}`)
    if (Number(betRankBox.value) < 1) {
      console.log("Rank too low")
    }
    // other validation here

    
    //Passed all validation
    let playerMove = betRankBox.value + " " + selectedIndex
    sendMove(playerMove)
  }
  

  console.log(`The current value of selectedIndex is ${selectedIndex}`);
  return (
    <GameArea>
      <div className="hands six selected">
        <Hand values={["one", "two", "three", "three", "four"]}></Hand>
        <Hand values={["three", "three", "four", "five", "six"]}></Hand>
        <Hand values={["two", "two", "three", "three", "six"]}></Hand>
        <Hand values={["one", "one", "two", "five", "six"]}></Hand>
        <Hand values={["one", "two", "two", "four", "six"]}></Hand>
        <Hand values={["three", "four", "four", "four", "five"]}></Hand>
        <Hand values={["one", "one", "two", "two", "four"]}></Hand>
      </div>
      <div className="action_display">
        <div className="my_actions">
          <div className="bet">
            <div className="bet_multiplier"><input type="number" name="rank" />x</div>
            <Hand values={["one", "two", "three", "four", "five", "six"]} selectable={true} setSelectedIndex={setSelectedIndex}></Hand>
          </div>
          <button className="Make_Bet" type="button" onClick ={() => betAttempted()}>Make Bet</button>
          <button className="Dudo" type="button" onClick={() => sendMove("Dudo")}>Dudo</button>
          <button className="Calza" type="button" onClick={() => sendMove("Calza")}>Calza</button>
        </div>
        <div className="other_actions">
          <div className="bet">
            <div className="bet_multiplier">
              <p>3</p>x
            </div>
            <Hand values={["one"]}></Hand>

          </div>
          <div className="action dudo">Dudo!</div>

          <div className="action calza">Calza!</div>

        </div>
      </div>
    </GameArea>
  )
}

export default App
