import { ElementHandle } from 'puppeteer'
import { createItemProcessor } from '../../lib/helpers/createItemProcessor'
import { getElementProperty } from '../../lib/helpers/getElementProperty'
import { getInnerText } from '../../lib/helpers/getInnerText'
import { Obituary } from '../../lib/models/obituary/types'
import nameFormatter from '../../utils/nameFormatter'
import { obituaryDefaults } from '../common'

const getNames = (root: ElementHandle) =>
  getInnerText('h4.main-heading')(root).then((fullName) =>
    fullName.split(/\s+/)
  )

const obituaryProcessor = createItemProcessor<HTMLDivElement, Obituary>(
  obituaryDefaults,
  '.obituary',
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
    dateOfDeath: (root) => root.$('.obituary-footer').then(getInnerText('p')),
    description: (root) =>
      root.$$('p').then((handle) =>
        handle
          ?.slice(-3, -1)
          .map((handle) => handle.evaluate((el) => el.innerText))
          .join('\n')
      ),
    imgUrl: getElementProperty('img', 'src')
  }
)

export default obituaryProcessor
