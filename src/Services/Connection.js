// Should be concerned with the websocket
// And the sending of moves
import { numberToString, stringToNumber } from "../Utils/numberParser";

const ws = new WebSocket("ws://localhost:12345/ws");

export function registerWsCallback(stateDictionary) {
    ws.onmessage = (event) => {
        console.log(event.data);
        console.log(JSON.parse(event.data));
        let parsedMessage = JSON.parse(event.data)
        processMessage(parsedMessage, stateDictionary)

    }
}


function processMessage(parsedMessage, { currentPlayerHand, setCurrentPlayerHand, movesMade, setMovesMade, playerIndex, setPlayerIndex, allCurrentHands, setAllCurrentHands }) {
    switch (parsedMessage?.TypeDescriptor) {
        case "SinglePlayerHandContents":
            let localPlayerHand = parsedMessage.Contents.PlayerHand.map(numberToString)
            setCurrentPlayerHand(localPlayerHand)
            setPlayerIndex(parsedMessage.Contents.PlayerIndex)
            setAllCurrentHands([localPlayerHand, ...(allCurrentHands.slice(1))])
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
            if (currentPlayerHand.length) { localCurrentHands[0] = currentPlayerHand }


            // currentPlayerHand.length() && (localCurrentHands[playerIndex] = currentPlayerHand) // cursed, but possibly out there


            setAllCurrentHands(localCurrentHands)
            break
        // [4, 5, 3, 4 ,1]
        // [undefined, undefined, undefined, undefined, undefined]


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