class TextWork {
  /**
  * Constructor, extracts ID from urn
  * @param {Author} author - author of the textWork
  * @param {String} urn - string identificator in special format, for example 'urn:cts:latinLit:phi0959'
  * @param {Object} titles - has the following format { languageCode: title }
  * @returns {TextWork}
  */
  constructor (author, urn, titles) {
    this.urn = urn
    this.titles = titles
    this.author = author
    this.ID = this.extractIDFromURN()
  }

  /**
  * This property is used to define title for panel
  * @returns {String}
  */
  static get defaultLang () {
    return 'eng'
  }

  /**
  * This property is used to define prefix fr extract ID
  * @returns {String}
  */
  static get defaultIDPrefix () {
    return 'phi'
  }

  /**
  * Method returns title in default language or (if not exists) it returns first available title
  * @returns {String}
  */
  get title () {
    if (this.titles[TextWork.defaultLang]) {
      return this.titles[TextWork.defaultLang]
    } else if (Object.values(this.titles).length > 0) {
      return Object.values(this.titles)[0]
    }
    return null
  }

  /**
  * Method returns TextWork for given jsonObj (from concordance API)
  * @param {Author} author - author of the textWork
  * @param {Object} jsonObj - json object with data of the TextWork
  * @returns {TextWork}
  */
  static create (author, jsonObj) {
    let titles = {}
    jsonObj.title.forEach(titleItem => {
      titles[titleItem['@lang']] = titleItem['@value']
    })

    return new TextWork(author, jsonObj.urn, titles)
  }

  /**
  * Method extracts ID from the urn, if it is correct. Otherwise it returns null.
  * @returns {Number, null}
  */
  extractIDFromURN () {
    let partsUrn = this.urn.split(':')

    if (Array.isArray(partsUrn) && partsUrn.length >= 4) {
      let workIDPart = partsUrn[3].indexOf('.') === -1 ? null : partsUrn[3].substr(partsUrn[3].indexOf('.') + 1)
      return parseInt(workIDPart.replace(TextWork.defaultIDPrefix, ''))
    }
    return null
  }
}

export default TextWork
