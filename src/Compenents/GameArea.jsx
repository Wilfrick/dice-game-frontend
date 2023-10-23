import PropTypes from 'prop-types';

const GameArea = ({ children }) => {
    return (
        <div className="game_area">{children}</div>
    )
}

GameArea.propTypes = {
    children: PropTypes.any
}

export default GameArea