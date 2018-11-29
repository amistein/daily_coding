function knapsack(max, vals, weights) {
  if (!weights.length) return 0

  const weight = weights[0]
  const val = vals[0]
  const newVals = vals.slice(1)
  const newWeights = weights.slice(1)

  if (weight > max) return knapsack(max, newVals, newWeights)

  return Math.max(
    val + knapsack(max - weight, newVals, newWeights),
    knapsack(max, newVals, newWeights)
  )
}

function minJumps(arr) {
  const head = arr[0]
  if (head === 0) return Infinity
  if (!head) return 0

  const allJumps = Array(head).fill().map((_, i) => minJumps(arr.slice(i + 1)))
  const min = Math.min(...allJumps)
  return min === Infinity ? -1 : min + 1
}

function minJumpsDynamic(arr) {
  const minJumpsArr = arr.reverse().reduce((result, n) => {
    const allNexts = result.slice(0, n)
    const min = Math.min(...allNexts)
    return [result.length < n ? 1 : 1 + min].concat(result)
  }, [])

  return minJumpsArr.shift()
}

knapsack(7, [1,4,5,7], [1,3,4,5])
minJumpsDynamic([1, 3, 5, 8, 9, 2, 6, 7, 6, 8, 9])
