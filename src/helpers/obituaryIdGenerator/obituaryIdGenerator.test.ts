import { IObituary } from '../../domain/types'
import obituaryIdGenerator from './obituaryIdGenerator'

const obituary: IObituary = {
  firstname: 'Nazlija',
  surname: 'Ramusović',
  date_of_birth: '',
  date_of_death: '',
  image:
    'https://cdn.oslobodjenje.ba/images/slike/2021/03/08/ob_media_79832-160.jpg',
  type: 'obituary',
  long_text: 'preselila na ahiret u petak, 5. marta 2021, u 88. godini..',
  name_misc: 'Lika',
  relative: 'Ožalošćeni: kćerka Memnuna, sestra Nusreta, brat Basrija.',
  is_crawled: true,
  date_created: new Date().toISOString()
}

describe('obituaryIdGenerator', () => {
  it('generates an id from an obituary', () => {
    expect(obituaryIdGenerator(obituary)).toEqual('78971221081051069776')
  })
})
