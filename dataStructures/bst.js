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
