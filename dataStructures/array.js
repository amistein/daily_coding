/*
 * Kadane's Algorithm
 * Largest Sum Contiguous Subarray
 */
function maxCont(arr) {
  function loop(arr, currMax, runningMax) {
    if (!arr.length) return runningMax
    const [first, second] = arr
    if (second === first + 1) return loop(arr.slice(1), currMax + first, runningMax)
    return loop(arr.slice(1), 0, Math.max(runningMax, currMax + first))
  }

  return loop(arr, 0, -Infinity)
}

// Longest Increasing Subsequence
function lis(arr) {
  function longestIncreasingToIndex(accArr) {
    if (accArr.length === arr.length) return accArr
    const currentIndex = accArr.length
    const filtered = accArr.filter((_, i) => arr[i] < arr[currentIndex])
    return longestIncreasingToIndex(accArr.concat(1 + (!filtered.length ? 0 : Math.max(...filtered))))
  }

  return Math.max(...longestIncreasingToIndex([]))
}