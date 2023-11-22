import { stringToNumber } from "./numberParser"
export default function validRelativePreviousBet(betNumDice, betFaceValSTR, prevMove) {
    let betFaceVal = stringToNumber(betFaceValSTR)
    betNumDice = Number(betNumDice)
    if (betNumDice < 1) {
        return false
    }
    if (!prevMove) {
        return betFaceVal != 1        
    }
    let prevFaceVal = prevMove.FaceVal
    let prevNumDice = prevMove.NumDice
    // if (!(prevFaceVal && prevNumDice)) {
    //     return true
    // }

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