import PropTypes from 'prop-types'
import DiceFace from './DiceFace'

const Hand = ({ values, selectable, setSelectedIndex }) => {
    
    // if (selectable) { 
    //     console.log("I'm selectable!");
    // }
    return (
        <div className="hand">
            {values.map((v, i) => <DiceFace value={v} key={i} setSelectedIndex={ selectable && setSelectedIndex }></DiceFace>)}
        </div>
    )
}

Hand.propTypes = {
    values: PropTypes.arrayOf(PropTypes.string)

}

export default Hand