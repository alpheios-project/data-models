/* eslint-env jest */
/* eslint-disable no-unused-vars */
import TextWork from '@/w3c/text-work'

describe('text-work.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeAll(async () => {
  })

  let testURN = 'urn:cts:latinLit:phi0690.phi003'

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

  it('1 TextWork - constructor creates author, urn, titles, ID', () => {
    let textWork = new TextWork('fooAuthor', testURN, 'fooTitles')

    expect(textWork.urn).toEqual(testURN)
    expect(textWork.titles).toEqual('fooTitles')
    expect(textWork.author).toEqual('fooAuthor')
    expect(textWork.ID).toBeDefined()
  })

  it('2 TextWork - static methods defaultLang and defaultIDPrefix are defined', () => {
    expect(TextWork.defaultLang).toBeDefined()
    expect(TextWork.defaultIDPrefix).toBeDefined()
  })

  it('3 TextWork - title method returns title for the defaultLang or if not exists it returns the first titke from the list', () => {
    let testTitlesWithDefaultLang = { lat: 'Amores', eng: 'The Art of Love' }

    let testTitlesWithoutDefaultLang = { lat: 'Amores' }

    let textWork1 = new TextWork('fooAuthor', testURN, testTitlesWithDefaultLang)
    expect(textWork1.title).toEqual('The Art of Love')

    let textWork2 = new TextWork('fooAuthor', testURN, testTitlesWithoutDefaultLang)
    expect(textWork2.title).toEqual('Amores')
  })

  it('4 TextWork - create method returns TextWork object from jsonObj', () => {
    let testJsonObj = {
      'urn': 'urn:cts:latinLit:phi0690.phi003',
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

    let textWork = TextWork.create('fooAuthor', testJsonObj)
    expect(textWork.urn).toEqual('urn:cts:latinLit:phi0690.phi003')
    expect(textWork.author).toEqual('fooAuthor')
    expect(Object.values(textWork.titles).length).toEqual(2)
    expect(Object.values(textWork.abbreviations).length).toEqual(1)
  })

  it('5 TextWork - extractIDFromURN methods extract ID from textWork urn (concordance API)', () => {
    let testCorrectURN = 'urn:cts:latinLit:phi0690.phi003'

    let textWork = new TextWork('fooAuthor', testCorrectURN, 'fooTitles')
    expect(textWork.extractIDFromURN()).toEqual(3)

    textWork.urn = 'urn:cts:latinLit'
    expect(textWork.extractIDFromURN()).toBeNull()
  })
})
