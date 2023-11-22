import { Link } from 'react-router-dom'
import { packSendMessage } from '../Services/Connection'


const LandingPage = () => {
    // use document.querySelector to find the input tag, then access its .value property to extract the lobby
    // Do this outside the return statement


    return (
        <div className="landing_page">
            <h3>Welcome to the dice game! We hope that you enjoy. Please click one of the following buttons to play. </h3>
            {/* <Link to="game"> Game</Link> */}
            <div className="landing_page_action_container">
            <button id = "CreateLobbyButton" onClick={() => {
                console.log("Tried to create a lobby")
                packSendMessage("Create Lobby")
            }}>Create Lobby</button>
            <div>
                <label>Lobby ID:
                    <input type="text" name="" id="LobbyCodeEntryField" />
                </label>

                <button id = "JoinLobbyButton" onClick={() => {
                    console.log("Tried to join a lobby")
                    let LobbyID = document.querySelector("#LobbyCodeEntryField").value
                    packSendMessage("Join Lobby", { LobbyID })
                }}>Join Lobby</button>
            </div>
            </div>
            <p>This dice game (inspired by Perudo and Liars Dice) is a multiplayer dice-game where you make bets about the total number of dice around the table. Try to be the last alive player!
            </p>
        
        </div>
    )
}

export default LandingPage