import PropTypes from 'prop-types'
import Hand from './Hand'

const LabelledHand = ({ values, isCurrentPlayer }) => {
    
    return (
        <div className={`labelled_hand${isCurrentPlayer ? " current_player": " "}${ values.length == 1 ? " can_change_rank": ""}`}>
            <Hand values={values}/>
            {/* Player: {playerName} */}
        </div>
    )
}

LabelledHand.propTypes = {
    values: PropTypes.arrayOf(PropTypes.string),
    playerName: PropTypes.string,
    isCurrentPlayer: PropTypes.bool,
}

export default LabelledHand