import Lemma from './lemma.js'
import Inflection from './inflection.js'
import DefinitionSet from './definition-set'
import LMF from './language_model_factory'

/**
 * A basic unit of lexical meaning. Contains a primary Lemma object, one or more Inflection objects
 * and a DefinitionSet
 */
class Lexeme {
  /**
   * Initializes a Lexeme object.
   * @param {Lemma} lemma - A lemma object.
   * @param {Inflection[]} inflections - An array of inflections.
   * @param {DefinitionSet} meaning - A set of definitions.

   */
  constructor (lemma, inflections, meaning = null) {
    if (!lemma) {
      throw new Error('Lemma should not be empty.')
    }

    if (!(lemma instanceof Lemma)) {
      throw new Error('Lemma should be of Lemma object type.')
    }

    if (!inflections) {
      throw new Error('Inflections data should not be empty.')
    }

    if (!Array.isArray(inflections)) {
      throw new Error('Inflection data should be provided in an array.')
    }

    for (let inflection of inflections) {
      if (!(inflection instanceof Inflection)) {
        throw new Error('All inflection data should be of Inflection object type.')
      }
    }

    if (meaning !== null && !(meaning instanceof DefinitionSet)) {
      throw new Error('Meaning should be of DefinitionSet object type.')
    }

    this.lemma = lemma
    this.inflections = inflections
    this.inflections.forEach(i => { i.lemma = lemma })
    this.meaning = meaning || new DefinitionSet(this.lemma.word, this.lemma.languageID)
  }

  /**
   * test to see if a lexeme is populated with meaningful data
   * Returns true if any of these are true:
   *   its lemma has morphological features defined
   *   it has one ore more definitions supplied in the meaning
   *   it has one ore more inflections
   * @return {boolean}
   */
  isPopulated () {
    return Object.entries(this.lemma.features).length > 0 ||
      !this.meaning.isEmpty() ||
      this.inflections.length > 0
  }

  /**
   * disambiguate one Lexeme with another supplied Lexeme
   * @param {Lexeme} base the lexeme to be disambiguated
   * @param {Lexeme} disambiguator the lexeme to use for disambiguation
   * @return {Lexeme} the disambiguated lexeme
   */
  static disambiguate (base, disambiguator) {
    let disambiguated = base
    if (base.lemma.isFullHomonym(disambiguator.lemma)) {
      let keepInflections = []
      // iterate through this lexemes inflections and keep only thoes that are disambiguatedBy by the supplied lexeme's inflection
      for (let inflection of base.inflections) {
        for (let disambiguatorInflection of disambiguator.inflections) {
          if (inflection.disambiguatedBy(disambiguatorInflection)) {
            keepInflections.push(inflection)
          }
        }
      }
      // if we have identified a subset of inflections to keep, create a new Lexeme
      // with the revised set of inflections
      if (keepInflections.length > 0) {
        disambiguated = new Lexeme(base.lemma, keepInflections, base.meaning)
      }
    }
    return disambiguated
  }

  getGroupedInflections () {
    let lm = LMF.getLanguageModel(this.lemma.languageID)
    return lm.groupInflectionsForDisplay(this.inflections)
  }

  static readObject (jsonObject) {
    let lemma = Lemma.readObject(jsonObject.lemma)
    let inflections = []
    for (let inflection of jsonObject.inflections) {
      inflections.push(Inflection.readObject(inflection))
    }

    let lexeme = new Lexeme(lemma, inflections)
    lexeme.meaning = DefinitionSet.readObject(jsonObject.meaning)
    return lexeme
  }

  /**
   * Get a sort function for an array of lexemes which applies a primary and secondary
   * sort logic using the sort order specified for each feature. Sorts in descending order -
   * higher sort order means it should come first
   * @param {string} primary feature name to use as primary sort key
   * @param {string} secondary feature name to use as secondary sort key
   * @returns {Function} function which can be passed to Array.sort
   */
  static getSortByTwoLemmaFeatures (primary, secondary) {
    return (a, b) => {
      if (a.lemma.features[primary] && b.lemma.features[primary]) {
        let primarySort = a.lemma.features[primary].compareTo(b.lemma.features[primary])
        if (primarySort !== 0) {
          return primarySort
        } else if (a.lemma.features[secondary] && b.lemma.features[secondary]) {
          return a.lemma.features[secondary].compareTo(b.lemma.features[secondary])
        } else if (a.lemma.features[secondary] && !b.lemma.features[secondary]) {
          return -1
        } else if (!a.lemma.features[secondary] && b.lemma.features[secondary]) {
          return 1
        }
      } else if (a.lemma.features[primary] && !b.lemma.features[primary]) {
        return -1
      } else if (!a.lemma.features[primary] && b.lemma.features[primary]) {
        return 1
      } else {
        return 0
      }
    }
  }
}
export default Lexeme
