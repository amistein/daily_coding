class Tree {
  constructor(val, left, right) {
    this.val = val
    this.left = left
    this.right = right
  }

  contains(val) {
    const containsOrFalse = (tree, val) => tree ? tree.contains(val) : false
    if (this.val === val) return true
    return containsOrFalse(this.left, val) || containsOrFalse(this.right, val)
  }
}

function find(tree, val) {
  if (!tree) return null
  if (tree.val === val) return tree
  const leftFind = find(tree.left, val)
  const rightFind = find(tree.right, val)
  if (leftFind) return leftFind
  if (rightFind) return rightFind
  return null
}

function fromString(root, str) {
  const edges = arr => {
    function loop(res, arr) {
      if (!arr.length) return res
      return loop([...res, arr.slice(0, 3)], arr.slice(3))
    }
    return loop([], arr)
  }

  const edgeArr = edges(str.split(" "))
  const tree = new Tree(root)
  edgeArr.forEach(e => {
    const [parent, child, dir] = e
    const node = find(tree, Number(parent))
    if (dir == 'L') node.left = new Tree(Number(child))
    else node.right = new Tree(Number(child))
  })

  return tree
}

// Get elements of BST in ascending order
function inorder(tree) {
  if (!tree) return []
  return inorder(tree.left).concat(tree.val).concat(inorder(tree.right))
}

// Get elements of BST in descending order
function inorderDesc(tree) {
  if (!tree) return []
  return inorderDesc(tree.right).concat(tree.val).concat(inorderDesc(tree.left))  
}

// Logs but does return a value
function logInorder(tree) {
  if (!tree) return
  logInorder(tree.left)
  console.log(tree.val)
  logInorder(tree.right)
}

function preorder(tree) {
  if (!tree) return []
  return [tree.val].concat(preorder(tree.left)).concat(preorder(tree.right))
}

function postorder(tree) {
  if (!tree) return []
  return postorder(tree.left).concat(postorder(tree.right)).concat(tree.val)
}

function levelorder(tree) {
  function loop(res, acc) {
    if (!acc.length) return res
    const newRes = [...res, ...acc.map(t => t.val)]
    const newAcc = acc.reduce((a, b) => a.concat([b.left, b.right].filter(t => t)), [])
    return loop(newRes, newAcc)
  }
  return loop([], [tree])
}

// Level order traversal, but returns 2D array - nodes grouped by level
function levels(tree) {
  function loop(res, acc) {
    if (!acc.length) return res
    const newRes = [...res, acc.map(t => t.val)]
    const newAcc = acc.reduce((a, b) => a.concat([b.left, b.right].filter(t => t)), [])
    return loop(newRes, newAcc)
  }
  return loop([], [tree])
}

function height(tree) {
  if (!tree) return 0
  return 1 + Math.max(height(tree.left), height(tree.right))
}

function countLeaves(tree) {
  if (!tree) return 0
  if (!tree.left && !tree.right) return 1
  return countLeaves(tree.left) + countLeaves(tree.right)
}

function sumParent(tree) {
  if (!tree) return true
  if (!tree.right && !tree.left) return true
  const getOrZero = tree => tree ? tree.val : 0
  const childrenResult = sumParent(tree.left) && sumParent(tree.right)
  const isSumEqual = tree.val === getOrZero(tree.left) + getOrZero(tree.right)
  return childrenResult && isSumEqual
}

function mirror(tree) {
  if (!tree) return null
  return new Tree(tree.val, mirror(tree.right), mirror(tree.left))
}

function balanced(tree) {
  return Math.abs(height(tree.left) - height(tree.right)) <= 1
}

// Lowest common ancestor
function lca(tree, a, b) {
  const containsBoth = (tree, a, b) => tree ? tree.contains(a) && tree.contains(b) : false
  const leftContainsBoth = containsBoth(tree.left, a, b)
  const rightContainsBoth = containsBoth(tree.right, a, b)
  if (leftContainsBoth) return lca(tree.left)
  if (rightContainsBoth) return lca(tree.right)
  return tree.val
}

function diameter(tree) {
  if (!tree) return 0
  const throughRoot = height(tree.left) + height(tree.right) + 1
  const leftDiam = diameter(tree.left)
  const rightDiam = diameter(tree.right)
  return Math.max(throughRoot, leftDiam, rightDiam)
}

function leftView(tree) {
  return levels(tree).map(l => l.shift())
}

function rightView(tree) {
  return levels(tree).map(l => l.pop())
}

// fromString(25, "25 22 L 25 28 R 22 5 L 22 24 R 5 3 L 3 1 L 28 27 L 28 35 R")
const a = new Tree(25, new Tree(22, new Tree(5, new Tree(3, new Tree(1))), new Tree(24)), new Tree(28, new Tree(27), new Tree(35)))

const b = new Tree(10, new Tree(8, new Tree(3), new Tree(5)), new Tree(2, new Tree(2)))

const c = fromString(1, "1 2 R 1 3 L")
const d = fromString(10, "10 20 L 10 30 R 20 40 L 20 60 R")
const e = fromString(1, "1 2 L 1 3 R 2 4 L 2 5 R 3 6 L 3 7 R 4 8 R")


console.log(inorder(a))
console.log(inorderDesc(a))
console.log(preorder(a))
console.log(postorder(a))
console.log(levelorder(a))

console.log("height: " + height(a))
console.log("countLeaves: " + countLeaves(a))
console.log("sumParent a: " + sumParent(a))
console.log("sumParent b: " + sumParent(b))
console.log("balanced a: " + balanced(a))
console.log("balanced b: " + balanced(b))
console.log("lca (a, 24, 1): " + lca(a, 24, 1))
console.log("leftView(e): " + leftView(e))
console.log("rightView(e): " + rightView(e))