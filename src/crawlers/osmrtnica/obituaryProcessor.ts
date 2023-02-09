import { ElementHandle } from 'puppeteer'
import { IObituary, ObituaryType } from '../../domain/types'
import { createItemProcessor } from '../../helpers/createItemProcessor'
import { getElementProperty } from '../../helpers/getElementProperty'
import { getInnerText } from '../../helpers/getInnerText'
import nameParser from '../../utils/nameParser'
import { createObituaryDefaults } from '../../domain/createObituaryDefaults'
import { dateParser } from '../../utils/dateParser'

const htmlTagsRegexp = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g

const getDates = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string[]> => {
  try {
    return await getInnerText('div.red-ispod-imena + div')(root).then((dates) =>
      (dates || '').split(/\s+-\s+/)
    )
  } catch {
    return []
  }
}

const getLongText = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string> => {
  try {
    return await root
      .$$('div:nth-child(8) > p')
      .then(
        async (elements = []) =>
          await Promise.all(
            elements
              .slice(0, -1)
              .map((element) => element?.evaluate((el) => el.innerHTML || ''))
          )
      )
      .then((text) =>
        text.map((t) => `<p>${t.replace(htmlTagsRegexp, '')}</p>`).join('<br>')
      )
  } catch {
    return ''
  }
}

const getRelative = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string> => {
  try {
    return await root
      .$$('div:nth-child(8) > p')
      .then(
        async (elements = []) =>
          await Promise.all(
            elements
              .slice(-1)
              .map((element) => element?.evaluate((el) => el.innerHTML || ''))
          )
      )
      .then((text) => {
        return text
          .join('')
          .replace(htmlTagsRegexp, ' ')
          .replace(/^.+?:/g, '')
          .replace(/&nbsp;+/g, '')
          .trim()
      })
  } catch {
    return ''
  }
}

const getType = async (
  root: ElementHandle<HTMLDivElement>
): Promise<ObituaryType> => {
  try {
    const type = (await getInnerText('div.tab')(root)).trim().toLowerCase()
    switch (true) {
      case /sjećanje/g.test(type):
        return 'in-memoriam'
      case /posljednji/g.test(type):
        return 'last-greetings'
      default:
        return 'obituary'
    }
  } catch {
    return 'obituary'
  }
}

const obituaryProcessor = createItemProcessor<HTMLDivElement, IObituary>(
  createObituaryDefaults(),
  {
    firstname: async (root) =>
      await getInnerText('div.title2')(root).then(
        (names) => nameParser(names).firstname
      ),
    surname: async (root) =>
      await getInnerText('div.title2')(root).then(
        (names) => nameParser(names).surname
      ),
    name_misc: async (root) =>
      await getInnerText('div.title2')(root).then(
        (names) => nameParser(names).name_misc
      ),
    prefix: async (root) =>
      await getInnerText('div.title2')(root).then(
        (names) => nameParser(names).prefix
      ),
    date_of_birth: async (root) =>
      await getDates(root).then((dates) => dateParser(dates[0])),
    date_of_death: async (root) =>
      await getDates(root).then((dates) => dateParser(dates[1])),
    relative: getRelative,
    type: getType,
    long_text: getLongText,
    image: getElementProperty('img.okvir', 'src')
  }
)

export default obituaryProcessor
