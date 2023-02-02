import SiteCrawler from './SiteCrawler'
import { saveToDb } from './crawlers/common'
import { siteProcessor as oslobodjenjeProcessor } from './crawlers/oslobodjenje'
import { siteProcessor as avazProcessor } from './crawlers/avaz'
import { siteProcessor as nekrosProcessor } from './crawlers/nekros'
import { siteProcessor as osmrtnicaProcessor } from './crawlers/osmrtnica'

;(async () => {
  await new SiteCrawler({
    url: 'https://www.oslobodjenje.ba/smrtovnice',
    documentProcessor: oslobodjenjeProcessor,
    outputHandler: saveToDb('oslobodjenje')
  }).crawl()
})()

// new SiteCrawler({
//   url: 'https://digital.avaz.ba/smrtovnice',
//   documentProcessor: avazProcessor,
//   outputHandler: saveToDb('avaz')
// }).crawl()

// new SiteCrawler({
//   url: 'https://www.nekros.info/',
//   documentProcessor: nekrosProcessor,
//   outputHandler: saveToDb('nekros')
// }).crawl()

// new SiteCrawler({
//   url: 'https://www.osmrtnica.ba/',
//   documentProcessor: osmrtnicaProcessor,
//   outputHandler: saveToDb('osmrtnica')
// }).crawl()
