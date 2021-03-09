import { SiteProcessorFactory } from '../../types'

const MAX_PAGES = 100

const createSiteProcessor: SiteProcessorFactory = (
  pageProcessor,
  nextListingNavigator,
  stopCondition,
  detailedListingNavigator
) => async (page) => {
  const allResults = []
  try {
    for (
      let pageIndex = 0;
      !stopCondition(allResults, pageIndex) && pageIndex <= MAX_PAGES;
      pageIndex += 1
    ) {
      if (detailedListingNavigator) {
        const { success } = await detailedListingNavigator(page)
        if (!success) {
          break
        }
      }

      const results = await pageProcessor(page)

      allResults.push(...results)

      if (detailedListingNavigator) {
        await page.goBack()
      }

      const { success } = await nextListingNavigator(page)
      if (!success) {
        break
      }
    }
  } catch (err) {
    console.error(err)
  }

  return allResults
}

export default createSiteProcessor
