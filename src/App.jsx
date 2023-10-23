import './styles.css'
import GameArea from './Compenents/GameArea'
import DiceFace from './Compenents/DiceFace'
import Hand from './Compenents/Hand'

function App() {

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
            <Hand values={["one", "two", "three", "four", "five", "six"]}></Hand>
          </div>
          <button className="Make_Bet" type="button">Make Bet</button>
          <button className="Dudo" type="button">Dudo</button>
          <button className="Calza" type="button">Calza</button>
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
