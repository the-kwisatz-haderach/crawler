import pageProcessor from './pageProcessor'
import { nextPageNavigator, detailPageNavigator } from './pageNavigator'
import { createSiteProcessor } from '../../helpers/createSiteProcessor'
import { IObituary } from '../../domain/types'

export const siteProcessor = createSiteProcessor<IObituary>(
  pageProcessor,
  nextPageNavigator,
  (_, page) => page >= 1,
  detailPageNavigator
)
