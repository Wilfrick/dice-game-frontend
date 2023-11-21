// Should be concerned with the websocket
// And the sending of moves
import { numberToString, stringToNumber } from "../Utils/numberParser";
import config from "../../config.json"
// console.log(config)
// console.log(`ws://${config.WebsocketUrl}:${config.WebsocketPort}/ws`)
let address = `ws://${config.WebsocketUrl}:${config.WebsocketPort}/ws`
const ws = new WebSocket(address);
// const ws = new WebSocket("ws://aw808.user.srcf.net:32156/ws");
// const ws = new WebSocket("ws://localhost:32156/ws");

export function registerWsCallback(stateDictionary) {
    ws.onmessage = (event) => {
        // console.log(event.data);
        console.log(JSON.parse(event.data));
        let parsedMessage = JSON.parse(event.data)
        processMessage(parsedMessage, stateDictionary)

    }
}


function processMessage(parsedMessage, { currentPlayerHand, setCurrentPlayerHand, movesMade, setMovesMade, clientPlayerIndex, setClientPlayerIndex,
    allCurrentHands, setAllCurrentHands, setCurrentTurn, roundRevealHands, setRoundRevealHands, setLobbyPlayerCount, navigate }) {
    switch (parsedMessage?.TypeDescriptor) {
        case "SinglePlayerHandContents":
            let localPlayerHand = parsedMessage.Contents.PlayerHand.map(numberToString)
            setCurrentPlayerHand(localPlayerHand)
            setClientPlayerIndex(parsedMessage.Contents.PlayerIndex)
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
            break
        case "Lobby Join Accepted":
            setLobbyPlayerCount(parsedMessage.Contents.NumPlayers)
            navigate("/lobby")
            break
        case "Lobby Join Failed":
            console.log("You failed to join the target lobby")
            break
        // case "Lobby Created":
        //     let lobbyID = parsedMessage.Contents.LobbyID
        //     setCurrentLobbyID(lobbyID)

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