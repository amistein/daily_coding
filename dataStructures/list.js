class List {
  constructor(val) {
    this.val = val
    this.tail = null
  }

  get(index) {
    if (index === 0) return this.val
    return this.tail.get(index - 1)
  }

  prepend(val) {
    const list = new List(val)
    list.tail = this
    return list
  }

  size() {
    if (!this.tail) return 1
    return 1 + this.tail.size()
  }

  toString() {
    if (!this.tail) return this.val
    return this.val + ", " + this.tail.toString()
  }

  inspect() {
    return "[" + this.toString() + "]"
  }

  static fromArray(arr) {
    const reversed = arr.reverse()
    const [first] = reversed
    return reversed.slice(1).reduce((a, b) => a.prepend(b), new List(first))
  }
}

function middle(list) {
  const middle = Math.floor(list.size() / 2)
  return list.get(middle)
}

middle(List.fromArray([3,2,5,1,9]))
