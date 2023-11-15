import PropTypes from 'prop-types';

const DiceFace = ({ value, setSelectedIndex, setCurrentHoveredValue }) => {
    // if (setSelectedIndex) {
    //     console.log("SetselectedIndex is a truthy value (probably a function)");
    // }


    return (
        <div className={"diceFace " + value} onClick={() => setSelectedIndex?.(value)}
            onMouseEnter={() => setCurrentHoveredValue?.(value)}
            onMouseLeave={() => setCurrentHoveredValue?.(null)}>
            <div className="pip top_left"></div>
            <div className="pip top_right"></div>
            <div className="pip middle_left"></div>
            <div className="pip middle_centre"></div>
            <div className="pip middle_right"></div>
            <div className="pip bottom_left"></div>
            <div className="pip bottom_right"></div>
        </div>
    )
}
DiceFace.propTypes = {
    value: PropTypes.string,
    setSelectedIndex: PropTypes.func,
    setCurrentHoveredValue: PropTypes.func
}

export default DiceFace