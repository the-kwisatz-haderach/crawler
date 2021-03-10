import { Page } from 'puppeteer'
import { ItemProcessorFactory } from '../../types'

const createItemProcessor: ItemProcessorFactory = (
  itemDefaults,
  rootSelector,
  propertyProcessors
) => async (page: Page) => {
  try {
    const rootItem = await page.$(rootSelector)

    if (!rootItem) {
      return null
    }

    return await Object.entries(propertyProcessors).reduce<any>(
      async (item, [key, values]) => {
        try {
          const value = await values(rootItem)
          return {
            ...item,
            [key]: value ?? itemDefaults[key]
          }
        } catch (err) {
          console.log(err)
          return {
            ...item,
            [key]: itemDefaults[key]
          }
        }
      },
      itemDefaults
    )
  } catch (err) {
    return null
  }
}

export default createItemProcessor
