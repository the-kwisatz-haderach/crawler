import { IObituary } from '../../domain/types'
import { PageProcessorCreator } from '../../types'

export const createObituaryCategoryProcessor: PageProcessorCreator =
  (obituaryProcessor) => async (page) => {
    const obituaries: IObituary[] = []
    try {
      const cookieDialog = await page.$('.fc-footer-buttons-container')
      if (cookieDialog) {
        const consentButton = await page.$(
          '.fc-footer-buttons-container button:first-child'
        )
        if (consentButton) {
          await consentButton.click()
        }
      }
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
