import { createSiteProcessor } from '../../helpers/createSiteProcessor'
import { nextPageNavigator, detailPageNavigator } from './pageNavigator'
import { osmrtnicaProcessor } from './osmrtnicaProcessor'
import { sjecanjeProcessor } from './sjecanjeProcessor'
import { posljednjiPozdravProcessor } from './posljednjiPozdravProcessor'
import { zbogomProcessor } from './zbogomProcessor'

const stopCondition: Parameters<typeof createSiteProcessor>[2] = (
  items,
  page
) => items.length > 3 || page >= 1

export const osmrtnicaObitCategoryProcessor = createSiteProcessor(
  osmrtnicaProcessor,
  nextPageNavigator,
  stopCondition,
  detailPageNavigator
)

export const sjecanjeObitCategoryProcessor = createSiteProcessor(
  sjecanjeProcessor,
  nextPageNavigator,
  stopCondition,
  detailPageNavigator
)

export const posljednjiPozdravObitCategoryProcessor = createSiteProcessor(
  posljednjiPozdravProcessor,
  nextPageNavigator,
  stopCondition,
  detailPageNavigator
)

export const zbogomObitCategoryProcessor = createSiteProcessor(
  zbogomProcessor,
  nextPageNavigator,
  stopCondition,
  detailPageNavigator
)
