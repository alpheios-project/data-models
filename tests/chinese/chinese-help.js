import 'whatwg-fetch'
export default class ChineseHelp {
  static convertAdso (rawData) {
    let formattedData = new Map()

    rawData.forEach(rawElement => {
      let word = ''
      let pinyin
      let value = ''
      let hasWord = false

      rawElement.forEach(rawPart => {
        if (!hasWord && rawPart.substr(0, 1) !== '[') {
          word = word + ' ' + rawPart
        } else if (!hasWord && rawPart.substr(0, 1) === '[') {
          hasWord = true
          pinyin = rawPart
        } else if (rawPart.length > 0) {
          value = value + ' ' + rawPart
        }
      })
      value = value.trim().replace('/', '').replace('/', '')
      word = word.trim()
      let finalElement = { word, pinyin, value }

      formattedData.set(word, finalElement)
    })
    return formattedData
  }

  static convertAdso2 (rawData) {
    let formattedData = new Map()
    let parsedLength = 0
    let currentIndex = 0

    //     let data = rawData.slice(0, 10)
    rawData.forEach(rawElement => {
      currentIndex = parsedLength
      parsedLength = parsedLength + rawElement.length + 2

      let parsedElement = rawElement
      let word = parsedElement.substr(0, parsedElement.indexOf('[')).trim()
      parsedElement = parsedElement.substr(parsedElement.indexOf('[') + 1)

      let pinyin = parsedElement.substr(0, parsedElement.indexOf(']'))
      parsedElement = parsedElement.substr(parsedElement.indexOf(']') + 1)

      let value = parsedElement.trim().substr(1)
      value = value.substr(0, value.length - 1).replace(/\//g, '; ')

      formattedData.set(currentIndex, {
        word, pinyin, value
      })
    })

    return formattedData
  }

  static convertIDX (rawData) {
    let formattedData = new Map()

    // let data = rawData.slice(40, 50)
    rawData.forEach(rawElement => {
      let codes = []
      let checkEl = formattedData.get(rawElement[0])

      // console.info('checkEl - ', checkEl)

      if (checkEl) {
        // console.info('checkEl codes before - ', codes)
        codes.push(checkEl.codes[0])
        // console.info('checkEl codes after - ', codes)
      }

      codes.push(rawElement[1])
      formattedData.set(rawElement[0], {
        word: rawElement[0],
        codes: codes
      })
    })

    // console.info('formattedData - ', formattedData)
    return formattedData
  }

  static findWord (targetWord, wordIDX, wordDict) {
    let searchedIdxElement = wordIDX.get(targetWord)

    if (searchedIdxElement) {
      // console.info('serchedIdxElement.codes - ', searchedIdxElement.codes)
      if (searchedIdxElement.codes && searchedIdxElement.codes.length > 0) {
        // console.info('serchedIdxElement.codes - ', searchedIdxElement.codes)
        return searchedIdxElement.codes.map(code => {
          // console.info('findWord code - ', code, wordDict.get(code))
          return wordDict.get(code)
        })
      }
    }

    return null
  }
}
