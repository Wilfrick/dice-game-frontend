import { expect } from "vitest";
import validRelativePreviousBet from "../src/Utils/validRelativePreviousBet";

describe('validRelativePreviousBet', () => {
    it('should run', () => {
        validRelativePreviousBet(4, "five", { NumDice: 2, FaceVal: 3 })
    });
    it('should return true for an always true case', () => {
        let returnValue = validRelativePreviousBet("4", "five", { MoveType: "Bet", Value: { NumDice: 2, FaceVal: 3 } })
        expect(returnValue).toEqual(true)
    });
    it('should return false for an always false case', () => {
        let returnValue = validRelativePreviousBet("2", "three", {MoveType: "Bet", Value: {NumDice: 4, FaceVal: 5 }})
        expect(returnValue).toEqual(false)
    });
    it("should return true following a dudo", () => { 
        let rV = validRelativePreviousBet(2, "two", {MoveType: "Dudo", Value: { NumDice: 0, FaceVal: 0}})
        expect(rV).toEqual(true)
        
     })
    it("Should be resilent to DUDO with no Value", () => {
        let returnValue = validRelativePreviousBet(2, "two", {MoveType: "Dudo"})
        expect(returnValue).toEqual(true)
    })
    it("should return true following a calza", () => { 
        let rV = validRelativePreviousBet(2, "two", {MoveType: "Calza", Value: { NumDice: 0, FaceVal: 0}})
        expect(rV).toEqual(true)
        
     })
    it("Should be resilent to calza with no Value", () => {
        let returnValue = validRelativePreviousBet(2, "two", {MoveType: "Calza"})
        expect(returnValue).toEqual(true)
    })
    it("Should be impossible to bet ones on a first turn on a normal round", () => {
        let returnValue = validRelativePreviousBet(1, "one", {MoveType: "Dudo"})
        expect(returnValue).toBeFalsy()
     })
    it('should be allowed to change the rank on a normal round', () => {
        let returnValue = validRelativePreviousBet(2, "three", {MoveType: "Bet", Value: {NumDice: 1, FaceVal: 2 }})
        expect(returnValue).toEqual(true)
    })
    describe("Palacifo", () => {
        it("Should be able to bet ones on first turn on Palacifo Round", () => {
            let returnValue = validRelativePreviousBet(1, "one", {MoveType: "Dudo"}, true)
            expect(returnValue).toEqual(true)
         })

        it("It should be impossible to change the rank on a palacifo round if you have more than one dice", () => {
            let returnValue = validRelativePreviousBet(2, "three", {MoveType: "Bet", Value: {NumDice: 1, FaceVal: 2 }}, true, 2)
            expect(returnValue).toBeFalsy()

        })
        it("should be able to follow rank on a palacifo round", () => {
            let returnValue = validRelativePreviousBet(2, "two", {MoveType: "Bet", Value: {NumDice: 1, FaceVal: 2 }}, true, 3)
            expect(returnValue).toBeTruthy()
        })
        it("It should be possible to change the rank on a palacifo round if you have one dice", () => {
            let returnValue = validRelativePreviousBet(2, "three", {MoveType: "Bet", Value: {NumDice: 1, FaceVal: 2 }}, true, 1)
            expect(returnValue).toEqual(true)

        })
        it('should be possible to bet same number of twos following a ones bet contigent on you having 1 dice', () => {
            let returnValue = validRelativePreviousBet(1, "two", {MoveType: "Bet", Value: {NumDice: 1, FaceVal: 1 }}, true, 1)
            expect(returnValue).toBeTruthy()
        })
    })    
});
