import PropTypes from 'prop-types'
import LabelledHand from './LabelledHand';
import BetSelector from './BetSelector';
import GameArea from './GameArea';
import { betAttempted } from '../Services/Connection';
import { sendMove } from '../Services/Connection';
import validRelativePreviousBet from '../Utils/validRelativePreviousBet';
import PlayerAction from './PlayerAction';
import { numberToString, stringToNumber } from '../Utils/numberParser';
const GameDisplay = ({gameStateDictionary : {currentPlayerHand, currentHoveredValue, clientPlayerIndex, currentTurn, allCurrentHands, selectedIndex, setSelectedIndex, 
    betRankBoxValue, setBetRankBoxValue, setCurrentHoveredValue, movesMade, roundRevealHands, roundRevealBet, showingPreviousHand, setShowingPreviousHand, isPalacifoRound,
  haveILost, whoWon}}) =>
{
    
    allCurrentHands[clientPlayerIndex] = currentPlayerHand

    let isMyTurn = (clientPlayerIndex == currentTurn)
    let canMakeBet = betRankBoxValue && selectedIndex && (validRelativePreviousBet(betRankBoxValue, selectedIndex, movesMade[0]?.MoveMade, isPalacifoRound, currentPlayerHand.length))
    let canDudo = movesMade[0]?.MoveMade.MoveType == "Bet"
    let canCalza = (allCurrentHands.filter(x => x.length).length > 2) && canDudo
    let lastBetRankMade = movesMade[1]?.MoveMade.Value.FaceVal

  
    return (
      <GameArea>
        <dialog>Hello. {haveILost && "You have lost. We'll get 'em next time."} {whoWon !== undefined && `Player ${whoWon} won.${whoWon == clientPlayerIndex ? "That's you!": ""}`}
          <form method='dialog'>
            <button onClick={() => {
              console.log('Balloons');
            }}>Close and do stuff</button>
            <button>Other button</button>
          </form>
        </dialog>
        <button type="button" onClick={() => {
          let dialog_elt = document.querySelector("dialog")
          dialog_elt.showModal()
          dialog_elt.onclick = () => {dialog_elt.close() } // could include for closing on click
        }}>Show modal</button>
            <div className="game_info">
            {isPalacifoRound && <h1> It is a palacifo round!</h1>}
            <h4> It is currently <span className='player_name'>Player {currentTurn}'s </span> turn</h4>
            
            {!showingPreviousHand ? <div className="hand_display">
                <div className={`hands${currentHoveredValue ? " " + currentHoveredValue : ""} selected${isPalacifoRound ? " palacifo":""}`}>
           
                
                {allCurrentHands.map(
                    (hand, i) => <LabelledHand values={hand} key={i} isCurrentPlayer={currentTurn==i}></LabelledHand>
                )}
                </div>
                    <div className="player_names">{allCurrentHands.map((hand, i) => <p className={`${currentTurn == i ? "current_player" : ""}`}>Player < span className="player_name">{i}</span> {isPalacifoRound && (hand.length == 1) ? "*": ""}</p>)}
                </div>
              
            </div>
          : <><h2>Last Round Hands</h2>
          <div className="hand_display">
                <div className={`hands ${numberToString(roundRevealBet.Value.FaceVal)} selected`}>
           
                
                {roundRevealHands.map(
                    (hand, i) => <LabelledHand values={hand} key={i} isCurrentPlayer={currentTurn==i}></LabelledHand>
                )}
                </div>
                    <div className="player_names">{roundRevealHands.map((_, i) => <p className={`${currentTurn == i ? "current_player" : ""}`}>Player < span className="player_name">{i}</span> </p>)}
                </div>
              
            </div>
            </>} 
            <h4>You are player: {clientPlayerIndex}</h4>
            </div>
          {/* <div className={`hands${lastBetRankMade ? " " + numberToString(lastBetRankMade) : ""} selected`}> 
            <p>Starting old hands</p>
            {roundRevealHands.map(
              (hand, j) => <LabelledHand values={hand} playerName={j} key={j + 20}></LabelledHand>
            )}
          </div> */}
          <div className="action_display">
            <div className="my_actions">
              <BetSelector selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}
                            betRankBoxValue={betRankBoxValue} setBetRankBoxValue={setBetRankBoxValue} setCurrentHoveredValue={setCurrentHoveredValue} isMyTurn={isMyTurn}/>
              <button className={`Make_Bet ${isMyTurn ? " my_turn": ""}`} type="button" onClick={() => betAttempted(betRankBoxValue, selectedIndex)} disabled={!(isMyTurn && canMakeBet)}>Make Bet</button>
                        <button className={`Dudo ${isMyTurn ? " my_turn": ""}`} type="button" onClick={() => sendMove("Dudo")} disabled={!(isMyTurn && canDudo)}>Dudo</button>
                        <button className={`Calza ${isMyTurn && !isPalacifoRound ? " my_turn": ""}`} type="button" onClick={() => sendMove("Calza")} disabled={!(isMyTurn && canCalza && !isPalacifoRound)}>Calza</button>
            </div>
            <div className="bet_history">
              {movesMade.map(
                (move, i) => <PlayerAction MoveMade={move.MoveMade} PlayerIndex={move.PlayerIndex} key={i} showingPreviousHand={showingPreviousHand} setShowingPreviousHand={setShowingPreviousHand}/>
              )}
              {/* <Bet player_identifier="Jim" bet_multiplier={3} value="two" />
              <Bet player_identifier="Alexander the first" bet_multiplier={3} value="three" />


              <Dudo />
              <div className="action dudo">
                <p className="player_identifier">Player: 5</p>
                Dudo!</div>

              <div className="action calza">
                <p className="player_identifier">Player: 1</p>
                Calza!</div> */}

            </div>
          </div>
        </GameArea >

  )
}

export default GameDisplay

