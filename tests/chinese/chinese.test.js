/* eslint-env jest */
/* eslint-disable no-unused-vars */
import 'whatwg-fetch'

import SIMPIDX from './json/simp-idx.json'
import TRADIDX from './json/trad-idx.json'
import ADSODAT from './json/adsolines.json'

import ChineseHelp from './chinese-help.js'

describe('chinese.test.js', () => {
  let dWordIndexSimp, dWordIndexTrad, dWordDict, rawDict

  function timeNow () {
    return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':' + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':' + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds()
  }

  let newDate

  beforeAll(async () => {
    dWordIndexSimp = ChineseHelp.convertIDX(SIMPIDX)
    dWordIndexTrad = ChineseHelp.convertIDX(TRADIDX)
    dWordDict = ChineseHelp.convertAdso2(ADSODAT)

    // const targetWord = '一举'
    // let serchedIdxElement = dWordIndexSimp.get(targetWord)

    // let searchedValue = 1319693
    // let keys = Array.from(dWordDict.keys())

    // console.info('targetWord', dWordIndexSimp.get(targetWord))
    // console.info('searchedKey', serchedIdxElement.codes[0], dWordDict.get(serchedIdxElement.codes[0]))
  })

  it('Chinese test - lookup prototype', () => {
    const targetWord = '一夫多妻主义者'
    let cpWord = targetWord
    let count = 0
    let format = 'simp'
    let lines

    let rs = []

    let result
    while (cpWord.length > 1) {
      console.info('cpWord - ', cpWord)
      if (format === 'simp') {
        result = ChineseHelp.findWord(cpWord, dWordIndexSimp, dWordDict)
        // console.info('result simp - ', result)
        if (!result) {
          format = 'trad'
          result = ChineseHelp.findWord(cpWord, dWordIndexTrad, dWordDict)
          // console.info('result trad - ', result)
        }
      } else {
        result = ChineseHelp.findWord(cpWord, dWordIndexTrad, dWordDict)
        // console.info('result trad - ', result)
        if (!result) {
          format = 'simp'
          result = ChineseHelp.findWord(cpWord, dWordIndexSimp, dWordDict)
          // console.info('result simp - ', result)
        }
      }

      if (result) {
        result.forEach(resItem => {
          rs[count++] = resItem
        })
      }
      cpWord = cpWord.substring(0, cpWord.length - 1)
    }

    console.info('final', rs)
  })
})
