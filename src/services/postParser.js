class PostParser {
  constructor(inputField) {
    this.inputField = inputField
  }

  static get mentions() {
    return 'mentions'
  }

  static get hashtags() {
    return 'hashtags'
  }

}
