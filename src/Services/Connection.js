// Should be concerned with the websocket
// And the sending of moves
import { numberToString, stringToNumber } from "../Utils/numberParser";

const ws = new WebSocket("ws://localhost:12345/ws");

export function registerWsCallback(setCurrentPlayerHand, movesMade, setMovesMade, setPlayerIndex) {
    ws.onmessage = (event) => {
        console.log(event.data);
        console.log(JSON.parse(event.data));
        let parsedMessage = JSON.parse(event.data)
        processMessage(parsedMessage, setCurrentPlayerHand, movesMade, setMovesMade, setPlayerIndex)

    }
}


function processMessage(parsedMessage, setCurrentPlayerHand, movesMade, setMovesMade, setPlayerIndex) {
    switch (parsedMessage?.TypeDescriptor) {
        case "SinglePlayerHandContents":
            setCurrentPlayerHand(parsedMessage.Contents.PlayerHand.map(numberToString))
            setPlayerIndex(parsedMessage.Contents.PlayerIndex)
            break


        case "RoundUpdate":
            console.log(`movesMade: ${movesMade}`);
            console.log(parsedMessage.Contents);
            setMovesMade([parsedMessage.Contents, ...movesMade])
            // setBetsMade([parsedMessage.Contents.Value])
            break


    }
}

export function sendMove(moveType, playerMove) {
    // let GameID = 1234
    // let PlayerID = 123
    console.log(`Sending ${JSON.stringify(playerMove)}`)
    // let Contents = { GameID, PlayerID, MoveSTR: playerMove }
    let Contents = { MoveType: moveType, Value: playerMove }
    let str_move = JSON.stringify({ "TypeDescriptor": "PlayerMove", "Contents": Contents })
    ws.send(str_move)
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