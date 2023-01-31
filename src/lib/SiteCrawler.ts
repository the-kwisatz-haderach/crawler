import puppeteer from 'puppeteer'
import type { ErrorHandler, OutputHandler, PageProcessor } from './types'

type SiteCrawlerArgs<U> = {
  url: string
  documentProcessor: PageProcessor<U>
  outputHandler?: OutputHandler<U>
  errorHandler?: ErrorHandler
}

export default class SiteCrawler<U> {
  private readonly url: string
  private documentProcessor: PageProcessor<U>
  private outputHandler: OutputHandler<U>
  private errorHandler: ErrorHandler

  constructor({
    url,
    documentProcessor,
    outputHandler,
    errorHandler
  }: SiteCrawlerArgs<U>) {
    this.url = url
    this.documentProcessor = documentProcessor
    this.outputHandler = outputHandler ?? console.log
    this.errorHandler = errorHandler ?? console.error
  }

  async crawl(): Promise<void> {
    const browser = await puppeteer.launch({
      headless: (process.env.PUPPETEER_HEADLESS as string) === 'true',
      slowMo: process.env.PUPPETEER_SLOW_MO === 'true' ? 150 : undefined
    })
    try {
      const page = await browser.newPage()
      page.setDefaultNavigationTimeout(
        parseInt(process.env.PUPPETEER_NAVIGATION_TIMEOUT as string)
      )
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
