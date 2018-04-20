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
}
export default Translation
