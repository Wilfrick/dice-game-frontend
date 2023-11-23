import PropTypes from 'prop-types'

const Calza = ({ player_identifier, showingPreviousHand, setShowingPreviousHand  }) => {
    return (
        <div className="action calza">
            <p className="player_identifier">Player: <span className="player_name">{player_identifier}</span></p>
            <div className="action_content">
            <button className = {!showingPreviousHand ? "showing_previous" : ""} onClick= {() => setShowingPreviousHand(!showingPreviousHand)}>{showingPreviousHand ? "Continue" : "Prev Hands"}</button>
            <p className="action_text">Calza!</p>
            </div></div>
    )
}

Calza.propTypes = {
    player_identifier: PropTypes.string
}

export default Calza