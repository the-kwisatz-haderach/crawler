import { Page } from 'puppeteer'
import { Obituary } from '../../models/obituary/types'
import pageNavigator from './pageNavigator'
import pageParser from './pageParser'

const documentProcessor = async (page: Page) => {
  const allResults: Obituary[] = []

  for (let i = 0; i < 2; i++) {
    const results = await pageParser(page)
    allResults.push(...results)
    const { success } = await pageNavigator(page)
    if (!success) {
      break
    }
  }

  return allResults
}

export default documentProcessor
