import { ElementHandle } from 'puppeteer'

const getInnerText = (selector: string) => (
  root: ElementHandle | null
): Promise<string> =>
  root?.$(selector).then((handle) => handle?.evaluate((el) => el.innerText)) ??
  Promise.resolve('')

export default getInnerText
