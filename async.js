/*
 * Function to mimic the behavior of the Javascript `async`
 * keyword using generators. `async/await` uses generators
 * and the `yield` keywork under the hood.
 */

function aSync(it) {
  function iterate(value) {
    const c = it.next(value)
    if (c.done) {
      return Promise.resolve(c.value)
    }
    return c.value.then(iterate)
  }
  return iterate()
}

function afterTwoSec(str) {
  return new Promise(r => {
    setTimeout(() => r(str), 2000)
  })
}

function* getName() {
  const first = yield afterTwoSec("amrom")
  const last = yield afterTwoSec("steinmetz")
  return `${first} ${last}`
}


// eslint-disable-next-line no-console
aSync(getName()).then(n => console.log(n))
