import { ElementHandle } from 'puppeteer'
import { ObituaryType } from '../../domain/types'
import { getInnerText } from '../../helpers/getInnerText'

export const getType =
  (defaultValue: ObituaryType) =>
  async (root: ElementHandle<HTMLDivElement>): Promise<ObituaryType> => {
    try {
      const type = (await getInnerText('div.tab')(root)).trim().toLowerCase()
      switch (true) {
        case /sjećanje/g.test(type):
          return 'in-memoriam'
        case /pozdrav/g.test(type):
          return 'last-greetings'
        case /zbogom/g.test(type):
          return 'gratitude-display'
        default:
          return defaultValue
      }
    } catch {
      return defaultValue
    }
  }

export const getDates = async (
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

export const htmlTagsRegexp = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g
const punctuationRegexp = /[.,:](?=\S)/g

export const getLongTextExclLast = async (
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
        text
          .map((t) => `<p>${t.replace(htmlTagsRegexp, '')}</p>`)
          .join('<br>')
          .replace(punctuationRegexp, '. ')
          .replace(/&nbsp;+/g, ' ')
      )
  } catch {
    return ''
  }
}

export const getLongText = async (
  root: ElementHandle<HTMLDivElement>
): Promise<string> => {
  try {
    return await root
      .$$('div:nth-child(8) > p')
      .then(
        async (elements = []) =>
          await Promise.all(
            elements.map((element) =>
              element?.evaluate((el) => el.innerHTML || '')
            )
          )
      )
      .then((text) =>
        text
          .map((t) => `<p>${t.replace(htmlTagsRegexp, '')}</p>`)
          .join('<br>')
          .replace(punctuationRegexp, '. ')
          .replace(/&nbsp;+/g, ' ')
      )
  } catch {
    return ''
  }
}
