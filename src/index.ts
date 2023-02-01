import SiteCrawler from './SiteCrawler'
import { saveToDb } from './crawlers/common'
import { siteProcessor as oslobodjenjeProcessor } from './crawlers/oslobodjenje'
import { siteProcessor as avazProcessor } from './crawlers/avaz'
import { siteProcessor as nekrosProcessor } from './crawlers/nekros'
import { siteProcessor as osmrtnicaProcessor } from './crawlers/osmrtnica'

const avazCrawler = new SiteCrawler({
  url: 'https://digital.avaz.ba/smrtovnice',
  documentProcessor: avazProcessor,
  outputHandler: saveToDb
})

const oslobodjenjeCrawler = new SiteCrawler({
  url: 'https://www.oslobodjenje.ba/smrtovnice',
  documentProcessor: oslobodjenjeProcessor,
  outputHandler: saveToDb
})

const nekrosCrawler = new SiteCrawler({
  url: 'https://www.nekros.info/',
  documentProcessor: nekrosProcessor,
  outputHandler: saveToDb
})

const osmrtnicaCrawler = new SiteCrawler({
  url: 'https://www.osmrtnica.ba/',
  documentProcessor: osmrtnicaProcessor,
  outputHandler: saveToDb
})

oslobodjenjeCrawler.init()
