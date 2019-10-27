/* eslint-env jest */
/* eslint-disable no-unused-vars */
/*
import SIMPIDX from './json/simp-idx.json'
import TRADIDX from './json/trad-idx.json'
import ADSODAT from './json/adso-dat.json'
*/
import ChineseHelp from './chinese-help.js'

describe('chinese.test.js', () => {
  let dWordIndexSimp, dWordIndexTrad, dWordDict, rawDict

  function timeNow () {
    return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':' + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':' + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds()
  }

  let newDate

  beforeAll(() => {
    newDate = new Date()
    console.info('*******************************Start dWordIndexSimp*******************', timeNow.bind(newDate)())

    // dWordIndexSimp = ChineseHelp.convertIDX(SIMPIDX)

    newDate = new Date()
    console.info('*******************************Start dWordIndexTrad*******************', timeNow.bind(newDate)())

    // dWordIndexTrad = ChineseHelp.convertIDX(TRADIDX)

    newDate = new Date()
    console.info('*******************************Start dWordDict*******************', timeNow.bind(newDate)())

    // dWordDict = ChineseHelp.convertAdso(ADSODAT)

    newDate = new Date()
    console.info('*******************************End dWordDict*******************', timeNow.bind(newDate)())
    // rawDict = ChineseHelp.convertToRaw(ADSODAT)
    /*
    console.info('dWordIndexSimp', dWordIndexSimp.size, dWordIndexSimp.get('一举两得'))
    console.info('dWordIndexTrad', dWordIndexTrad.size, dWordIndexTrad.get('一九九七年'))
    console.info('dWordDict', dWordDict.size, dWordDict.get('阿爾泰 阿尔泰'))
    */
    // console.info('rawDict', rawDict.length, rawDict.substring(1319693, rawDict.indexOf('\n', 1319693)))
  })

  it('Chinese test - lookup prototype', () => {
    let cpWord = '一举'
    while (cpWord.length > 1) {
      // lines = this.d_wordIndexSimp.get(cpWord)
    }
    console.info('final')
  })
})
