import Hand from "./Hand"
import PropTypes from 'prop-types'


const BetSelector = ({ selectedIndex, setSelectedIndex, betRankBoxValue, setBetRankBoxValue }) => {
    return (
        <div className={`bet ${selectedIndex} selected`}>
            <div className="bet_multiplier"><input type="number" name="rank" value={betRankBoxValue} onChange={event => setBetRankBoxValue(event.target.value)} />x</div>
            <Hand values={["one", "two", "three", "four", "five", "six"]} selectable={true} setSelectedIndex={setSelectedIndex}></Hand>
        </div>
    )
}

BetSelector.propTypes = {
    selectedIndex: PropTypes.number,
    setSelectedIndex: PropTypes.func,
    betRankBoxValue: PropTypes.number,
    setBetRankBoxValue: PropTypes.func,
}

export default BetSelector
