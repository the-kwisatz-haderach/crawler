import puppeteer from 'puppeteer'
import type {
  ErrorHandler,
  Scheduler,
  OutputHandler,
  PageProcessor
} from './types'

type SiteCrawlerArgs<U> = {
  url: string
  crawlScheduler?: Scheduler
  documentProcessor: PageProcessor<U>
  outputHandler: OutputHandler<U>
  errorHandler: ErrorHandler
}

export default class SiteCrawler<U> {
  private readonly url: string
  private crawlScheduler?: Scheduler
  private documentProcessor: PageProcessor<U>
  private outputHandler: OutputHandler<U>
  private errorHandler: ErrorHandler

  constructor({
    url,
    documentProcessor,
    outputHandler,
    crawlScheduler,
    errorHandler
  }: SiteCrawlerArgs<U>) {
    this.url = url
    this.documentProcessor = documentProcessor
    this.outputHandler = outputHandler
    this.crawlScheduler = crawlScheduler
    this.errorHandler = errorHandler
  }

  scheduleCrawl() {
    if (this.crawlScheduler) {
      this.crawlScheduler(this.crawl)
    } else {
      this.crawl()
    }
  }

  private async crawl(): Promise<void> {
    const browser = await puppeteer.launch({
      headless: (process.env.PUPPETEER_HEADLESS as string) === 'true'
    })
    try {
      const page = await browser.newPage()
      await page.goto(this.url, {
        waitUntil: 'domcontentloaded'
      })
      await this.documentProcessor(page).then(this.outputHandler)
    } catch (err) {
      this.errorHandler(err)
    } finally {
      await browser.close()
    }
  }
}
