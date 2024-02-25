import { IObituary } from '../../domain/types'
import { PageProcessorCreator } from '../../types'
import consent from './consent'

export const createObituaryCategoryProcessor: PageProcessorCreator =
  (obituaryProcessor) => async (page) => {
    const obituaries: IObituary[] = []
    try {
      await consent(page)
      const container = await page.$('div.size-vise')
      if (!container) {
        return obituaries
      }
      const obituary = await obituaryProcessor(container)
      if (obituary) {
        obituaries.push(obituary)
      }
      return obituaries
    } catch (err) {
      console.error('obituary processor error: ', err)
      return obituaries
    }
  }
