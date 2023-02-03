import {
  createDetailPageNavigator,
  createPageNavigator
} from '../../helpers/createPageNavigator'

export const nextPageNavigator = createPageNavigator(async (page) => {
  const element = await page.$('a[rel="next"]')
  return element
})

export const detailPageNavigator = createDetailPageNavigator(async (page) => {
  const elements = await page.$$('.profile-d-naslov')
  return elements
})
