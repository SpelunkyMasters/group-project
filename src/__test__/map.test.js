const mapFns = require('./../utils/mapFunctions')

test('should sort array from smallest to largest', () => {
    let arr = [4, 6, 242, 3, 4, 4, 3, 2, 1, 2, 3, 777, 8, 5, 4, 3, 6, 8,]

    let sorted = mapFns.bubble(arr)

    expect(sorted[0]).toBe(1)
    expect(sorted[sorted.length - 1]).toBe(777)
})