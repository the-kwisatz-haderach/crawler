import { PuppeteerLaunchOptions } from 'puppeteer'
import SiteCrawler from './SiteCrawler'
import { saveToDb } from './crawlers/common'
import * as processors from './crawlers/osmrtnica'

const crawlOptions: PuppeteerLaunchOptions = {
  headless: process.env.PUPPETEER_HEADLESS !== 'false',
  slowMo: Number.parseInt(process.env.PUPPETEER_SLOWMO || '100')
}

new SiteCrawler({
  url: 'https://www.osmrtnica.ba/category/obavijest-o-smrti/',
  documentProcessor: processors.osmrtnicaObitCategoryProcessor,
  outputHandler: saveToDb('osmrtnica')
}).crawl(crawlOptions)

new SiteCrawler({
  url: 'https://www.osmrtnica.ba/category/sjecanje/',
  documentProcessor: processors.sjecanjeObitCategoryProcessor,
  outputHandler: saveToDb('sjecanje')
}).crawl(crawlOptions)

new SiteCrawler({
  url: 'https://www.osmrtnica.ba/category/posljednji-pozdrav/',
  documentProcessor: processors.posljednjiPozdravObitCategoryProcessor,
  outputHandler: saveToDb('posljednji-pozdrav')
}).crawl(crawlOptions)

new SiteCrawler({
  url: 'https://www.osmrtnica.ba/category/posljednje-zbogom/',
  documentProcessor: processors.zbogomObitCategoryProcessor,
  outputHandler: saveToDb('zbogom')
}).crawl(crawlOptions)
