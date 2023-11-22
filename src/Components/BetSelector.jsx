import Hand from "./Hand"
import PropTypes from 'prop-types'


const BetSelector = ({ selectedIndex, setSelectedIndex, betRankBoxValue, setBetRankBoxValue, setCurrentHoveredValue }) => {
    return (
        <div className={`bet ${selectedIndex} selected`}>
            <div className="bet_multiplier"><input type="number" name="rank" value={betRankBoxValue} onChange={event => setBetRankBoxValue(Number(event.target.value) ?? 0)} />x</div>
            <Hand values={["one", "two", "three", "four", "five", "six"]} setSelectedIndex={setSelectedIndex} setCurrentHoveredValue={setCurrentHoveredValue}></Hand>
        </div>
    )
}

BetSelector.propTypes = {
    selectedIndex: PropTypes.string, // should be a string
    setSelectedIndex: PropTypes.func,
    betRankBoxValue: PropTypes.number,
    setBetRankBoxValue: PropTypes.func,
    setCurrentHoveredValue: PropTypes.func,
}

export default BetSelector
