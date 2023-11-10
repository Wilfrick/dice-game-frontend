import PropTypes from 'prop-types'

const Dudo = ({ player_identifier }) => {
    return (
        <div className="action dudo">
            <p className="player_identifier">Player: <span className="player_name">{player_identifier}</span></p>
            <div className="action_content">
                <p className="action_text">Dudo!</p>
            </div></div>
    )
}

Dudo.propTypes = {
    player_identifier: PropTypes.string
}

export default Dudo