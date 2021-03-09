import nameFormatter from '../../utils/nameFormatter'
import { createObituary } from '../../lib/models/obituary'
import type { Obituary } from '../../lib/models/obituary/types'
import type { PageProcessor } from '../../lib/types'

const pageProcessor: PageProcessor<Obituary[]> = async (page) => {
  const obituaries: Obituary[] = []
  try {
    const obituary = await page.$('.obituary')

    const name: string = await obituary
      ?.$('h4.main-heading')
      .then((handle) => handle?.evaluate((el) => el.innerText))
    const names = (name ?? '')
      .replace(/[()]/g, '')
      .split(/\s+/)
      .map(nameFormatter)

    const footer = await obituary?.$('.obituary-footer')
    const dateOfDeath = await footer
      ?.$('p')
      .then((handle) => handle?.evaluate((el) => el.innerText))

    const divider = await obituary?.$$('p')
    const description = await Promise.all(
      divider
        ?.slice(-3, -1)
        .map((handle) => handle.evaluate((el) => el.innerText)) ?? []
    )

    const img = await obituary?.$('img')
    const imgSrc = await img?.getProperty('src')
    const imgUrl: string = (await imgSrc?.jsonValue()) ?? ''

    obituaries.push(
      createObituary({
        imgUrl,
        description: description.join('\n') ?? '',
        dateOfBirth: null,
        dateOfDeath: dateOfDeath ?? null,
        firstname: names[0],
        surname: names.length > 1 ? names.slice(-1)[0] : '',
        middlename: names.length > 2 ? names[1] : ''
      })
    )

    return obituaries
  } catch (err) {
    console.error(err)
    return obituaries
  }
}

export default pageProcessor
