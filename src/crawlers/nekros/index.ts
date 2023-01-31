import SiteCrawler from '../../lib/SiteCrawler'
import { saveToDb } from '../common'
import { createSiteProcessor } from '../../lib/helpers/createSiteProcessor'
import { nextPageNavigator } from './pageNavigator'
import pageProcessor from './pageProcessor'
import { IObituary } from '../../lib/models/obituary/types'

const siteProcessor = createSiteProcessor(
  pageProcessor,
  nextPageNavigator,
  (result) => result.length >= 1
)

export default new SiteCrawler<IObituary[]>({
  url: process.env.NEKROS_URL as string,
  outputHandler: saveToDb,
  documentProcessor: siteProcessor
})
