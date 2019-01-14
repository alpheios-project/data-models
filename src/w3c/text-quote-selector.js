/**
 * Implements a W3C Text Quote Selector (https://www.w3.org/TR/annotation-model/#h-text-quote-selector)
 */

export default class TextQuoteSelector {
  constructor (languageCode, normalizedText) {
    this.languageCode = languageCode
    this.normalizedText = normalizedText
    this.contextForward = 6
    this.contextBackward = 6
  }

  get contextHTML () {
    return `${this.prefix}<span class="alpheios_worditem_incontext">${this.text}</span>${this.suffix}`
  }

  createContext (selection, textSelector) {
    this.prefix = selection.anchorNode.data.substr(0, textSelector.start)
    this.suffix = selection.anchorNode.data.substr(textSelector.end)
    this.text = textSelector.text
    this.source = window.location.href
    this.languageCode = textSelector.languageCode
  }

  static readObject (jsonObject) {
    console.info('******************TextQuoteSelector readObject', jsonObject)
    let tq = new TextQuoteSelector(jsonObject.languageCode, jsonObject.target.selector.exact)
    tq.prefix = jsonObject.target.selector.prefix
    tq.suffix = jsonObject.target.selector.suffix
    tq.text = jsonObject.targetWord
    tq.source = jsonObject.target.source
    return tq
  }
}
