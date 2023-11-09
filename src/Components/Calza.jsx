import PropTypes from 'prop-types'

const Calza = ({ player_identifier }) => {
    return (
        <div className="action calza">
            <p className="player_identifier">Player: <span className="player_name">{player_identifier}</span></p>
            <div className="action_content">
                <p className="action_text">Calza!</p>
            </div></div>
    )
}

Calza.propTypes = {
    player_identifier: PropTypes.string
}

export default Calza