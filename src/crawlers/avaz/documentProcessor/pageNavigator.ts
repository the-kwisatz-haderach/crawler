import { createPageNavigator } from '../../../lib/helpers/createPageNavigator'

export default createPageNavigator(async (page) => {
  const elements = await page.$$('.Pagination-item')
  return elements.slice(-2)[0]
})
