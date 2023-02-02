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
      try {
        const browser = await puppeteer.launch({
          headless: true,
          slowMo: 200
          // args: ['--no-sandbox', '--disable-setuid-sandbox'],
        })
        console.log('after launch')
        const page = await browser.newPage()
        console.log('new page')
        page.setDefaultNavigationTimeout(30000)
        await page.goto(this.url, {
          waitUntil: 'domcontentloaded'
        })
        console.log('after goto')
        await this.documentProcessor(page).then(this.outputHandler)
        console.log('after documentProcessor')
        await browser.close()
      } catch (err) {
        console.error(err)
        this.errorHandler(err as Error)
      }
    }
  }
}
