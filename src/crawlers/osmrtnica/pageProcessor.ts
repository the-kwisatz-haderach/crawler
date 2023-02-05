import { IObituary } from '../../domain/types'
import { PageProcessor } from '../../types'
import obituaryProcessor from './obituaryProcessor'

export const obituaryCategoryProcessor: PageProcessor<IObituary[]> = async (
  page
) => {
  const obituaries: IObituary[] = []
  try {
    const obituary = await obituaryProcessor(await page.$('div.size-vise'))
    if (obituary) {
      obituaries.push(obituary)
    }
    return obituaries
  } catch (err) {
    console.error(err)
    return obituaries
  }
}
