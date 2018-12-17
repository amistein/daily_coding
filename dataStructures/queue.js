// Queue using two stacks
class Queue {
  constructor() {
    this.stack1 = []
    this.stack2 = []
  }

  enqueue(val) {
    this.stack1.push(val)
  }

  dequeue() {
    if (!this.stack2.length) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop())
      }
    }
    return this.stack2.pop()
  }
}
