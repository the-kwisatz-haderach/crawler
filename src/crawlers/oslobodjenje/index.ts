import { createSiteProcessor } from '../../helpers/createSiteProcessor'
import { nextPageNavigator } from './pageNavigator'
import pageProcessor from './pageProcessor'

export const siteProcessor = createSiteProcessor(
  pageProcessor,
  nextPageNavigator,
  (result, page) => result.length >= 20 || page > 1
)
