import PropTypes from 'prop-types'
import Bet from './Bet'
import Dudo from './Dudo'
import Calza from './Calza'
import PlayerLeft from './PlayerLeft'
import { numberToString } from '../Utils/numberParser'

const PlayerAction = ({
    MoveMade: { MoveType, Value: { NumDice, FaceVal } },
    PlayerIndex,
    showingPreviousHand,
    setShowingPreviousHand, }) => {
    switch (MoveType) {
        case "Bet":
            return <Bet player_identifier={PlayerIndex.toString()} bet_multiplier={NumDice} value={numberToString(FaceVal)} />
        case "Dudo":
            return <Dudo player_identifier={PlayerIndex.toString()} showingPreviousHand={showingPreviousHand} setShowingPreviousHand = {setShowingPreviousHand} />
        case "Calza":
            return <Calza player_identifier={PlayerIndex.toString()} showingPreviousHand={showingPreviousHand} setShowingPreviousHand={setShowingPreviousHand} />
        case "LEFT":
            return <PlayerLeft player_identifier={PlayerIndex.toString()}/>

    }
}

PlayerAction.propTypes = {
    MoveMade: PropTypes.shape({
        MoveType: PropTypes.string,
        Value: PropTypes.shape({
            NumDice: PropTypes.number,
            FaceVal: PropTypes.number
        }),
    }),
    PlayerIndex: PropTypes.number,
}
export default PlayerAction