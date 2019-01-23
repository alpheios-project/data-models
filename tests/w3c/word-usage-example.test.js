/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Author from '@/w3c/author'
import TextWork from '@/w3c/text-work'
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

  it('4 WordUsageExample - fullCit constructs full description of author + textWork + citNumber', () => {
    let testJsonObj = {
      cit: 'Virgil.Aeneid.484',
      left: 'felix uicem. ex opibus illis, quas procul raptas Scythae ',
      link: '/loc/1017/4/9/2890-2895',
      right: ' a perustis Indiae populis agunt, quas quia referta uix',
      target: 'usque'
    }

    let testAuthorJson = { 'urn': 'urn:cts:latinLit:phi0690',
      'title': [
        { '@lang': 'eng',
          '@value': 'Virgil'
        }
      ],
      'abbreviations': [
        { '@lang': 'eng',
          '@value': 'Verg.'
        }
      ],
      'works': [
        { 'urn': 'urn:cts:latinLit:phi0690.phi003',
          'title': [
            { '@lang': 'lat',
              '@value': 'Aeneid'
            },
            { '@lang': 'eng',
              '@value': 'Aeneid'
            }
          ],
          'abbreviations': [
            { '@lang': 'eng',
              '@value': 'A.'
            }
          ]
        }
      ]
    }
    let testHomonym = { language: 'lat', targetWord: 'usque' }
    let testAuthor = Author.create(testAuthorJson)
    let testTextWork = testAuthor.works[0]
    let testSourceLink = 'https://latin.packhum.org'

    let wordUsageExample1 = WordUsageExample.readObject(testJsonObj, testHomonym, testAuthor, testTextWork, testSourceLink)

    expect(wordUsageExample1.fullCit).toEqual('Virgil Aeneid 484')

    wordUsageExample1.textWork = undefined
    expect(wordUsageExample1.fullCit).toEqual('Virgil Aeneid. 484') // gets from cit

    wordUsageExample1.author = undefined
    expect(wordUsageExample1.fullCit).toEqual('Virgil.Aeneid.484')
  })
})
