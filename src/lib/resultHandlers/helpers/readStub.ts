import puppeteer, { Page } from 'puppeteer'
import { sync } from 'glob'

export default async function parseStub(name: string): Promise<Page> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const pattern = sync(`**/*/${name}.html`)[0]
  await page.goto(`file://${process.cwd()}/${pattern}`)
  return page
}
