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

function maxOfSubarrays(arr, n) {
  function loop(arr, acc) {
    if (arr.length < n) return acc
    return loop(arr.slice(1), acc.concat(Math.max(...arr.slice(0, n))))
  }

  return loop(arr, [])
}

function reverseGroups(arr, n) {
  function chunk(arr, n) {
    return arr.reduce((result, elem, i) => {
      const subArrayIndex = Math.floor(i / n)
      const subArray = result[subArrayIndex] || []

      result[subArrayIndex] = subArray.concat(elem)
      return result
    }, [])
  }

  return chunk(arr, n).reduce((a, b) => a.concat(b.reverse()), [])
}

function rainWater(arr) {
  const highestSoFar = arr => arr.slice(0, -1).reduce((a, b) => {
    a.push(Math.max(a.slice(-1), b))
    return a
  }, [0])
  const highestLeft = highestSoFar(arr)
  const highestRight = highestSoFar(arr.reverse()).reverse()
  const lowerWall = i => Math.min(highestLeft[i], highestRight[i])

  return arr.map((n, i) => Math.max(lowerWall(i) - n, 0)).reduce((a, b) => a + b)
}

function pythagoreanTriplet(arr) {
  function loop(arr, start, end, last) {
    const sum = arr[start] + arr[end]
    const nextArr = arr.slice(0, -1)

    if (!arr.length) return false
    if (sum === last) return true
    if (start === end) return loop(nextArr, 0, nextArr.length - 1, arr[arr.length - 1])
    return loop(arr, sum < last ? start + 1 : start, sum > last ? end - 1 : end, last)
  }

  const squared = arr.map(e => e * e)
  const sorted = squared.sort((a, b) => a - b)
  const head = sorted.slice(0, -1)
  const tail = sorted[sorted.length - 1]

  return loop(head, 0, head.length - 1, tail)
}

function chocolateDistribution(arr, n) {
  function loop(start, end, min) {
    if (!end.length) return min
    return loop(start.slice(1), end.slice(1), Math.min(end[0] - start[0], min))
  }

  const sorted = arr.sort((a, b) => a - b)
  return loop(sorted, sorted.slice(n - 1), Infinity)
}

// A loop is probably better than recursion in this case
function maximizeProfit(arr) {
  const len = arr.length
  function loop(min, curr, acc) {
    if (curr === len - 1) {
      if (min === null) return acc
      else return acc.concat(min, curr)

    }
    if (min === null && arr[curr] < arr[curr + 1]) return loop(curr, curr + 1, acc)
    if (min !== null && arr[curr] > arr[curr + 1]) return loop(null, curr + 1, acc.concat([min, curr]))
    return loop(min, curr + 1, acc)
  }

  return loop(null, 0, [])
}


shortestPathSum([[1], [7,3], [4,36,2], [8,11,6,12]])
minPlatforms([900,  940, 950,  1100, 1500, 1800], [910, 1200, 1120, 1130, 1900, 2000])
maxOfSubarrays([1, 2, 3, 1, 4, 5, 2, 3, 6], 3) // [ 3, 3, 4, 5, 5, 5, 6 ]
reverseGroups([1, 2, 3, 4, 5], 3) // [ 3, 2, 1, 5, 4 ]
rainWater([3, 0, 0, 2, 0, 4]) // 10
pythagoreanTriplet([3, 2, 4, 6, 5]) // true
pythagoreanTriplet([3, 5, 7, 9, 2, 6]) // false
chocolateDistribution([3, 4, 1, 9, 56, 7, 9, 12], 5) // 6
maximizeProfit([23, 13, 25, 29, 33, 19, 34, 45, 65, 67]) // [ 1, 4, 5, 9 ]
