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

  setOutputHandler(outputHandler: OutputHandler<U>): void {
    this.outputHandler = outputHandler
  }

  async crawl(): Promise<void> {
    if (this.outputHandler) {
      try {
        const browser = await puppeteer.launch({
          headless: true
        })
        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(90000)
        await page.goto(this.url, {
          waitUntil: 'domcontentloaded'
        })
        await this.documentProcessor(page).then(this.outputHandler)
        await browser.close()
      } catch (err) {
        this.errorHandler(err as Error)
      }
    }
  }
}
