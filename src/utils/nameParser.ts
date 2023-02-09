export type INames = {
  firstname: string
  surname: string
  prefix: string
  name_misc: string
}

const regex =
  /((?<prefix>[a-zčćdžđšž]+)\s+)?(?<firstname>[A-zČĆčćDždžĐđŠšŽž]+)\s+(?<surname>[A-zČĆčćDždžĐđŠšŽž]+)(\s[-–]\s+(?<name_misc>[A-zČĆčćDždžĐđŠšŽž]+))?/

const formatName = (name = '') => name.replace(/([,.()]|\d|\s)+/g, '')

const nameParser = (names = ''): INames => {
  const match = names.match(regex)
  return {
    firstname: formatName(match?.groups?.firstname),
    surname: formatName(match?.groups?.surname),
    name_misc: formatName(match?.groups?.name_misc),
    prefix: formatName(match?.groups?.prefix)
  }
}

export default nameParser
