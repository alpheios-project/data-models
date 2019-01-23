/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Author from '@/w3c/author'

describe('author.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeAll(async () => {
  })

  let testURN = 'urn:cts:latinLit:phi0690'

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

  it('1 Author - constructor creates urn, titles, ID', () => {
    let author = new Author(testURN, 'fooTitles', 'fooAbbreviations')

    expect(author.urn).toEqual(testURN)
    expect(author.titles).toEqual('fooTitles')
    expect(author.abbreviations).toEqual('fooAbbreviations')

    expect(author.ID).toBeDefined()
  })

  it('2 Author - static methods defaultLang and defaultIDPrefix are defined', () => {
    expect(Author.defaultLang).toBeDefined()
    expect(Author.defaultIDPrefix).toBeDefined()
  })

  it('3 Author - title method returns title for the defaultLang or if not exists it returns the first title from the list', () => {
    let testTitlesWithDefaultLang = { lat: 'FooLatName', eng: 'Ovid' }

    let testTitlesWithoutDefaultLang = { lat: 'FooLatName' }

    let author1 = new Author(testURN, testTitlesWithDefaultLang)
    expect(author1.title).toEqual('Ovid')

    let author2 = new Author(testURN, testTitlesWithoutDefaultLang)
    expect(author2.title).toEqual('FooLatName')
  })

  it('4 Author - abbreviation method returns abbreviation for the defaultLang or if not exists it returns the first abbreviation from the list', () => {
    let testAbbreviationsWithDefaultLang = { lat: 'FooLatAbbr', eng: 'FooEngAbbr' }

    let testAbbreviationsWithoutDefaultLang = { lat: 'FooLatAbbr' }

    let author1 = new Author(testURN, 'fooTitles', testAbbreviationsWithDefaultLang)
    expect(author1.abbreviation).toEqual('FooEngAbbr')

    let author2 = new Author(testURN, 'fooTitles', testAbbreviationsWithoutDefaultLang)
    expect(author2.abbreviation).toEqual('FooLatAbbr')
  })

  it('4 Author - create method returns Authopr object from jsonObj', () => {
    let testJsonObj = { 'urn': 'urn:cts:latinLit:phi0690',
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

    let author = Author.create(testJsonObj)
    expect(author.urn).toEqual('urn:cts:latinLit:phi0690')
    expect(Object.values(author.titles).length).toEqual(1)
    expect(Object.values(author.abbreviations).length).toEqual(1)
    expect(author.works.length).toEqual(1)
  })

  it('5 Author - extractIDFromURN methods extract ID from author urn (concordance API)', () => {
    let testCorrectURN = 'urn:cts:latinLit:phi0690'

    let author = new Author(testCorrectURN, 'fooTitles')
    expect(author.extractIDFromURN()).toEqual(690)

    author.urn = 'urn:cts:latinLit'
    expect(author.extractIDFromURN()).toBeNull()
  })
})
