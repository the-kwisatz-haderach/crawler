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

  async init(): Promise<void> {
    await this.crawl().catch(console.error)
  }

  setOutputHandler(outputHandler: OutputHandler<U>): void {
    this.outputHandler = outputHandler
  }

  private async crawl(): Promise<void> {
    if (this.outputHandler) {
      const browser = await puppeteer.launch({
        headless: true
      })
      try {
        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(90000)
        await page.goto(this.url, {
          waitUntil: 'domcontentloaded'
        })
        await this.documentProcessor(page).then(this.outputHandler)
      } catch (err) {
        this.errorHandler(err as Error)
      } finally {
        await browser.close()
      }
    }
  }
}
