import pageProcessor from './pageProcessor'
import { nextPageNavigator, detailPageNavigator } from './pageNavigator'
import { createSiteProcessor } from '../../helpers/createSiteProcessor'
import { IObituary } from '../../domain/types'

export const siteProcessor = createSiteProcessor<IObituary>(
  pageProcessor,
  nextPageNavigator,
  (result, page) => result.length >= 20 || page > 1,
  detailPageNavigator
)
