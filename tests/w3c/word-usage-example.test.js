/* eslint-env jest */
/* eslint-disable no-unused-vars */
import WordUsageExample from '@/w3c/word-usage-example'

describe('word-usage-example.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeAll(async () => {
  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 WordUsageExample - constructor creates languageCode and normalizedText', () => {
    let wordUsageExample = new WordUsageExample('lat', 'cepit')

    expect(wordUsageExample.languageCode).toEqual('lat')
    expect(wordUsageExample.normalizedText).toEqual('cepit')
  })

  it('2 WordUsageExample - readObject creates WordUsageExample from jsonObj, homonym, author, textWork and sourceLink', () => {
    let testJsonObj = {
      cit: 'SenPhil.Med.484',
      left: 'felix uicem. ex opibus illis, quas procul raptas Scythae ',
      link: '/loc/1017/4/9/2890-2895',
      right: ' a perustis Indiae populis agunt, quas quia referta uix',
      target: 'usque'
    }

    let testHomonym = { language: 'lat', targetWord: 'usque' }
    let testAuthor = 'fooAuthor'
    let testTextWork = 'fooTextWork'
    let testSourceLink = 'https://latin.packhum.org'

    let wordUsageExample = WordUsageExample.readObject(testJsonObj, testHomonym, testAuthor, testTextWork, testSourceLink)

    expect(wordUsageExample.languageCode).toEqual('lat')
    expect(wordUsageExample.prefix).toEqual(testJsonObj.left)
    expect(wordUsageExample.suffix).toEqual(testJsonObj.right)
    expect(wordUsageExample.source).toEqual(testSourceLink + testJsonObj.link)
    expect(wordUsageExample.cit).toEqual(testJsonObj.cit)
    expect(wordUsageExample.author).toEqual(testAuthor)
    expect(wordUsageExample.textWork).toEqual(testTextWork)
  })

  it('3 WordUsageExample - htmlExample is a get method that returns constructed HTML for wordUsageExample', () => {
    let testJsonObj = {
      cit: 'SenPhil.Med.484',
      left: 'felix uicem. ex opibus illis, quas procul raptas Scythae ',
      link: '/loc/1017/4/9/2890-2895',
      right: ' a perustis Indiae populis agunt, quas quia referta uix',
      target: 'usque'
    }

    let testHomonym = { language: 'lat', targetWord: 'usque' }
    let testAuthor = 'fooAuthor'
    let testTextWork = 'fooTextWork'
    let testSourceLink = 'https://latin.packhum.org'

    let wordUsageExample = WordUsageExample.readObject(testJsonObj, testHomonym, testAuthor, testTextWork, testSourceLink)

    expect(typeof wordUsageExample.htmlExample).toEqual('string')
    expect(typeof wordUsageExample.htmlExample.includes(testJsonObj.left)).toBeTruthy()
    expect(typeof wordUsageExample.htmlExample.includes(testJsonObj.right)).toBeTruthy()
    expect(typeof wordUsageExample.htmlExample.includes(testJsonObj.target)).toBeTruthy()
  })
})
