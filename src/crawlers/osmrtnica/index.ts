import { createSiteProcessor } from '../../helpers/createSiteProcessor'
import { nextPageNavigator, detailPageNavigator } from './pageNavigator'
import { obituaryCategoryProcessor } from './pageProcessor'

export const osmrtnicaObitCategoryProcessor = createSiteProcessor(
  obituaryCategoryProcessor,
  nextPageNavigator,
  (_, page) => page >= 1,
  detailPageNavigator
)
