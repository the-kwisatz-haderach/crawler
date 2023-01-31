import { createObituary } from '../../lib/models/obituary'

export const obituaryDefaults = createObituary({
  type: 'obituary',
  firstname: '',
  surname: '',
  date_of_birth: '',
  date_of_death: '',
  relative: '',
  long_text: '',
  middlename: ''
})
