import PropTypes from 'prop-types'

const Dudo = ({ player_identifier, showingPreviousHand, setShowingPreviousHand }) => {
    return (
        <div className="action dudo">
            <p className="player_identifier">Player: <span className="player_name">{player_identifier}</span></p>
            <div className="action_content">
                <button className = {!showingPreviousHand ? "showing_previous" : ""} onClick= {() => setShowingPreviousHand(!showingPreviousHand)}>{showingPreviousHand ? "Continue" : "Prev Hands"}</button>
                <p className="action_text">Dudo!</p>
            </div></div>
    )
}

Dudo.propTypes = {
    player_identifier: PropTypes.string
}

export default Dudo