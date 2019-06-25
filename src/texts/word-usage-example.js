import TextQuoteSelector from '../w3c/text-quote-selector.js'
import LanguageModelFactory from '../language_model_factory.js'

export default class WordUsageExample extends TextQuoteSelector {
  constructor (language, targetWord, prefix, suffix, source, cit) {
    super(language, targetWord)
    this.prefix = prefix
    this.suffix = suffix
    this.source = source
    this.cit = cit
  }
  createContext () {
    return null // not implemented in the current child-class
  }

  /**
  * Creates a full text of example prefix + word + suffix
  * @returns {String}
  */
  get htmlExample () {
    return `${this.prefix}<span class="alpheios_word_usage_list_item__text_targetword">${this.normalizedText}</span>${this.suffix}`
  }

  /**
  * Creates a full description - author + textWork + cit number
  * @param {String} lang - language for getting text
  * @returns {String}
  */
  fullCit (lang) {
    if (!this.cit) {
      return ''
    }

    let citSplitArr = this.cit.split('.')
    let finalFullCit = this.author ? this.author.title(lang) + ' ' : citSplitArr[0] + '.'
    finalFullCit = finalFullCit + (this.textWork ? this.textWork.title(lang) + ' ' : citSplitArr[1] + '.')
    finalFullCit = finalFullCit + citSplitArr.slice(2).join('.')

    return finalFullCit
  }

  authorForSort (lang) {
    if (this.author) {
      return this.author.title(lang).toUpperCase()
    } else {
      if (this.cit && this.cit.split('.') && this.cit.split('.').length >= 2) {
        return this.cit.split('.')[0].toUpperCase()
      }
    }
    return this.fullCit(lang).toUpperCase()
  }

  textWorkForSort (lang) {
    if (this.textWork) {
      return this.textWork.title(lang).toUpperCase()
    } else {
      if (this.cit && this.cit.split('.') && this.cit.split('.').length >= 2) {
        return this.cit.split('.')[1].toUpperCase()
      }
    }
    return this.fullCit(lang).toUpperCase()
  }

  get prefixForSort () {
    let model = LanguageModelFactory.getLanguageModelFromCode(this.languageCode)
    let clearPrefix = this.prefix.replace(new RegExp('[' + model.getPunctuation() + ' ]', 'g'), ' ').toUpperCase().split(' ').filter(item => item.length > 0)
    return clearPrefix[clearPrefix.length - 1]
  }

  get suffixForSort () {
    let model = LanguageModelFactory.getLanguageModelFromCode(this.languageCode)
    return this.suffix.replace(new RegExp('[' + model.getPunctuation() + ' ]', 'g'), '').toUpperCase()
  }
}
