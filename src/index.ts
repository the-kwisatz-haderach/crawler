import SiteCrawler from './SiteCrawler'
import { saveToDb } from './crawlers/common'
import { osmrtnicaObitCategoryProcessor } from './crawlers/osmrtnica'

new SiteCrawler({
  url: 'https://www.osmrtnica.ba/category/obavijest-o-smrti/',
  documentProcessor: osmrtnicaObitCategoryProcessor,
  outputHandler: saveToDb('osmrtnica')
}).crawl({
  headless: process.env.PUPPETEER_HEADLESS !== 'false'
  // slowMo: 100
})
