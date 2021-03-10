import { ElementHandle } from 'puppeteer'
import { createItemProcessor } from '../../lib/helpers/createItemProcessor'
import { getElementProperty } from '../../lib/helpers/getElementProperty'
import { getInnerText } from '../../lib/helpers/getInnerText'
import { Obituary } from '../../lib/models/obituary/types'
import nameFormatter from '../../utils/nameFormatter'
import { obituaryDefaults } from '../common'

const getNames = (root: ElementHandle<HTMLDivElement>) =>
  root
    .$('div.personPhoto')
    .then(getInnerText('h2'))
    .then((namesStr: string) => namesStr.split(/\s+/)) ?? []

const getDates = (root: ElementHandle<HTMLDivElement>) =>
  root
    .$('div.personPhoto')
    .then(getInnerText('p'))
    .then((dateText: string) => dateText.split(/\D+/).filter((year) => year))

const obituaryProcessor = createItemProcessor<HTMLDivElement, Obituary>(
  obituaryDefaults,
  '.obituaryItem',
  {
    firstname: (root) =>
      getNames(root)
        .then((names) => names[0])
        .then(nameFormatter),
    surname: (root) =>
      getNames(root)
        .then((names) => (names.length > 1 ? names.slice(-1)[0] : ''))
        .then(nameFormatter),
    middlename: (root) =>
      getNames(root)
        .then((names) => (names.length > 2 ? names[1] : ''))
        .then(nameFormatter),
    dateOfDeath: (root) => getDates(root).then((dates) => dates[1]),
    dateOfBirth: (root) => getDates(root).then((dates) => dates[0]),
    relative: getInnerText('.signature'),
    description: getInnerText('.maintext'),
    imgUrl: getElementProperty('img', 'src')
  }
)

export default obituaryProcessor
