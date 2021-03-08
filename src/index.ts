import SiteCrawler from './lib/SiteCrawler'
import { Obituary } from './lib/models/obituary/types'
import documentProcessor from './lib/resultHandlers/oslobodjenje'

const crawler = new SiteCrawler<Obituary[]>({
  url:
    'https://www.oslobodjenje.ba/smrtovnice?q=&page=1&time_range=2021&order_by=iddesc',
  documentProcessor,
  resultHandler: console.log
})

crawler.scheduleCrawl()
