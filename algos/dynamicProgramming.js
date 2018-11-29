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

knapsack(7, [1,4,5,7], [1,3,4,5])
