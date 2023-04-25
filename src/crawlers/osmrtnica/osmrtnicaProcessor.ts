import { ElementHandle } from 'puppeteer'
import { IObituary } from '../../domain/types'
import { getElementProperty } from '../../helpers/getElementProperty'
import { getInnerText } from '../../helpers/getInnerText'
import nameParser from '../../utils/nameParser'
import { dateParser } from '../../utils/dateParser'
import { createObituary } from '../../domain'
import {
  getDates,
  getLongTextExclLast,
  getType,
  htmlTagsRegexp
} from '../common/handlers'

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
          .replace(/\.(?=\S)/g, '. ')
          .trim()
      })
  } catch {
    return ''
  }
}

export const osmrtnicaProcessor = async <E extends Element>(
  root: ElementHandle<E>
): Promise<IObituary | null> => {
  const nameString = await getInnerText('div.title2')(root)
  if (!nameString) return null
  const { firstname, prefix, surname, name_misc } = nameParser(nameString)
  const dates = await getDates(root)
  const currentDate = new Date(Date.now()).toISOString()

  if (!firstname && !surname) return null
  if (!dates.length) return null
  const long_text = await getLongTextExclLast(root)
  if (!long_text) return null
  const image = await getElementProperty('img.okvir', 'src')(root)
  if (!image) return null

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
    type: await getType('obituary')(root),
    long_text,
    image
  })
}
