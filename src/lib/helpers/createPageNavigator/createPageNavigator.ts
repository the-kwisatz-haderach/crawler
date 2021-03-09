import { PageNavigatorFactory } from '../../types'

const createPageNavigator: PageNavigatorFactory = (pageNavigator) => {
  return async (page) => {
    try {
      const element = await pageNavigator(page)
      await Promise.all([page.waitForNavigation(), element?.click()])
      return { success: true }
    } catch (err) {
      console.error(err)
      return { success: false }
    }
  }
}

export default createPageNavigator
