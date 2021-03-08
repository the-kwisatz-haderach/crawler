import SiteCrawler from './lib/SiteCrawler'
import { Obituary } from './lib/models/obituary/types'

const crawler = new SiteCrawler<Obituary[]>({
  url:
    'https://www.oslobodjenje.ba/smrtovnice?q=&page=1&time_range=2021&order_by=iddesc',
  documentProcessor: async (doc) => {
    console.log(await doc.$$('.obituaryItem'))
    return []
  },
  resultHandler: console.log
})

crawler.scheduleCrawl()
