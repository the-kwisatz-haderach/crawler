import nameFormatter from '../../utils/nameFormatter'
import { createObituary } from '../../lib/models/obituary'
import type { Obituary } from '../../lib/models/obituary/types'
import type { PageProcessor } from '../../lib/types'

const pageProcessor: PageProcessor<Obituary[]> = async (page) => {
  try {
    const items = await page.$$('.obituaryItem')

    const obituaries: Obituary[] = []

    for (const item of items) {
      const personPhoto = await item.$('div.personPhoto')
      const name: string = await personPhoto
        ?.$('h2')
        .then((handle) => handle?.evaluate((el) => el.innerText))
      const names = name.replace(/[()]/g, '').split(/\s+/).map(nameFormatter)

      const description: string = await item
        ?.$('.maintext')
        .then((handle) => handle?.evaluate((el) => el.innerText))

      const signature: string = await item
        ?.$('.signature')
        .then((handle) => handle?.evaluate((el) => el.innerText))

      const dates: string = await personPhoto
        ?.$('p')
        .then((handle) => handle?.evaluate((el) => el.innerText))

      const [dateOfBirth, dateOfDeath] = dates
        .split(/\D+/)
        .filter((year) => year)

      const img = await personPhoto?.$('img')
      const imgSrc = await img?.getProperty('src')
      const imgUrl: string = (await imgSrc?.jsonValue()) ?? ''

      obituaries.push(
        createObituary({
          description,
          imgUrl,
          relative: signature,
          dateOfBirth: dateOfBirth ?? null,
          dateOfDeath: dateOfDeath ?? null,
          firstname: names[0],
          surname: names.length > 1 ? names.slice(-1)[0] : '',
          middlename: names.length > 2 ? names[1] : ''
        })
      )
    }

    return obituaries
  } catch (err) {
    await page.close()
    console.error(err)
    return []
  }
}

export default pageProcessor
