import uuidv4 from 'uuid/v4'
import ResourceProvider from './resource_provider.js'

class Definition {
  constructor (text, language, format, lemmaText) {
    this.text = text
    this.language = language
    this.format = format
    this.lemmaText = lemmaText

    this.ID = uuidv4()
  }

  static readObject (jsonObject) {
    let resDefinition = new Definition(jsonObject.text, jsonObject.language, jsonObject.format, jsonObject.lemmaText)

    if (jsonObject.provider) {
      resDefinition.provider = ResourceProvider.readObject(jsonObject.provider)
    }

    if (jsonObject.ID) {
      resDefinition.ID = jsonObject.ID
    }

    return resDefinition
  }

  convertToJSONObject () {
    let result = {
      text: this.text,
      language: this.language,
      format: this.format,
      lemmaText: this.lemmaText,
      ID: this.ID
    }

    if (this.provider) {
      result.provider = this.provider.convertToJSONObject()
    }
    return result
  }
}
export default Definition
