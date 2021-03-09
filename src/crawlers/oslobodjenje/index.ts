import SiteCrawler from '../../lib/SiteCrawler'
import { errorHandler, createScheduler, createOutputWriter } from '../common'
import { createSiteProcessor } from '../../lib/helpers/createSiteProcessor'
import { nextPageNavigator } from './pageNavigator'
import pageProcessor from './pageProcessor'
import { Obituary } from '../../lib/models/obituary/types'

const siteProcessor = createSiteProcessor(
  pageProcessor,
  nextPageNavigator,
  (result) => result.length >= 30
)

const CRON_WEEKLY = '0 0 0 * * 0'

export default new SiteCrawler<Obituary[]>({
  url: process.env.OSLOBODJENJE_URL as string,
  errorHandler,
  outputHandler: createOutputWriter('oslobodjenje'),
  documentProcessor: siteProcessor,
  crawlScheduler: createScheduler(CRON_WEEKLY)
})
