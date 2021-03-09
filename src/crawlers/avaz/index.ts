import SiteCrawler from '../../lib/SiteCrawler'
import { errorHandler, createScheduler, createOutputWriter } from '../common'
import pageProcessor from './pageProcessor'
import { nextPageNavigator, detailPageNavigator } from './pageNavigator'
import { createSiteProcessor } from '../../lib/helpers/createSiteProcessor'
import { Obituary } from '../../lib/models/obituary/types'

const siteProcessor = createSiteProcessor(
  pageProcessor,
  nextPageNavigator,
  (_, page) => page >= 30,
  detailPageNavigator
)

export default new SiteCrawler<Obituary[]>({
  url: process.env.AVAZ_URL as string,
  errorHandler,
  outputHandler: createOutputWriter('avaz'),
  documentProcessor: siteProcessor,
  crawlScheduler: createScheduler(process.env.CRON_SCHEDULE as string)
})
