export type INames = {
  firstname: string
  surname: string
  prefix: string
  name_misc: string
}

const regex =
  /((?<prefix>[a-zčćdžđšž.]+)\s+)?(?<firstname>[a-zA-ZČĆčćDždžĐđŠšŽž]+)\s+(?<surname>[().a-zA-ZČĆčćDždžĐđŠšŽž]+(\s[().a-zA-ZČĆčćDždžĐđŠšŽž]+)*)(\s[-–]\s+(?<name_misc>[a-zA-ZČĆčćDždžĐđŠšŽž]+))?/

const nameParser = (names = ''): INames => {
  const match = names.match(regex)
  return {
    firstname: match?.groups?.firstname || '',
    surname: match?.groups?.surname || '',
    name_misc: match?.groups?.name_misc || '',
    prefix: match?.groups?.prefix || ''
  }
}

export default nameParser
