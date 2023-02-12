import { IObituary } from '../../domain/types'
import { PageProcessor } from '../../types'
import obituaryProcessor from './obituaryProcessor'

export const obituaryCategoryProcessor: PageProcessor<IObituary[]> = async (
  page
) => {
  const obituaries: IObituary[] = []
  try {
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
    console.error(err)
    return obituaries
  }
}
