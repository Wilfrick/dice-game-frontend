import PropTypes from 'prop-types'
import Hand from './Hand'

const LabelledHand = ({ values, playerName}) => {
    
    return (
        <div className="labelled_hand">
            <Hand values={values}/>
            Player: {playerName}
        </div>
    )
}

LabelledHand.propTypes = {
    values: PropTypes.arrayOf(PropTypes.string),
    playerName: PropTypes.string
}

export default LabelledHand