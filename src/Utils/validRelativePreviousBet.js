import { stringToNumber } from "./numberParser"
export default function validRelativePreviousBet(betNumDice, betFaceValSTR, prevMove, isPalacifoRound, playerHandSize) {
    let betFaceVal = stringToNumber(betFaceValSTR)
    betNumDice = Number(betNumDice)
    if (betNumDice < 1) {
        return false
    }
    if ((!prevMove || ! (prevMove.MoveType in {"Bet":0,"LEFT":0}))){
        return betFaceVal != 1 || isPalacifoRound   
    }

    
    
    let prevFaceVal = prevMove.Value.FaceVal
    let prevNumDice = prevMove.Value.NumDice
    // if (!(prevFaceVal && prevNumDice)) {
    //     return true
    // }

    if (isPalacifoRound && playerHandSize != 1 && (betFaceVal != prevFaceVal)) { // Refactor me please
            return false // can't change the face value when not on two dice
    }

    // if (isPalacifoRound && playerHandSize == 1 && prevFaceVal == 1) {
    //     return betNumDice > prevFaceVal || (betNumDice == prevNumDice && betFaceVal > prevFaceVal)
    // }
    if (isPalacifoRound) { // takes advantage of following code, effectivly comparing values 2-7 instead of 1-6
        betFaceVal++
        prevFaceVal++
    }

    if (betFaceVal == 1) {
        betFaceVal = 7
        betNumDice = betNumDice * 2
    }
    if (prevFaceVal == 1) {
        prevFaceVal = 7
        prevNumDice = prevNumDice * 2
    }
    // console.log(betFaceVal, betNumDice, prevFaceVal, prevFaceVal);
    if (betNumDice != prevNumDice) {
        return betNumDice > prevNumDice
    }

    return betFaceVal > prevFaceVal
}