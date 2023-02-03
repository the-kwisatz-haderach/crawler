import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import type { ErrorHandler, OutputHandler, PageProcessor } from './types'

const { executablePath } = require('puppeteer')

puppeteer.use(StealthPlugin())

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
        headless: false,
        slowMo: 200,
        executablePath: executablePath(),
        args: ['--no-sandbox']
      })
      try {
        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(30000)
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
