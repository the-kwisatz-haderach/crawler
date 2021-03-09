import nameFormatter from './nameFormatter'

describe('nameFormatter', () => {
  it('removes non-word characters', () => {
    expect(nameFormatter('214Hello,.   World')).toEqual('Helloworld')
  })
})
