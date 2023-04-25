import crypto from 'crypto'
import { IObituary } from './types'

export const createCrawlKey = (obituary: IObituary): string =>
  crypto
    .createHash('md5')
    .update(
      obituary.relative +
        obituary.firstname +
        obituary.surname +
        obituary.date_of_birth +
        obituary.date_of_death +
        (obituary.relative || '') +
        (obituary.prefix || '') +
        (obituary.name_misc || '') +
        (obituary.long_text || '')
    )
    .digest('hex')

export default function createObituary(input: Partial<IObituary>): IObituary {
  const currentDate = new Date(Date.now()).toISOString()
  const obituary: IObituary = {
    appreciations: input.appreciations || 0,
    date_created: currentDate,
    date_updated: currentDate,
    firstname: input.firstname || '',
    surname: input.surname || '',
    date_of_birth: input.date_of_birth || '',
    date_of_death: input.date_of_death || '',
    image: input.image || '',
    type: input.type || 'obituary',
    name_misc: input.name_misc || '',
    relative: input.relative || '',
    long_text: input.long_text || '',
    prefix: input.prefix || '',
    is_crawled: true,
    preamble: '',
    size: 'regular',
    city: '',
    additional_information: '',
    crawl_key: '',
    ...input
  }

  obituary.crawl_key = createCrawlKey(obituary)

  return obituary
}
