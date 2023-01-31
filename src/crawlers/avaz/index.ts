import SiteCrawler from '../../lib/SiteCrawler'
import { saveToDb } from '../common'
import pageProcessor from './pageProcessor'
import { nextPageNavigator, detailPageNavigator } from './pageNavigator'
import { createSiteProcessor } from '../../lib/helpers/createSiteProcessor'
import { IObituary } from '../../lib/models/obituary/types'

const siteProcessor = createSiteProcessor(
  pageProcessor,
  nextPageNavigator,
  (_, page) => page >= 1,
  detailPageNavigator
)

export default new SiteCrawler<IObituary[]>({
  url: process.env.AVAZ_URL as string,
  outputHandler: saveToDb,
  documentProcessor: siteProcessor
})
