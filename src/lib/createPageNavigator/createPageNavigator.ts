import { ElementHandle, Page } from 'puppeteer'

const createPageNavigator = (
  nextPageLinkSelector: (page: Page) => Promise<ElementHandle<any> | null>
) => {
  return async (page: Page): Promise<{ success: boolean }> => {
    try {
      const element = await nextPageLinkSelector(page)
      await Promise.all([page.waitForNavigation(), element?.click()])
      return { success: true }
    } catch (err) {
      console.error(err)
      return { success: false }
    }
  }
}

export default createPageNavigator
