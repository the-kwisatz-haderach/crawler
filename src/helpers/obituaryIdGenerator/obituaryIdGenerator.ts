import { IObituary } from '../../domain/types'

const obituaryIdGenerator = ({
  firstname,
  middlename,
  surname,
  relative
}: Pick<
  IObituary,
  'firstname' | 'middlename' | 'surname' | 'relative'
>): string =>
  [firstname, middlename, surname, relative]
    .filter(Boolean)
    .flatMap((val) => [...(val as string)].map((char) => char.charCodeAt(0)))
    .join('')
    .substring(0, 20)

export default obituaryIdGenerator
