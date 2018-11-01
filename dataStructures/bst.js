class Tree {
  constructor(val, left, right) {
    this.val = val
    this.left = left
    this.right = right
  }
}

function min(root) {
  if (!root.left) return root.val
  return min(root.left) 
}

function contains(tree, val) {
  if (!tree) return false    
  if (tree.val === val) return true
  return contains(tree.left, val) || contains(tree.right, val)  
}

function insert(root, val) {
  if (!root) return new Tree(val)
  const left = val < root.val ? insert(root.left, val) : root.left 
  const right = val > root.val ? insert(root.right, val) : root.right
  return new Tree(root.val, left, right)  
}

function remove(root, val) {
  const newMin = min(root)
  const left = val < root.val ? remove(root.left, val) : root.left 
  const right = val > root.val ? remove(root.right, val) : root.right
  if (root.val !== val) return new Tree(root.val, left, right)
  if (!root.left || !root.right) return root.left || root.right
  return new Tree(newMin, remove(root.left, newMin), root.right)
}

// Get elements of BST in ascending order
function inorder(tree) {
  if (!tree) return []
  return inorder(tree.left).concat(tree.val).concat(inorder(tree.right))
}

/*
 * checks if array is inorder traversal of BST
 * (checks if array is unique and sorted ascending)
 * Not efficient because JS does not have tail call
 * optimization and arr - head is copied with every
 * function call.
 */
function isInorder(arr) {
  function loop(head, tail) {
    if (!tail.length) return true
    if (tail[0] <= head) return false
    return loop(tail[0], tail.slice(1))
  }
  return loop(arr[0], arr.slice(1))
}

// Count the number of nodes that lie in the given range.
function getNodeCount(root, min, max) {
  if (!root) return 0
  if (root.val > max) return getNodeCount(root.left)
  if (root.val < min) return getNodeCount(root.right)
  return 1 + getNodeCount(root.left, min, max) + getNodeCount(root.right, min, max)
}

/*
 * Modify BST so that every node is the sum of
 * all nodes itself and greater.
 * (new tree will not be BST)
 * https://www.geeksforgeeks.org/add-greater-values-every-node-given-bst/
 */
function modifyToAllGreater(root) {
  function leftMost(root) {
    if (!root.left) return root
    return leftMost(root.left)
  }

  function loop(root, acc) {
    if (!root) return null
    const newRight = loop(root.right, 0)
    const rest = newRight ? leftMost(newRight).val : 0
    const newVal = root.val + acc + rest
    return new Tree(newVal, loop(root.left, newVal), newRight)
  }

  return loop(root, 0)
}

// https://www.geeksforgeeks.org/largest-number-bst-less-equal-n/
function maxForKey(root, val) {
  if (!root) return -1
  if (root.val === val) return val
  if (root.val > val) return maxForKey(root.left, val)
  if (!root.right) return root.val
  return Math.max(root.val, maxForKey(root.right, val))
}

function lca(root, n1, n2) {
  if ((root.val > n1) && (root.val > n2)) return lca(root.left)
  if ((root.val < n1) && (root.val < n2)) return lca(root.right)
  return root.val
}

/*
 * Convert level order traversal to BST
 * https://www.geeksforgeeks.org/construct-bst-given-level-order-traversal/
 */
function constructBst(arr) {
  const [first, second, third] = arr

  if (!arr.length) return null
  if (second > first) return new Tree(first, null, constructBst(arr.slice(1)))
  if (third > first) return new Tree(first, constructBst(arr.filter(e => e < first)), constructBst(arr.filter(e => e > first)))
  return new Tree(first, constructBst(arr.slice(1)), null)
}

function fromArray(arr) {
  const middle = Math.floor(arr.length / 2)

  if (!arr.length) return null
  return new Tree(arr[middle], fromArray(arr.slice(0, middle)), fromArray(arr.slice(middle + 1)))
}

function balanced(root) {
  const ordered = inorder(root)
  return fromArray(ordered)
}

/*
 * Check if a pair with given target exists
 * Approach: convert to sorted array and use
 * use check for pair using O(n) approach
 */
function pairExists(root, target) {
  // checks for pair in sorted array - O(n)
  function pairExistsArr(arr, target) {
    const sum = arr[0] + arr[arr.length - 1]

    if (arr.length < 2) return false
    if (sum === target) return true
    if (sum < target) return pairExistsArr(arr.slice(1), target)
    if (sum > target) return pairExistsArr(arr.slice(0, -1), target)
  }

  const ordered = inorder(root)
  return pairExistsArr(ordered, target)
}
