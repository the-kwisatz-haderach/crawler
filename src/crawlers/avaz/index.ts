import SiteCrawler from '../../lib/SiteCrawler'
import { errorHandler, createScheduler } from '../common'
import type { ObituaryMap } from '../../lib/types'

const CRON_WEEKLY = '0 0 0 * * 0'

export default new SiteCrawler<ObituaryMap>({
  url: process.env.AVAZ_URL as string,
  errorHandler,
  outputHandler: console.log,
  documentProcessor: async () => ({}),
  crawlScheduler: createScheduler(CRON_WEEKLY)
})
