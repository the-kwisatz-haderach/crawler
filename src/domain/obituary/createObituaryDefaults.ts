import { IObituary } from '../types'

export const createObituaryDefaults = (): IObituary => ({
  firstname: '',
  surname: '',
  date_of_birth: '',
  date_of_death: '',
  is_crawled: true,
  type: 'obituary',
  date_created: new Date().toISOString(),
  date_updated: new Date().toISOString(),
  long_text: ''
})
