import SiteCrawler from './SiteCrawler'
import { saveToDb } from './crawlers/common'
import { siteProcessor as oslobodjenjeProcessor } from './crawlers/oslobodjenje'
// import { siteProcessor as avazProcessor } from './crawlers/avaz'
// import { siteProcessor as nekrosProcessor } from './crawlers/nekros'
// import { siteProcessor as osmrtnicaProcessor } from './crawlers/osmrtnica'

new SiteCrawler({
  url: 'https://www.oslobodjenje.ba/smrtovnice',
  documentProcessor: oslobodjenjeProcessor,
  outputHandler: saveToDb('oslobodjenje')
})
  .crawl()
  .catch(console.error)

// new SiteCrawler({
//   url: 'https://digital.avaz.ba/smrtovnice',
//   documentProcessor: avazProcessor,
//   outputHandler: saveToDb('avaz')
// })

// new SiteCrawler({
//   url: 'https://www.nekros.info/',
//   documentProcessor: nekrosProcessor,
//   outputHandler: saveToDb('nekros')
// })

// new SiteCrawler({
//   url: 'https://www.osmrtnica.ba/',
//   documentProcessor: osmrtnicaProcessor,
//   outputHandler: saveToDb('osmrtnica')
// }).crawl()
