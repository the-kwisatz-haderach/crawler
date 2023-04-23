import { PuppeteerLaunchOptions } from 'puppeteer'
import SiteCrawler from './SiteCrawler'
import { saveToDb } from './crawlers/common'
import * as processors from './crawlers/osmrtnica'

const crawlOptions: PuppeteerLaunchOptions = {
  headless: process.env.PUPPETEER_HEADLESS !== 'false',
  slowMo: Number.parseInt(process.env.PUPPETEER_SLOWMO || '100')
}

const crawler1 = new SiteCrawler({
  url: 'https://www.osmrtnica.ba/category/obavijest-o-smrti/',
  documentProcessor: processors.osmrtnicaObitCategoryProcessor,
  outputHandler: saveToDb('osmrtnica')
})

const crawler2 = new SiteCrawler({
  url: 'https://www.osmrtnica.ba/category/sjecanje/',
  documentProcessor: processors.sjecanjeObitCategoryProcessor,
  outputHandler: saveToDb('sjecanje')
})

const crawler3 = new SiteCrawler({
  url: 'https://www.osmrtnica.ba/category/posljednji-pozdrav/',
  documentProcessor: processors.posljednjiPozdravObitCategoryProcessor,
  outputHandler: saveToDb('posljednji-pozdrav')
})

const crawler4 = new SiteCrawler({
  url: 'https://www.osmrtnica.ba/category/posljednje-zbogom/',
  documentProcessor: processors.zbogomObitCategoryProcessor,
  outputHandler: saveToDb('zbogom')
})

crawler1.crawl(crawlOptions).finally(() => {
  crawler2.crawl(crawlOptions).finally(() => {
    crawler3.crawl(crawlOptions).finally(() => {
      crawler4.crawl(crawlOptions)
    })
  })
})
