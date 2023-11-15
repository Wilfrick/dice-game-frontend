import PropTypes from 'prop-types'
import DiceFace from './DiceFace'

const Hand = ({ values, setSelectedIndex, setCurrentHoveredValue }) => {

    // if (selectable) { 
    //     console.log("I'm selectable!");
    // }
    return (
        <div className="hand">
            {values.map((v, i) => <DiceFace value={v} key={i} setSelectedIndex={setSelectedIndex} setCurrentHoveredValue={setCurrentHoveredValue}></DiceFace>)}
        </div>
    )
}

Hand.propTypes = {
    values: PropTypes.arrayOf(PropTypes.string),
    setSelectedIndex: PropTypes.func,
    setCurrentHoveredValue: PropTypes.func,
}

export default Hand