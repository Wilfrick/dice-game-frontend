// Should be concerned with the websocket
// And the sending of moves
import { numberToString, stringToNumber } from "../Utils/numberParser";
import config from "../../config.json"
import { startTransition } from "react";
// console.log(config)
// console.log(`ws://${config.WebsocketUrl}:${config.WebsocketPort}/ws`)
let address = `ws://${config.WebsocketUrl}:${config.WebsocketPort}/ws`
let ws

// const ws = new WebSocket("ws://aw808.user.srcf.net:32156/ws");
// const ws = new WebSocket("ws://localhost:32156/ws");
export function makeConnection() { 
    console.log('Called makeConnection');
    ws = new WebSocket(address);
    console.log(`ws: ${ws}`);
    console.dir(ws)

    let clientID = sessionStorage.getItem("clientID")
        clientID = clientID ?? " "
    console.log(`ClientID: ${clientID}`)
    
    ws.onopen = (e) => { 
        console.log(`event readystate: ${e.target?.readyState}`);
        console.log(`ws readystate: ${ws?.readyState}`);
        console.log(`sending clientID: ${clientID}`);
        // setTimeout(()=>e.target.send(clientID), 250)
        e.target.send(clientID)
        console.log('clientID sent');
        const first_message_handler = (event) => {
            console.log(`Received data: ${event.data}`);
            sessionStorage.setItem("clientID", event.data)
            // registerWsCallback(stateDictionary)
            event.target.removeEventListener("message", first_message_handler)
        }
        e.target.addEventListener('message', first_message_handler)
    }
    // ws.onmessage = (event) => { 
    //     console.log(`Received data: ${event.data}`);
    //     sessionStorage.setItem("clientID", event.data)
    //     // registerWsCallback(stateDictionary)
    // }
}


// export function makeConnection(stateDictionary) {
//     // ws?.close()
//     ws = new WebSocket(address); // create a brand new connection to the back end server
//     console.log(`ws: ${ws}`);
//     ws.onerror = (err) => {
//         console.log(`Error: ${err}`);
//         ws.close()
//     }
//     ws.onclose = (event) => {
//         console.log(`Close event fired: ${event}`);
//         // setTimeout(() => makeConnection(stateDictionary), 1e3)
//     }
//     // should have some exponential decay + jitter 
//     // access our locally stored ClientID (it might not exist and we should interpret that as an empty string)
//     let clientID = sessionStorage.getItem("clientID")
//     clientID = clientID ?? ""
//     console.log(`ClientID ${clientID}`)
//     // send the client ID as a string (this happens before all of the JSON and messages.Message type communications, so this is okay)
//     // expect to receive a replacement client ID (if this is a reconnection then this will be the same as the one that we sent, but if it has been a long time / the server has restarted then it will probably be different)
//     const handle_first_message = (e) => {
//         e.target.removeEventListener("message", handle_first_message) // could check that this is a valid client id message and keep listening if it isn't, but don't worry for now
//         let new_client_id = e.data
//         console.log("Recieved a message")
//         console.log(new_client_id)
//         sessionStorage.setItem("clientID", new_client_id)
//         registerWsCallback(stateDictionary) // this could lead to unforseen issues.
//     }
//     ws.addEventListener("message", handle_first_message)

//     ws.onopen = (e) => {
//         console.log(`sending clientID: ${clientID}`)
//         e.target.send(clientID)
//     }

//     // store this new ClientID overtop of the old one in session storage

// }
// makeConnection()
// ws.onerror = () => {setTimeout(makeConnection(), 1e3)}
export function registerWsCallback(stateDictionary) {
    ws.onmessage = (event) => {
        // console.log(event.data);
        
        let parsedMessage
        try {
            parsedMessage = JSON.parse(event.data)
        } catch (e) { 
            console.log(e);
            return // don't process invalid json data
        }
        console.log(parsedMessage)
        processMessage(parsedMessage, stateDictionary)

    }
}


function processMessage(parsedMessage, { currentPlayerHand, setCurrentPlayerHand, movesMade, setMovesMade, clientPlayerIndex, setClientPlayerIndex,
    allCurrentHands, setAllCurrentHands, setBetRankBoxValue, setCurrentTurn, roundRevealHands, setRoundRevealHands, LobbyPlayerCount, setLobbyPlayerCount, setLobbyID, navigate, setRoundRevealBet,
    setShowingPreviousHand, setIsPalacifoRound }) {
    switch (parsedMessage?.TypeDescriptor) {
        case "SinglePlayerHandContents":
            let localPlayerHand = parsedMessage.Contents.PlayerHand.map(numberToString)
            setCurrentPlayerHand(localPlayerHand)
            setClientPlayerIndex(parsedMessage.Contents.PlayerIndex)
            setBetRankBoxValue(1)
            // allCurrentHands[parsedMessage.Contents.PlayerIndex] = localPlayerHand
            // setAllCurrentHands(allCurrentHands)
            // setAllCurrentHands([localPlayerHand, ...(allCurrentHands.slice(1))])
            break


        case "RoundUpdate":
            console.log(`movesMade: ${movesMade}`);
            console.log(parsedMessage.Contents);
            setMovesMade([parsedMessage.Contents, ...movesMade])
            // setBetsMade([parsedMessage.Contents.Value])
            break

        case "PlayerHandLengthsUpdate":
            console.log(`PlayerHandLengthsUpdate: ${parsedMessage.Contents}`)
            let localCurrentHands = parsedMessage.Contents.PlayerHandLengths
            // localCurrentHands = [5, 5, 5, 5, 5]
            console.log(`1 localCurrentHands: ${localCurrentHands}, ${typeof localCurrentHands}, ${localCurrentHands[1]}`);
            localCurrentHands = localCurrentHands.map((x) => Array.from({ length: x }, () => "unknown"))
            // console.log(`2 localCurrentHands: ${localCurrentHands}`);

            // console.log(`3 localCurrentHands: ${localCurrentHands}, ${typeof localCurrentHands}, ${localCurrentHands[1]}, ${localCurrentHands[0][2]}`);
            // let otherLocalCurrentHands = Array.from({ length: 4 }, () => 0)
            // console.log(`Other: ${otherLocalCurrentHands}`)
            // localCurrentHands = localCurrentHands.slice(playerIndex) + localCurrentHands.slice(0, playerIndex)
            // if (currentPlayerHand.length) { localCurrentHands[0] = currentPlayerHand }

            // We have succesfully created another race condition documented below for posterity
            // if (currentPlayerHand.length) { localCurrentHands[playerIndex] = currentPlayerHand }



            // currentPlayerHand.length() && (localCurrentHands[playerIndex] = currentPlayerHand) // cursed, but possibly out there


            setAllCurrentHands(localCurrentHands)
            break
        case "RoundResult":
            console.log(parsedMessage.Contents)
            if (parsedMessage.Contents.Result == "next") {
                setCurrentTurn(parsedMessage.Contents.PlayerIndex)
            }
            
            break
        // [4, 5, 3, 4 ,1]
        // [undefined, undefined, undefined, undefined, undefined]
        case "PlayerHandsContents":
            console.log(parsedMessage.Contents)
            setRoundRevealHands(parsedMessage.Contents.PlayerHands.map(playerHand => playerHand.map(numberToString)))
            setRoundRevealBet(parsedMessage.Contents.FinalBet)
            setShowingPreviousHand(true)
            break
        case "Lobby Join Accepted":
            setLobbyPlayerCount(parsedMessage.Contents.NumPlayers)
            setLobbyID(parsedMessage.Contents.LobbyID)
            navigate("/lobby")
            break
        case "Lobby Join Failed":
            console.log("You failed to join the target lobby")
            break
        case "Player Left Lobby":
            console.log("A player has left this lobby")
            setLobbyPlayerCount(parsedMessage.Contents.NewPlayerCount)
            break
        case "Game Started":
            console.log("Your game has started")
            navigate("/game/")
            break
        case "PalacifoRound":
            console.log(`Palacifo Round: ${parsedMessage.Contents}`)
            setIsPalacifoRound(parsedMessage.Contents)
            break
        // case "Lobby Created":
        //     let lobbyID = parsedMessage.Contents.LobbyID
        //     setCurrentLobbyID(lobbyID)
        default:
            console.log(`Received unknown message:`); // we shouldn't be here
            console.dir(parsedMessage)
    }
}

export function sendMove(moveType, playerMove) {
    // let GameID = 1234
    // let PlayerID = 123
    console.log(`Sending ${JSON.stringify(playerMove)}`) // should really log out the exact object we are sending
    // let Contents = { GameID, PlayerID, MoveSTR: playerMove }
    let Contents = { MoveType: moveType, Value: playerMove }
    let str_move = JSON.stringify({ "TypeDescriptor": "PlayerMove", "Contents": Contents })
    ws.send(str_move)
}

export function packSendMessage(typeDescriptor, contents) {
    let message = { TypeDescriptor: typeDescriptor, Contents: contents }
    let str_message = JSON.stringify(message)
    console.log(`Sending message ${str_message}`)
    ws.send(str_message)
}

export function sendGameStart() {
    let str_gameStart = JSON.stringify({ "TypeDescriptor": "GameStart" })
    ws.send(str_gameStart)
}

export function betAttempted(betRank, selectedIndex) {
    // const betButton = event.target


    console.log(`Bet Attempted: ${betRank} ${selectedIndex}`)
    if (Number(betRank) < 1) {
        console.log("Rank too low")
    }
    // other validation here


    //Passed all validation
    // let playerMove = betRank + " " + selectedIndex
    let playerMove = { NumDice: Number(betRank), FaceVal: stringToNumber(selectedIndex) }
    sendMove("Bet", playerMove)
}