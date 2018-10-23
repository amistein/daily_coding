/*
 * cons(a, b) constructs a pair, and car(pair) and cdr(pair)
 * returns the first and last element of that pair.
 * For example, car(cons(3, 4)) returns 3, and cdr(cons(3, 4)) returns 4.
 *
 * Given this implementation of cons:
 *
 * function cons(a, b) {
 *  function pair(f){
 *    return f(a, b)
 *  }
 *  return pair
 * }
 *
 * Implement car and cdr.
 */

function cons(a, b) {
  function pair(f){
    return f(a, b)
  }      
  return pair
}

const car = p => p(e => e)
const cdr = p => p((_, e) => e)

car(cons(3,4)) // 3
cdr(cons(3,4)) // 4
