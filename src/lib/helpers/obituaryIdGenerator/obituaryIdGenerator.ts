import { IObituary } from '../../models/obituary/types'

const obituaryIdGenerator = (obituary: IObituary) =>
  [obituary.firstname, obituary.middlename, obituary.surname, obituary.relative]
    .flatMap((val) => [...(val as string)].map((char) => char.charCodeAt(0)))
    .join('')
    .substr(0, 20)

export default obituaryIdGenerator
