import SiteCrawler from './SiteCrawler'
import { saveToDb } from './crawlers/common'
import { siteProcessor as osmrtnicaProcessor } from './crawlers/osmrtnica'

new SiteCrawler({
  url: 'https://www.osmrtnica.ba/',
  documentProcessor: osmrtnicaProcessor,
  outputHandler: saveToDb('osmrtnica')
}).crawl({
  headless: process.env.PUPPETEER_HEADLESS !== 'false',
  slowMo: 100
})
