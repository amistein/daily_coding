function afterTwoSec(str) {
  return new Promise(r => {
    setTimeout(() => r(str), 2000)
  })
}

function* getName() {
  const first = yield afterTwoSec('amrom')
  const last = yield afterTwoSec('steinmetz')
  return `${first} ${last}`
}

const aSync = it => {
  function iterate(value) {
    const c = it.next(value)
    if (c.done) {
      return Promise.resolve(c.value)
    }
    return c.value.then(iterate)
  }
  return iterate()
}

aSync(getName()).then(n => console.log(n))
