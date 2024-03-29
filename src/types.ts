import type { ElementHandle, Page } from 'puppeteer-core'
import { IObituary } from './domain/types'

export type PageProcessor<T> = (input: Page) => Promise<T>
export type PageProcessorCreator = (
  obituaryProcessor: (root: ElementHandle<Element>) => Promise<IObituary | null>
) => PageProcessor<IObituary[]>
export type OutputHandler<T> = (crawlOutput: T) => Promise<void>
export type ErrorHandler<T extends Error = Error> = (error: T) => void

export type NextPageSelector = (page: Page) => Promise<ElementHandle | null>
export type ElementSelector = (page: Page) => Promise<Array<ElementHandle<any>>>
export type Navigator = (
  page: Page
) => Promise<{ success: boolean; isLastElement?: boolean }>

export type PageNavigatorFactory = (
  nextPageLinkSelector: NextPageSelector
) => Navigator

export type DetailPageNavigatorFactory = (
  nextPageLinkSelector: ElementSelector
) => Navigator

export type SiteProcessorFactory = (
  obituaryProcessor: (
    root: ElementHandle<Element>
  ) => Promise<IObituary | null>,
  nextListingNavigator: Navigator,
  stopCondition: (result: IObituary[], pageIndex: number) => boolean,
  detailedListingNavigator?: Navigator,
  maxPages?: number
) => PageProcessor<IObituary[]>

export type ItemProcessorFactory = <
  E extends Element,
  T extends Record<string, unknown>
>(
  itemDefaults: T,
  propertyProcessors: {
    [K in keyof T]?: (handle: ElementHandle<E>) => Promise<T[K] | undefined>
  }
) => (rootItem: ElementHandle<E> | null) => Promise<T | null>

export type ObituaryMap = Record<string, IObituary>
export type ObituaryPageProcessor = PageProcessor<IObituary[]>
export type ObituaryOutputHandler = OutputHandler<IObituary[]>
