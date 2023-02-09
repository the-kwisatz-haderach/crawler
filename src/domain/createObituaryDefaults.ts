import { IObituary } from './types'

export const createObituaryDefaults = (): IObituary => {
  const currentDate = new Date(Date.now()).toISOString()
  return {
    firstname: '',
    surname: '',
    prefix: '',
    date_of_birth: '',
    date_of_death: '',
    is_crawled: true,
    type: 'obituary',
    date_created: currentDate,
    date_updated: currentDate,
    long_text: '',
    name_misc: '',
    city: '',
    additional_information: '',
    preamble: '',
    relative: '',
    size: 'regular'
  }
}
