import { createObituary } from '../../lib/models/obituary'
import { ObituaryMap } from '../../lib/types'

const expected: ObituaryMap = {
  avaz_1: createObituary({
    firstname: 'Hamidu',
    surname: 'Žepljaku',
    middlename: 'Kulovcu',
    dateOfBirth: null,
    dateOfDeath: '08.03.2021.',
    imgUrl: 'https://digital.avaz.ba/uploads/obituaries/TmVZO9pahQFdJoI2.jpeg',
    relative:
      'Tvoj duhovni muftija Hamed ef. Efendić, Zakira, Nudžejma, Sinanudin i Dino',
    description:
      'Molimo Uzvišenog Allaha dž.š. da ukaže Svoju milost i uvede te u Džennetske bašče.'
  }),
  avaz_2: createObituary({
    firstname: 'IRFAN',
    surname: 'SARAJLIĆ',
    dateOfBirth: null,
    dateOfDeath: '08.03.2021.',
    imgUrl: 'https://digital.avaz.ba/uploads/obituaries/vbeHXIOa25jPgff8.jpg',
    relative: 'Halko Sarajlić sa porodicom',
    description: 'Bio je dio našeg puta i sve dobro što smo imali.'
  }),
  avaz_3: createObituary({
    firstname: 'MIRZA',
    middlename: 'SALIH',
    surname: 'KRUPALIJA',
    dateOfBirth: null,
    dateOfDeath: '08.03.2021.',
    imgUrl: 'https://digital.avaz.ba/uploads/obituaries/8S9zqM5arRAnDGaU.jpg',
    relative: 'Džana, Zijo, Arman i Dado',
    description: 'S ljubavlju, Azra'
  })
}

export default expected
