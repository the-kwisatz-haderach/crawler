export const dateParser = (dateString: string): string => {
  const dates = (dateString.match(/\d+/g) || []).map(Number)
  if (dates.length === 1) {
    return new Date(Date.UTC(dates[0], 0, 1)).toISOString()
  } else if (dates.length === 3) {
    return new Date(Date.UTC(dates[2], dates[1] - 1, dates[0])).toISOString()
  } else {
    return ''
  }
}
