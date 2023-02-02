import puppeteer from 'puppeteer'
import type { ErrorHandler, OutputHandler, PageProcessor } from './types'

interface SiteCrawlerArgs<U> {
  url: string
  documentProcessor: PageProcessor<U>
  outputHandler?: OutputHandler<U>
  errorHandler?: ErrorHandler
}

export default class SiteCrawler<U> {
  private readonly url: string
  private readonly documentProcessor: PageProcessor<U>
  private readonly errorHandler: ErrorHandler
  private outputHandler?: OutputHandler<U>

  constructor({
    url,
    documentProcessor,
    outputHandler,
    errorHandler
  }: SiteCrawlerArgs<U>) {
    this.url = url
    this.documentProcessor = documentProcessor
    this.outputHandler = outputHandler
    this.errorHandler = errorHandler ?? console.error
  }

  async crawl(): Promise<void> {
    if (this.outputHandler) {
      const browser = await puppeteer.launch({
        headless: true,
        slowMo: 200
        // args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
      try {
        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(30000)
        const res = await page.goto(this.url, {
          waitUntil: 'domcontentloaded'
        })
        const text = await res.text()
        console.log(text)
        await this.documentProcessor(page).then(this.outputHandler)
      } catch (err) {
        console.error(err)
        this.errorHandler(err as Error)
      } finally {
        await browser.close()
      }
    }
  }
}
