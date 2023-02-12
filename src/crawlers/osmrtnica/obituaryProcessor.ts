import { ElementHandle } from 'puppeteer'
import { IObituary, ObituaryType } from '../../domain/types'
import { getElementProperty } from '../../helpers/getElementProperty'
import { getInnerText } from '../../helpers/getInnerText'
import nameParser from '../../utils/nameParser'
import { dateParser } from '../../utils/dateParser'
import { createObituary } from '../../domain'

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

const obituaryProcessor = async <E extends Element>(
  root: ElementHandle<E>
): Promise<IObituary | null> => {
  const { firstname, prefix, surname, name_misc } = await getInnerText(
    'div.title2'
  )(root).then((names) => nameParser(names))
  const dates = await getDates(root)
  const currentDate = new Date(Date.now()).toISOString()

  if (!firstname && !surname) return null
  if (!dates.length) return null

  return createObituary({
    firstname,
    surname,
    name_misc,
    prefix,
    date_created: currentDate,
    date_updated: currentDate,
    is_crawled: true,
    date_of_birth: dateParser(dates[0]),
    date_of_death: dateParser(dates[1]),
    relative: await getRelative(root),
    type: await getType(root),
    long_text: await getLongText(root),
    image: await getElementProperty('img.okvir', 'src')(root)
  })
}

export default obituaryProcessor
