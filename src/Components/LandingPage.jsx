import { Link } from 'react-router-dom'
import { packSendMessage } from '../Services/Connection'


const LandingPage = () => {
    // use document.querySelector to find the input tag, then access its .value property to extract the lobby
    // Do this outside the return statement


    return (
        <>
            <p>Welcome to the dice game! We hope that you enjoy. Please click one of the following buttons to play. </p>
            <Link to="game"> Game</Link>
            <button onClick={() => {
                console.log("Tried to create a lobby")
                packSendMessage("Create Lobby")
            }}>Create Lobby</button>
            <div>
                <label>Lobby ID:
                    <input type="text" name="" id="LobbyCodeEntryField" />
                </label>

                <button onClick={() => {
                    console.log("Tried to join a lobby")
                    let LobbyID = document.querySelector("#LobbyCodeEntryField").value
                    packSendMessage("Join Lobby", { LobbyID })
                }}>Join Lobby</button>
            </div>

        </>
    )
}

export default LandingPage