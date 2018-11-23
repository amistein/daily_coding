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

function missing(arr) {
  for (let [i, n] of arr.entries()) {
    if (n !== i + 1) return i + 1
  }
}

// Subarray with given sum
function subArraySum(arr, n) {
  function loop(currSum, pre, arr) {
    if (currSum === n) return pre
    if (currSum > n) return loop(currSum - pre[0], pre.slice(1), arr)
    if (!arr.length) return []
    return loop(currSum + arr[0], pre.concat(arr[0]), arr.slice(1))
  }

  return loop(0, [], arr)
}

function sort012(arr) {
  const res = Array(3).fill(0)
  for (let n of arr) {
    res[n]++
  }

  return res.map((n, i) => Array(n).fill(i)).reduce((a, b) => a.concat(b))
}

/*
 * Equilibrium is a position such that the sum of elements
 * below it is equal to the sum of elements after it.
 */
function equilibrium(arr) {
  const sum = arr.reduce((a, b) => a + b)
  const loop = (pre, post, i) => {
    if (i >= arr.length) return -1
    if (pre === post) return i
    return loop(pre + arr[i], post - arr[i + 1], i + 1)
  }

  return loop(0, sum - arr[0], 0)
}
