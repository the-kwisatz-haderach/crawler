import type { IObituary } from '../../lib/models/obituary/types'
import type { PageProcessor } from '../../lib/types'
import obituaryProcessor from './obituaryProcessor'

const pageProcessor: PageProcessor<IObituary[]> = async (page) => {
  const obituaries: IObituary[] = []
  try {
    const obituary = await obituaryProcessor(await page.$('.obituary'))

    if (obituary) {
      obituaries.push(obituary)
    }

    return obituaries
  } catch (err) {
    console.error(err)
    return obituaries
  }
}

export default pageProcessor
