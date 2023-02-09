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
      surname: 'Banan Janne',
      name_misc: '',
      prefix: ''
    })
  })
  it('formats firstname, surname and different prefix', () => {
    expect(nameParser('prof. Vlado Luburić')).toEqual<INames>({
      firstname: 'Vlado',
      surname: 'Luburić',
      name_misc: '',
      prefix: 'prof.'
    })
  })
  it('formats firstname and double surname', () => {
    expect(nameParser('Radmila Vujičić Šujanski')).toEqual<INames>({
      firstname: 'Radmila',
      surname: 'Vujičić Šujanski',
      name_misc: '',
      prefix: ''
    })
  })
  it('formats firstname and double surname', () => {
    expect(nameParser('Vesna (rođ. Čerkez) Jozić')).toEqual<INames>({
      firstname: 'Vesna',
      surname: '(rođ. Čerkez) Jozić',
      name_misc: '',
      prefix: ''
    })
  })
})
