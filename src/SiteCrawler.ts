import type { ErrorHandler, OutputHandler, PageProcessor } from './types'

const puppeteer = require('puppeteer-core')
const chromium = require('@sparticuz/chromium')

chromium.setHeadlessMode = true

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

  async crawl(options?: any): Promise<void> {
    if (this.outputHandler) {
      const browser = await puppeteer.launch({
        ...options,
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless
      })
      try {
        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(
          Number.parseInt(process.env.PUPPETEER_NAVIGATION_TIMEOUT || '30000')
        )
        await page.goto(this.url, {
          waitUntil: 'domcontentloaded'
        })
        const output = await this.documentProcessor(page)
        await page.close()
        await this.outputHandler(output)
      } catch (err) {
        this.errorHandler(err as Error)
      } finally {
        await browser.close()
      }
    }
  }
}
