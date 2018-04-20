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
    // if (!lemma) {
    //   throw new Error('Lemma should not be empty.')
    // }

    this.lemma = lemma
    this.meanings = meanings
  }

  static loadTranslations (lemma, translationsList) {
    // console.log('******** Translation class fetching translations', translationsList)

    let res = []
    translationsList.forEach(function (item) {
      // console.log('translationsList item ', item)
      lemma.addTranslation(new Translation(lemma, item.translations))
      res.push(lemma)
    })

    console.log('******** Translation class fetching translations 2 ', res)

    return res
  }
}
export default Translation
