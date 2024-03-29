import { ItemProcessorFactory } from '../../types'

const createItemProcessor: ItemProcessorFactory =
  (itemDefaults, propertyProcessors) => async (rootItem) => {
    try {
      if (!rootItem) {
        return null
      }

      const values = await Promise.all(
        Object.entries(propertyProcessors).map(
          async ([key, value]: [key: string, value: any]) => ({
            [key]: (await value(rootItem)) ?? itemDefaults[key]
          })
        )
      )

      return values.reduce<typeof itemDefaults>(
        (acc, curr) => ({
          ...acc,
          ...curr
        }),
        itemDefaults
      )
    } catch (err) {
      console.error(err)
      return null
    }
  }

export default createItemProcessor
