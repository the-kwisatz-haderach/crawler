import { IObituary, IObituaryInput } from './types'

export default function createObituary(input: IObituaryInput): IObituary {
  const currentDate = new Date(Date.now()).toISOString()
  return {
    date_created: currentDate,
    date_updated: currentDate,
    firstname: input.firstname,
    surname: input.surname,
    date_of_birth: input.date_of_birth,
    date_of_death: input.date_of_death,
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
    additional_information: ''
  }
}
