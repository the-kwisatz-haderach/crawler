import { IObituary } from '../../domain/types'
import { PageProcessor } from '../../types'
import obituaryProcessor from './obituaryProcessor'

const pageProcessor: PageProcessor<IObituary[]> = async (page) => {
  const obituaries: IObituary[] = []
  try {
    const items = await page.$$('.obituaryItem')
    console.log('#')
    console.log('#')
    console.log('#')
    console.log(items)
    console.log('#')
    console.log('#')
    console.log('#')
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
