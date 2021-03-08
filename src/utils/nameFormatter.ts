const nameFormatter = (name: string): string =>
  name.replace(/([,.]|\d|\s)+/g, '')

export default nameFormatter
