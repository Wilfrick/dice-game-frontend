import PropTypes from 'prop-types'
import DiceFace from './DiceFace'

const Hand = ({ values }) => {
    return (
        <div className="hand">
            {values.map((v, i) => <DiceFace value={v} key={i}></DiceFace>)}
        </div>
    )
}

Hand.propTypes = {
    values: PropTypes.arrayOf(PropTypes.string)
}

export default Hand