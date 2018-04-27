/**
 * stores a scope of lemma translations from python service
 * Contains a primary Lemma object
 */
class Translation {
  /**
   * Initializes a Translation object.
   * @param {Lemma} lemma - A lemma object.
   * @param [] meanings - A set of definitions.

   */
  constructor (lemma, languageCode, meaningsString = '') {
    if (!lemma) {
      throw new Error('Lemma should not be empty.')
    }
    this.lemmaWord = lemma.word
    this.languageCode = languageCode
    this.glosses = Translation.convertMeaningsToArray(meaningsString)
  }

  static convertMeaningsToArray (meaningsString, divider = ';') {
    if (meaningsString.length === 0) {
      return []
    } else {
      return meaningsString.split(divider).map(function (item) { return item.trim() })
    }
  }
  static readTranslationFromJSONList (lemma, languageCode, translationsList) {
    if (!translationsList || !Array.isArray(translationsList)) {
      console.log('**************', !translationsList)
      console.log('**************', !Array.isArray(translationsList))
      console.log('Recieved not proper translation list', translationsList)
      throw new Error('Recieved not proper translation list', translationsList)
    }
    let curTranslations = translationsList.find(function (element) { return element.in === lemma.word })
    return new Translation(lemma, languageCode, curTranslations.translations.join(', '))
  }

  static loadTranslations (lemma, languageCode, translationsList) {
    lemma.addTranslation(this.readTranslationFromJSONList(lemma, languageCode, translationsList))
  }
}
export default Translation
