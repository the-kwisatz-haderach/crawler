import type { Obituary } from '../../lib/models/obituary/types'
import type { PageProcessor } from '../../lib/types'
import obituaryProcessor from './obituaryProcessor'

const pageProcessor: PageProcessor<Obituary[]> = async (page) => {
  const obituaries: Obituary[] = []
  try {
    const obituary = await obituaryProcessor(page)

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
