import { ElementHandle } from 'puppeteer'
import { IObituary, ObituaryType } from '../../domain/types'
import { createItemProcessor } from '../../helpers/createItemProcessor'
import { getElementProperty } from '../../helpers/getElementProperty'
import { getInnerText } from '../../helpers/getInnerText'
import nameFormatter from '../../utils/nameFormatter'
import { createObituaryDefaults } from '../../domain/obituary/createObituaryDefaults'
import { dateParser } from '../../utils/dateParser'

const getNames = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string[]> =>
  (await getInnerText('div.title2')(root).then((namesStr: string) =>
    namesStr.split(/\s+/)
  )) ?? []

const getDates = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string[]> =>
  await getInnerText('div.red-ispod-imena + div')(root).then((dates) =>
    (dates || '').split(/\s+-\s+/)
  )

const getLongText = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string> => {
  const text = await root
    .$$('p')
    .then(
      async (elements) =>
        await Promise.all(
          elements.map((element) =>
            element?.evaluate((el) => el.textContent || '')
          )
        )
    )
    .then((text) => text.join('\n'))
  return text
}

const getType = async (
  root: ElementHandle<HTMLDivElement>
): Promise<ObituaryType> => {
  const type = (await getInnerText('div.tab')(root)).trim().toLowerCase()
  switch (true) {
    case /sjećanje/g.test(type):
      return 'in-memoriam'
    case /posljednji/g.test(type):
      return 'last-greetings'
    default:
      return 'obituary'
  }
}

const obituaryProcessor = createItemProcessor<HTMLDivElement, IObituary>(
  createObituaryDefaults(),
  {
    firstname: async (root) =>
      await getNames(root)
        .then((names) => names[0])
        .then(nameFormatter),
    surname: async (root) =>
      await getNames(root)
        .then((names) => (names.length > 1 ? names.slice(-1)[0] : ''))
        .then(nameFormatter),
    middlename: async (root) =>
      await getNames(root)
        .then((names) => (names.length > 2 ? names[1] : ''))
        .then(nameFormatter),
    date_of_birth: async (root) =>
      await getDates(root)
        .then((dates) => dates[0])
        .then(dateParser),
    date_of_death: async (root) =>
      await getDates(root)
        .then((dates) => dates[1])
        .then(dateParser),
    type: getType,
    long_text: getLongText,
    image: getElementProperty('img.okvir', 'src')
  }
)

export default obituaryProcessor
