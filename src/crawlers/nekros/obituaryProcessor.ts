import { ElementHandle } from 'puppeteer'
import { IObituary } from '../../domain/types'
import { createItemProcessor } from '../../helpers/createItemProcessor'
import { getElementProperty } from '../../helpers/getElementProperty'
import { getInnerText } from '../../helpers/getInnerText'
import nameFormatter from '../../utils/nameFormatter'
import { createObituaryDefaults } from '../../domain/obituary/createObituaryDefaults'
import { dateParser } from '../../utils/dateParser'

const getNames = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string[]> =>
  (await root
    .$('aside')
    .then(getInnerText('h4'))
    .then((namesStr: string) => namesStr.split(/\s+/))) ?? []

const getDates = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string[]> =>
  await root
    .$('aside > div')
    .then(getInnerText('p:last-child'))
    .then((dateText: string) =>
      dateText
        ?.trim()
        .split(/\s+-\s+/)
        .filter(Boolean)
        .map(dateParser)
    )

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
    date_of_death: async (root) =>
      await getDates(root).then((dates) => dates[1]),
    date_of_birth: async (root) =>
      await getDates(root).then((dates) => dates[0]),
    // relative: getInnerText('.signature'),
    // long_text: getInnerText('.maintext'),
    image: getElementProperty('img', 'src')
  }
)

export default obituaryProcessor
