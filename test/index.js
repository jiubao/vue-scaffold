// import {bar} from './bar.js'
const foo = import('./foo.js')
const bar = import('./bar.js')

function com1 () {
  console.log('com1...');
  bar();
}

function com2 () {
  console.log('com2...')
  foo()
}

export default { com1, com2, c1: 1 }
