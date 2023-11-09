import Hand from "./Hand"
import PropTypes from 'prop-types'


const BetSelector = ({ setSelectedIndex }) => {
    return (
        <div className="bet">
            <div className="bet_multiplier"><input type="number" name="rank" />x</div>
            <Hand values={["one", "two", "three", "four", "five", "six"]} selectable={true} setSelectedIndex={setSelectedIndex}></Hand>
        </div>
    )
}

BetSelector.propTypes = {
    setSelectedIndex: PropTypes.func,
}

export default BetSelector
