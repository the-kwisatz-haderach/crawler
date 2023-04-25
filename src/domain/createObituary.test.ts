import { IObituary } from './types'
import createObituary from './createObituary'

jest.useFakeTimers('modern').setSystemTime(new Date('2020-01-01'))

describe('createObituary', () => {
  it('creates an obituary with only required fields populated', () => {
    const date_of_birth = new Date(1234)
    const date_of_death = new Date(1234 + 1)

    const expected: Omit<IObituary, '_id'> = {
      date_created: 'someDate',
      firstname: 'Hello',
      surname: 'World',
      date_of_birth: date_of_birth.toString(),
      date_of_death: date_of_death.toString(),
      image: '',
      type: 'obituary',
      long_text: '',
      name_misc: '',
      relative: '',
      is_crawled: true,
      crawl_key: '',
      appreciations: 0
    }
    expect(
      createObituary({
        type: 'obituary',
        firstname: 'Hello',
        surname: 'World',
        date_of_birth: date_of_birth.toString(),
        date_of_death: date_of_death.toString()
      })
    ).toEqual(expected)
  })
  it('creates an obituary with all fields populated', () => {
    const date_of_birth = new Date(1234)
    const date_of_death = new Date(1234 + 1)

    const expected: Omit<IObituary, '_id'> = {
      date_created: 'someDate',
      firstname: 'Hello',
      surname: 'World',
      date_of_birth: date_of_birth.toString(),
      date_of_death: date_of_death.toString(),
      image: 'testurl',
      type: 'gratitude-display',
      long_text: 'Some description',
      name_misc: 'middlename',
      relative: 'relatives',
      is_crawled: true,
      crawl_key: '',
      appreciations: 0
    }
    expect(
      createObituary({
        firstname: 'Hello',
        surname: 'World',
        date_of_birth: date_of_birth.toString(),
        date_of_death: date_of_death.toString(),
        type: 'gratitude-display',
        long_text: 'Some description',
        image: 'testurl',
        name_misc: 'middlename',
        relative: 'relatives'
      })
    ).toEqual(expected)
  })
})
