import nameParser, { INames } from './nameParser'

describe('nameParser', () => {
  it('formats firstname and surname', () => {
    expect(nameParser('Jan Banan')).toEqual<INames>({
      firstname: 'Jan',
      surname: 'Banan',
      name_misc: '',
      prefix: ''
    })
  })
  it('formats prefix, firstname and surname', () => {
    expect(nameParser('herr Jan Banan')).toEqual<INames>({
      firstname: 'Jan',
      surname: 'Banan',
      name_misc: '',
      prefix: 'herr'
    })
  })
  it('formats prefix, firstname, surname and misc name', () => {
    expect(nameParser('herr Jan Banan - Janne')).toEqual<INames>({
      firstname: 'Jan',
      surname: 'Banan',
      name_misc: 'Janne',
      prefix: 'herr'
    })
  })
  it('formats firstname, surname and misc name', () => {
    expect(nameParser('Jan Banan - Janne')).toEqual<INames>({
      firstname: 'Jan',
      surname: 'Banan',
      name_misc: 'Janne',
      prefix: ''
    })
  })
  it('formats firstname, surname and invalid misc name', () => {
    expect(nameParser('Jan Banan Janne')).toEqual<INames>({
      firstname: 'Jan',
      surname: 'Banan',
      name_misc: '',
      prefix: ''
    })
  })
})
