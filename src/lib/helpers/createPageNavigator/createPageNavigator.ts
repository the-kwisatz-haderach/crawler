import { NextPageNavigatorFactory } from '../../types'

const createPageNavigator: NextPageNavigatorFactory = (
  nextPageLinkSelector
) => {
  return async (page) => {
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
