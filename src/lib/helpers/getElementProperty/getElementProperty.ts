import { ElementHandle } from 'puppeteer'

const getElementProperty = (elementSelector: string, property: string) => (
  root: ElementHandle | null
): Promise<string | undefined> =>
  root
    ?.$(elementSelector)
    .then((element) => element?.getProperty(property))
    .then((src) => src?.jsonValue()) ?? Promise.resolve('')

export default getElementProperty
