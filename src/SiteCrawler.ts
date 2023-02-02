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
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        slowMo: 150
      })
      try {
        const page = await browser.newPage()
        console.log(page)
        page.setDefaultNavigationTimeout(90000)
        await page.goto(this.url, {
          waitUntil: 'domcontentloaded'
        })
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
