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
      for (let pageIndex = 0; pageIndex <= maxPages; pageIndex += 1) {
        if (shouldStop(allResults, pageIndex)) {
          break
        }
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

        const cookieDialog = await page.$('.fc-footer-buttons-container')
        if (cookieDialog) {
          const consentButton = await page.$(
            '.fc-footer-buttons-container button:first-child'
          )
          if (consentButton) {
            await consentButton.click()
          }
        }

        const { success, isLastElement } = await detailedListingNavigator(page)
        if (success) {
          const results = await pageProcessor(page)
          allResults.push(...results)
          await Promise.all([page.waitForNavigation(), page.goBack()])
          pageIndex -= 1
          if (isLastElement) {
            break
          }
          continue
        }
        if (isLastElement) {
          if (shouldStop(allResults, pageIndex + 1)) {
            break
          }
          const { success: nextSuccess } = await nextListingNavigator(page)
          if (nextSuccess) {
            continue
          }
        } else {
          break
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
