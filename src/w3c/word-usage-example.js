import TextQuoteSelector from './text-quote-selector'

export default class WordUsageExample extends TextQuoteSelector {
  createContext () {
    return null // not implemented in the current child-class
  }

  /**
  * Creates WordUsageExample object from jsonObj, homonym, author, textWork and link from the adapter config
  * @param {Object} jsonObj - json object from concordance api
  * @param {Homonym} homonym - source homonym object
  * @param {Author} author - source author object, could be undefined
  * @param {TextWork} textWork - source textWork object, could be undefined
  * @param {String} sourceLink - sourceTextUrl from the adapter config file
  * @returns {WordUsageExample}
  */
  static readObject (jsonObj, homonym, author, textWork, sourceLink) {
    let wordUsageExample = new WordUsageExample(homonym.language, jsonObj.target)
    wordUsageExample.prefix = jsonObj.left
    wordUsageExample.suffix = jsonObj.right
    wordUsageExample.source = sourceLink + jsonObj.link
    wordUsageExample.cit = jsonObj.cit
    wordUsageExample.author = author
    wordUsageExample.textWork = textWork
    wordUsageExample.homonym = homonym

    return wordUsageExample
  }

  /**
  * Creates a full text of example prefix + word + suffix
  * @returns {String}
  */
  get htmlExample () {
    return `${this.prefix}<span class="alpheios_word_usage_list_item__text_targetword">${this.normalizedText}</span>${this.suffix}`
  }
}
