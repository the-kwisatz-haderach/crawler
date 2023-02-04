import { dateParser } from './dateParser'

describe('dateParser', () => {
  it('parses a single year', () => {
    expect(dateParser('1934')).toEqual('1933-12-30T23:00:00.000Z')
  })
  it('parses a full date string', () => {
    expect(dateParser('4.2.2023.')).toEqual('2023-02-03T23:00:00.000Z')
  })
})
