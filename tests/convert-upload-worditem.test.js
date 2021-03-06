/* eslint-env jest */
/* eslint-disable no-unused-vars */

import ResourceProvider from '@/resource_provider.js'
import Translation from '@/translation.js'
import Definition from '@/definition.js'
import Lexeme from '@/lexeme.js'
import Lemma from '@/lemma'
import Inflection from '@/inflection'
import DefinitionSet from '@/definition-set'

describe('convert-upload-worditem.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

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

  it('1 Resource Provider - readObject from JSON and convert to JSON', () => {
    let providerJSON = {
      uri: 'net.alpheios:tools:wordsxml.v1',
      rights: {
        default: 'Short definitions and morphology from Words by William Whitaker, Copyright 1993-2007.'
      }
    }

    let provider = ResourceProvider.readObject(providerJSON)

    expect(provider).toBeInstanceOf(ResourceProvider)
    expect(provider.uri).toEqual('net.alpheios:tools:wordsxml.v1')
    expect(provider.rights).toBeInstanceOf(Map)
    expect(provider.rights.has('default')).toBeTruthy()
    expect(provider.rights.get('default')).toEqual('Short definitions and morphology from Words by William Whitaker, Copyright 1993-2007.')

    let convertedJSON = provider.convertToJSONObject(provider)
    expect(convertedJSON).toEqual(providerJSON)
  })

  it('2 Translation - readObject from JSON and convert to JSON', () => {
    let providerJSON = {
      uri: 'https://ats.alpheios.net',
      rights: {
        default: 'Lemma translatins are extracted from data provided under the GNU GPL v3 license by ...'
      }
    }

    let translationJSON = {
      languageCode: 'ita',
      provider: providerJSON,
      translations: [
        'prendere, impadronirsi di', 'scegliere'
      ]
    }

    let translation = Translation.readObject(translationJSON, { word: 'sumo' })

    expect(translation).toBeInstanceOf(Translation)
    expect(translation.provider).toBeInstanceOf(ResourceProvider)
    expect(translation.lemmaWord).toEqual('sumo')
    expect(translation.languageCode).toEqual('ita')
    expect(translation.glosses).toEqual(['prendere, impadronirsi di', 'scegliere'])

    let convertedJSON = translation.convertToJSONObject()
    expect(convertedJSON).toEqual(translationJSON)
  })

  it('3 Definition - readObject from JSON and convert to JSON', () => {
    let providerJSON = {
      uri: 'net.alpheios:tools:wordsxml.v1',
      rights: {
        default: 'Short definitions and morphology from Words by William Whitaker, Copyright 1993-2007.'
      }
    }

    let definitionJSON = {
      ID: 'c3489e08-0727-4ce7-b27b-9ff139c7e26b',
      format: 'text/plain',
      language: 'eng',
      lemmaText: 'sumo',
      text: 'take up; begin; suppose, assume; select; purchase; exact (punishment); obtain;',
      provider: providerJSON
    }

    let definition = Definition.readObject(definitionJSON)

    expect(definition).toBeInstanceOf(Definition)
    expect(definition.text).toEqual('take up; begin; suppose, assume; select; purchase; exact (punishment); obtain;')
    expect(definition.language).toEqual('eng')
    expect(definition.format).toEqual('text/plain')
    expect(definition.lemmaText).toEqual('sumo')
    expect(definition.ID).toEqual('c3489e08-0727-4ce7-b27b-9ff139c7e26b')
    expect(definition.provider).toBeInstanceOf(ResourceProvider)

    let convertedJSON = definition.convertToJSONObject()
    expect(convertedJSON).toEqual(definitionJSON)
  })

  it('4 Lexeme - readObject from JSON and convert to JSON', () => {
    let inflectionsJSON = [
      {
        languageCode: 'lat',
        prefix: null,
        stem: 'sum',
        suffix: null,
        example: null,
        features: [
          {
            type: 'full form', languageCode: 'lat', 'sortOrder': 1, allowedValues: [], data: [['sum', 1]]
          },
          {
            type: 'part of speech',
            languageCode: 'lat',
            'sortOrder': 1,
            allowedValues: ['verb', 'adverb', 'adverbial', 'adjective', 'article'],
            data: [['verb', 1]]
          }
        ]
      }
    ]

    let providerTranslationJSON = {
      uri: 'https://ats.alpheios.net',
      rights: {
        default: 'Lemma translatins are extracted from data provided under the GNU GPL v3 license by ...'
      }
    }

    let translationJSON = {
      languageCode: 'ita',
      provider: providerTranslationJSON,
      translations: [
        'prendere, impadronirsi di', 'scegliere'
      ]
    }

    let providerDefinitionJSON = {
      uri: 'net.alpheios:tools:wordsxml.v1',
      rights: {
        default: 'Short definitions and morphology from Words by William Whitaker, Copyright 1993-2007.'
      }
    }

    let definitionJSON = {
      ID: 'c3489e08-0727-4ce7-b27b-9ff139c7e26b',
      format: 'text/plain',
      language: 'eng',
      lemmaText: 'sumo',
      text: 'take up; begin; suppose, assume; select; purchase; exact (punishment); obtain;',
      provider: providerDefinitionJSON
    }

    let lemmaJSON = {
      word: 'sumo',
      language: 'lat',
      principalParts: ['sumo', 'sumere', 'sumpsi', 'sumptus'],
      translation: translationJSON,
      features: [
        {
          type: 'part of speech',
          languageCode: 'lat',
          'sortOrder': 1,
          allowedValues: ['verb', 'adverb', 'adverbial', 'adjective', 'article'],
          data: [['verb', 1]]
        }
      ]
    }

    let meaningJSON = {
      fullDefs: [],
      languageCode: 'lat',
      lemmaWord: 'sumo',
      shortDefs: [ definitionJSON ]
    }

    let providerJSON = {
      uri: 'net.alpheios:tools:wordsxml.v1',
      rights: {
        default: 'Short definitions and morphology from Words by William Whitaker, Copyright 1993-2007.'
      }
    }

    let lexemeJSON = {
      inflections: inflectionsJSON,
      lemma: lemmaJSON,
      meaning: meaningJSON,
      provider: providerJSON
    }

    let lexeme = Lexeme.readObject(lexemeJSON)

    expect(lexeme).toBeInstanceOf(Lexeme)
    expect(lexeme.provider).toBeInstanceOf(ResourceProvider)
    expect(lexeme.lemma).toBeInstanceOf(Lemma)
    expect(lexeme.inflections.length).toEqual(1)
    expect(lexeme.inflections[0]).toBeInstanceOf(Inflection)
    expect(lexeme.meaning).toBeInstanceOf(DefinitionSet)
    expect(lexeme.disambiguated).toBeFalsy()

    let convertedJSON = lexeme.convertToJSONObject(true)
    expect(convertedJSON.inflections).toEqual(lexemeJSON.inflections)
    expect(convertedJSON.lemma).toEqual(lexemeJSON.lemma)

    expect(convertedJSON.meaning).toEqual(lexemeJSON.meaning)
    expect(convertedJSON.provider).toEqual(lexemeJSON.provider)
  })
})
