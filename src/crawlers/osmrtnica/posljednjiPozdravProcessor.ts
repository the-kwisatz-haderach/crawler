import { ElementHandle } from 'puppeteer'
import { IObituary } from '../../domain/types'
import { getElementProperty } from '../../helpers/getElementProperty'
import { getInnerText } from '../../helpers/getInnerText'
import nameParser from '../../utils/nameParser'
import { dateParser } from '../../utils/dateParser'
import { createObituary } from '../../domain'
import { getDates, getLongText, getType } from '../common/handlers'

export const posljednjiPozdravProcessor = async <E extends Element>(
  root: ElementHandle<E>
): Promise<IObituary | null> => {
  const nameString = await getInnerText('div.title2')(root)
  if (!nameString) return null
  const { firstname, prefix, surname, name_misc } = nameParser(nameString)
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
    type: await getType('last-greetings')(root),
    long_text: await getLongText(root),
    image: await getElementProperty('img.okvir', 'src')(root)
  })
}
