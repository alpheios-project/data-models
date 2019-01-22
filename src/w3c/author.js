import TextWork from './text-work'

class Author {
  /**
  * Constructor, extracts ID from urn
  * @param {String} urn - string identificator in special format, for example 'urn:cts:latinLit:phi0959'
  * @param {Object} titles - has the following format { languageCode: title }
  * @returns {Author}
  */
  constructor (urn, titles) {
    this.urn = urn
    this.titles = titles
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
    if (this.titles[Author.defaultLang]) {
      return this.titles[Author.defaultLang]
    } else if (Object.values(this.titles).length > 0) {
      return Object.values(this.titles)[0]
    }
    return null
  }

  /**
  * Method returns Author for given jsonObj (from concordance API)
  * @param {Object} jsonObj - json object with data of the Author
  * @returns {Author}
  */
  static create (jsonObj) {
    let titles = {}
    jsonObj.title.forEach(titleItem => {
      titles[titleItem['@lang']] = titleItem['@value']
    })

    let author = new Author(jsonObj.urn, titles)
    let works = []

    jsonObj.works.forEach(workItem => {
      works.push(TextWork.create(author, workItem))
    })

    author.works = works
    return author
  }

  /**
  * Method extracts ID from the urn, if it is correct. Otherwise it returns null.
  * @returns {Number, null}
  */
  extractIDFromURN () {
    let partsUrn = this.urn.split(':')
    if (Array.isArray(partsUrn) && partsUrn.length >= 4) {
      let workIDPart = partsUrn[3].indexOf('.') === -1 ? partsUrn[3] : partsUrn[3].substr(0, partsUrn[3].indexOf('.'))
      return parseInt(workIDPart.replace(Author.defaultIDPrefix, ''))
    }
    return null
  }
}

export default Author
