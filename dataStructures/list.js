class List {
  constructor(val) {
    this.val = val
    this.tail = null
  }

  get(index) {
    if (index === 0) return this.val
    return this.tail.get(index - 1)
  }

  size() {
    if (!this.tail) return 1
    return 1 + this.tail.size()
  }

  copy() {
    const c = new List(this.val)
    c.tail = this.tail
    return c
  }

  drop(index) {
    if (index === 0) return this
    return this.tail.drop(index - 1)
  }

  take(index) {
    if (!this.tail || index === 0) return new List(this.val)
    return this.tail.take(index - 1).prepend(this.val)
  }

  last() {
    if (!this.tail) return this
    return this.tail.last()
  }

  prepend(val) {
    const list = new List(val)
    list.tail = this
    return list
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

function reverse(list) {
  let a = list
  let b = list.drop(1)
  let c = list.drop(2)

  a.tail = null

  while (b) {
    b.tail = a
    a = b
    b = c
    c = c ? c.tail : null
  }

  return a
}

function reverseRec(list) {
  function _reverse(l) {
    if (!l.tail) {
      list = l
      return
    }

    _reverse(l.tail)

    const n = l.tail

    n.tail = l
    l.tail = null
  }

  _reverse(list)

  return list
}

function reverseTailRec(list) {
  function inner(l, acc) {
    if (!l) return acc

    const tail = l.tail

    l.tail = acc
    return inner(tail, l)
  }

  return inner(list, null)
}

function reverseTailRecImmutable(list) {
  function inner(list, acc) {
    if (!acc) return inner(list.tail, new List(list.val))
    if (!list) return acc
    return inner(list.tail, acc.prepend(new List(list.val)))
  }

  return inner(list, null)
}

function reversePrint(list) {
  if (!list) return
  reversePrint(list.tail)
  // eslint-disable-next-line no-console
  console.log(list.val)
}

function middle(list) {
  const middle = Math.floor(list.size() / 2)
  return list.get(middle)
}

const l = List.fromArray([7,8,9,13,2])

reversePrint(l)
middle(l)
