import { createObituaryCategoryProcessor } from '../../crawlers/osmrtnica/pageProcessor'
import { SiteProcessorFactory } from '../../types'

const createSiteProcessor: SiteProcessorFactory = (
  obituaryProcessor,
  nextListingNavigator,
  shouldStop,
  detailedListingNavigator,
  maxPages = 10
) => {
  const pageProcessor = createObituaryCategoryProcessor(obituaryProcessor)
  return async (page) => {
    const allResults = []
    try {
      for (
        let pageIndex = 0;
        !shouldStop(allResults, pageIndex) && pageIndex <= maxPages;
        pageIndex += 1
      ) {
        if (!detailedListingNavigator) {
          const results = await pageProcessor(page)
          allResults.push(...results)
          const { success } = await nextListingNavigator(page)
          if (!success) {
            break
          } else {
            continue
          }
        }

        const { success, isLastElement } = await detailedListingNavigator(page)
        if (success) {
          const results = await pageProcessor(page)
          allResults.push(...results)
          await page.goBack({ waitUntil: 'domcontentloaded' })
          pageIndex -= 1
          continue
        }

        if (isLastElement) {
          const { success: nextSuccess } = await nextListingNavigator(page)
          if (nextSuccess) {
            continue
          }
        }

        return allResults
      }
    } catch (err) {
      console.error(err)
      return allResults
    }

    return allResults
  }
}

export default createSiteProcessor
