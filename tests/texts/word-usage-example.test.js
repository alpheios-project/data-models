/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Author from '@/texts/author'
import WordUsageExample from '@/texts/word-usage-example'
import TextWork from '../../src/texts/text-work'

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

  it.skip('2 WordUsageExample - readObject creates WordUsageExample from jsonObj, homonym, author, textWork and sourceLink', () => {
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

    let wordUsageExample = new WordUsageExample(testJsonObj.target, 'lat')
    wordUsageExample.prefix = testJsonObj.left
    wordUsageExample.suffix = testJsonObj.right

    expect(typeof wordUsageExample.htmlExample).toEqual('string')
    expect(typeof wordUsageExample.htmlExample.includes(testJsonObj.left)).toBeTruthy()
    expect(typeof wordUsageExample.htmlExample.includes(testJsonObj.right)).toBeTruthy()
    expect(typeof wordUsageExample.htmlExample.includes(testJsonObj.target)).toBeTruthy()
  })

  it('4 WordUsageExample - fullCit constructs full description of author + textWork + citNumber', () => {
    let testAuthor = new Author('urn:cts:latinLit:phi0690', { eng: 'Virgil' }, { eng: 'Verg.' })
    let testTextWork = new TextWork(testAuthor, 'urn:cts:latinLit:phi0690.phi003', { lat: 'LatAeneid', eng: 'EngAeneid' }, { eng: 'A.' })

    let wordUsageExample = new WordUsageExample('usque', 'lat')
    wordUsageExample.author = testAuthor
    wordUsageExample.textWork = testTextWork
    wordUsageExample.cit = 'Virgil.Aeneid.484'

    expect(wordUsageExample.fullCit()).toEqual('Virgil EngAeneid 484')
    expect(wordUsageExample.fullCit('lat')).toEqual('Virgil LatAeneid 484')
    expect(wordUsageExample.fullCit('eng')).toEqual('Virgil EngAeneid 484')

    wordUsageExample.textWork = undefined
    expect(wordUsageExample.fullCit()).toEqual('Virgil Aeneid. 484') // gets from cit

    wordUsageExample.author = undefined
    expect(wordUsageExample.fullCit()).toEqual('Virgil.Aeneid.484')
  })
})
