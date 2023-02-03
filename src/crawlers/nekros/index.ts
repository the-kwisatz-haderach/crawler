import { createSiteProcessor } from '../../helpers/createSiteProcessor'
import { nextPageNavigator, detailPageNavigator } from './pageNavigator'
import pageProcessor from './pageProcessor'

export const siteProcessor = createSiteProcessor(
  pageProcessor,
  nextPageNavigator,
  (results) => results.length >= 20,
  detailPageNavigator
)
