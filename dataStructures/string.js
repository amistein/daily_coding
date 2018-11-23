function validateParens(str) {
  const matches = {
    "}": "{",
    "]": "[",
    ")": "("
  }
  const openings = Object.values(matches)
  const closings = Object.keys(matches)

  function validate(arr, stack) {
    if (!arr.length) return !stack.length ? true : false
    const [first] = arr
    if (openings.includes(first)) stack.push(first)
    if (closings.includes(first) && stack.pop() !== matches[first]) return false
    return validate(arr.slice(1), stack)
  }

  return validate(str.split(""), [])
}

validateParens("())") // false
validateParens("(((({{[amrom]}}))))") // true
