import puppeteer from 'puppeteer'
import type { Scheduler, OutputHandler, InputProcessor } from './types'

type SiteCrawlerArgs<U> = {
  url: string
  crawlScheduler?: Scheduler
  documentProcessor: InputProcessor<U>
  resultHandler: OutputHandler<U>
}

export default class SiteCrawler<U> {
  private readonly url: string
  private crawlScheduler?: Scheduler
  private documentProcessor: InputProcessor<U>
  private resultHandler: OutputHandler<U>

  constructor({
    url,
    documentProcessor,
    resultHandler,
    crawlScheduler
  }: SiteCrawlerArgs<U>) {
    this.url = url
    this.documentProcessor = documentProcessor
    this.resultHandler = resultHandler
    this.crawlScheduler = crawlScheduler
  }

  scheduleCrawl() {
    if (this.crawlScheduler) {
      this.crawlScheduler(this.crawl)
    } else {
      this.crawl()
    }
  }

  private async crawl(): Promise<void> {
    try {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.goto(this.url, {
        waitUntil: 'domcontentloaded'
      })
      await this.documentProcessor(page).then(this.resultHandler)
      await browser.close()
    } catch (err) {
      console.error(err)
    }
  }
}
