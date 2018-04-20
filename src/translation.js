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
  constructor (lemma, meanings = []) {
    if (!lemma) {
      throw new Error('Lemma should not be empty.')
    }

    this.lemma = lemma
    this.meanings = meanings
  }

  static loadTranslations (lemma, itemTranslations) {
    lemma.addTranslation(new Translation(lemma, itemTranslations.translations.join(', ')))
    console.log('**********update lemma with translation', lemma.word, itemTranslations, itemTranslations.translations)
  }
}
export default Translation
