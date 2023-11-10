export function numberToString(num) {
    switch (num) {
        case 1: return 'one'
        case 2: return 'two'
        case 3: return 'three'
        case 4: return 'four'
        case 5: return 'five'
        case 6: return 'six'
        default: return 'unknown'
    }
}
export function stringToNumber(num) {
    switch (num) {
        case 'one':   return 1
        case 'two':   return 2
        case 'three': return 3
        case 'four':  return 4
        case 'five':  return 5
        case 'six':   return 6
        default:      return 0 // possibly do something else
    }
}