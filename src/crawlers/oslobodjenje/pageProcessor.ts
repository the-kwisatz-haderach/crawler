import type { Obituary } from '../../lib/models/obituary/types'
import type { PageProcessor } from '../../lib/types'
import obituaryProcessor from './obituaryProcessor'

const pageProcessor: PageProcessor<Obituary[]> = async (page) => {
  const obituaries: Obituary[] = []
  try {
    const items = await page.$$('.obituaryItem')

    for (const item of items) {
      const values = await obituaryProcessor(item)
      if (values) {
        obituaries.push(values)
      }
    }

    return obituaries
  } catch (err) {
    console.error(err)
    return obituaries
  }
}

export default pageProcessor
