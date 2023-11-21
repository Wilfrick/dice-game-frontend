import PropTypes from 'prop-types'
const LobbyPage = ({ numPlayers }) => {
    return (
        <>
            <p>Welcome to your lobby {":)"}. There {`${numPlayers == 1 ? "is" : "are"}`} {numPlayers ?? 0} player{`${numPlayers == 1 ? "" : "s"}`} in the lobby</p>
            <button onClick={() => {
                console.log("Player tried to leave lobby")
                packSendMessage("Leave Lobby")
            }}>Leave Lobby</button>
        </>
    )
}
LobbyPage.propTypes = {
    numPlayers: PropTypes.number
}
export default LobbyPage
