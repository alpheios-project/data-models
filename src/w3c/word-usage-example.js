import TextQuoteSelector from './text-quote-selector'

export default class WordUsageExample extends TextQuoteSelector {
  createContext () {
    return null // not implemented in the current child-class
  }
  static readObject (jsonObj, homonym, author, textWork, sourceLink) {
    let wordUsageExample = new WordUsageExample(homonym.language, jsonObj.target)
    wordUsageExample.prefix = jsonObj.left
    wordUsageExample.suffix = jsonObj.right
    wordUsageExample.source = sourceLink + jsonObj.link
    wordUsageExample.cit = jsonObj.cit
    wordUsageExample.author = author
    wordUsageExample.textWork = textWork

    return wordUsageExample
  }

  get htmlExample () {
    return `${this.prefix}<span class="alpheios_word_usage_list_item__text_targetword">${this.normalizedText}</span>${this.suffix}`
  }
}
