import { ElementHandle } from 'puppeteer'

const getElementProperty =
  (elementSelector: string, property: string) =>
  async (root: ElementHandle | null): Promise<string | undefined> => {
    try {
      return (
        (await root
          ?.$(elementSelector)
          .then(async (element) => await element?.getProperty(property))
          .then(async (src) => await src?.jsonValue())) ??
        (await Promise.resolve(''))
      )
    } catch {
      return ''
    }
  }

export default getElementProperty
