import { obituaryIdGenerator } from '../../../lib/helpers/obituaryIdGenerator'
import { ObituaryMap, ObituaryPageProcessor } from '../../../lib/types'
import pageNavigator from './pageNavigator'
import pageParser from './pageProcessor'

export const documentProcessor: ObituaryPageProcessor = async (page) => {
  const allResults: ObituaryMap = {}

  for (let pageIndex = 0; pageIndex < 5; pageIndex++) {
    const results = await pageParser(page)

    results.forEach((obituary) => {
      const id = obituaryIdGenerator(obituary)
      allResults[id] = obituary
    })

    const { success } = await pageNavigator(page)
    if (!success) {
      break
    }
  }

  return allResults
}
