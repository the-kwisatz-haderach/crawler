import SiteCrawler from '../../lib/SiteCrawler'
import { documentProcessor } from './documentProcessor'
import { outputHandler } from './outputHandler'
import { errorHandler, scheduler } from '../common'
import type { ObituaryMap } from '../../lib/types'

const SITE_URL = 'https://www.oslobodjenje.ba/smrtovnice'
const CRON_WEEKLY = '0 0 0 * * 0'

export default new SiteCrawler<ObituaryMap>({
  url: SITE_URL,
  errorHandler,
  outputHandler,
  documentProcessor,
  crawlScheduler: scheduler(CRON_WEEKLY)
})
