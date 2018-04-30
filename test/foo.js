// const bar = import('./bar.js')
// import _ from 'lodash'
import lazi from 'lazi'
// import {bar} from './bar.js'
import common from './common'

export function foo () {
  console.log('foo...')
  console.log(_)
  common()
}
