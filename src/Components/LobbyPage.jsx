import PropTypes from 'prop-types'
import { packSendMessage } from '../Services/Connection'
const LobbyPage = ({ numPlayers, navigate, LobbyID }) => {
    // let LobbyID = "abcdefghiklmnopqrstuvwxyz"
    return (
        <>
            <p>Welcome to your lobby. The LobbyID is : <span>{LobbyID}</span>. There {`${numPlayers == 1 ? "is" : "are"}`} {numPlayers ?? 0} player{`${numPlayers == 1 ? "" : "s"}`} in the lobby</p>
            <button onClick={() => {
                console.log("Player tried to leave lobby")
                packSendMessage("Leave Lobby")
                navigate("/")
            }}>Leave Lobby</button>
            <div className='my_actions'>
          <button className="start_game" type="button" onClick={() => { packSendMessage("Start Game", {GameID: LobbyID}); console.log("StartGameButton") }}>Start Game</button>
        </div>
        </>
    )
}
LobbyPage.propTypes = {
    numPlayers: PropTypes.number,
    navigate: PropTypes.func
}
export default LobbyPage
