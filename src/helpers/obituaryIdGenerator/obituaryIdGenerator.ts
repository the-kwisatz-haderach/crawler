import { IObituary } from '../../domain/types'

const obituaryIdGenerator = ({
  firstname,
  name_misc,
  surname,
  relative
}: Pick<
  IObituary,
  'firstname' | 'name_misc' | 'surname' | 'relative'
>): string =>
  [firstname, name_misc, surname, relative]
    .filter(Boolean)
    .flatMap((val) => [...(val as string)].map((char) => char.charCodeAt(0)))
    .join('')
    .substring(0, 20)

export default obituaryIdGenerator
