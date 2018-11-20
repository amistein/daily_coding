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

/*
 * An element of array is leader if it is greater than or equal to all the elements to its right side.
 * Also, the rightmost element is always a leader.
 */
function leaders(arr) {
  function loop(arr, currMax, acc) {
    if (!arr.length) return acc

    const last = arr[arr.length - 1]
    const newPrefix = last >= currMax ? [last] : []
    return loop(arr.slice(0, -1), Math.max(currMax, last), newPrefix.concat(acc))
  }

  return loop(arr, 0, [])
}

/*
 *    1
 *   7 3
 *  4 36 2
 * 8 11 6 12
 */

function shortestPathSum(arr) {
  if (!arr.length) return null
  const [current] = arr
  const next = shortestPathSum(arr.slice(1))
  return next ? current.map((n, i) => n + Math.min(next[i], next[i + 1])) : current
}

shortestPathSum([[1], [7,3], [4,36,2], [8,11,6,12]])


function minPlatforms(arrivals, departures) {
  function loop(events, max, current) {
    if (!events.length) return max

    const [event] = events
    const newCurrent = event.type === "a" ? current + 1 : current - 1
    return loop(events.slice(1), Math.max(max, newCurrent), newCurrent)
  }

  const arrivalsObjs = arrivals.map(t => ({time: t, type: "a"}))
  const departObjs = departures.map(t => ({time: t, type: "d"}))
  const sorted = [...arrivalsObjs, ...departObjs].sort((a, b) => a.time - b.time)

  return loop(sorted, 0, 0)
}

minPlatforms([900,  940, 950,  1100, 1500, 1800], [910, 1200, 1120, 1130, 1900, 2000])