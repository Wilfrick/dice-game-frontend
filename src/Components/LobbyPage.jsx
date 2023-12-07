import PropTypes from 'prop-types'
import { packSendMessage } from '../Services/Connection'

const LobbyPage = ({ numPlayers, navigate, LobbyID, isQuickplay }) => {
    // let LobbyID = "abcdefghiklmnopqrstuvwxyz"
    return (
        <div className="landing_page">
            <h3>Welcome to your lobby. </h3>
            <p>The <span className="label_name">LobbyID</span> is : <span onClick={()=>navigator.clipboard.writeText(LobbyID)} id ="lobby_hash">{LobbyID}</span> </p>
            <p>Click the ID to copy the ID to clipboard</p>
            
            <p>There {`${numPlayers == 1 ? "is" : "are"}`} <span id="LobbyPlayerCount">{numPlayers ?? 0} </span> player{`${numPlayers == 1 ? "" : "s"}`} in the lobby</p>
            <div className="landing_page_action_container">
            <button className = "leave" onClick={() => {
                console.log("Player tried to leave lobby")
                packSendMessage("Leave Lobby")
                navigate("/")
            }}>Leave Lobby</button>
            
          {!isQuickplay && <button type="button" onClick={() => { packSendMessage("Start Game", {GameID: LobbyID}); console.log("StartGameButton") }}>Start Game</button>}
        </div>
        </div>
    )
}
LobbyPage.propTypes = {
    numPlayers: PropTypes.number,
    navigate: PropTypes.func,
    isQuickplay: PropTypes.bool
}
export default LobbyPage
