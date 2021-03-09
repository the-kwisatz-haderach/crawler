import type { ElementHandle, Page } from 'puppeteer'
import { Obituary } from './models/obituary/types'

export type Scheduler = (cb: () => void) => void
export type PageProcessor<T> = (input: Page) => Promise<T>
export type OutputHandler<T> = (crawlOutput: T) => void
export type ErrorHandler<T extends Error = Error> = (error: T) => void

export type NextPageSelector = (page: Page) => Promise<ElementHandle | null>
export type ElementSelector = (page: Page) => Promise<ElementHandle<any>[]>
export type Navigator = (
  page: Page
) => Promise<{ success: boolean; isLastElement?: boolean }>

export type PageNavigatorFactory = (
  nextPageLinkSelector: NextPageSelector
) => Navigator

export type DetailPageNavigatorFactory = (
  nextPageLinkSelector: ElementSelector
) => Navigator

export type SiteProcessorFactory = <T extends Record<string, unknown>>(
  pageProcessor: PageProcessor<T[]>,
  nextListingNavigator: Navigator,
  stopCondition: (result: T[], pageIndex: number) => boolean,
  detailedListingNavigator?: Navigator
) => PageProcessor<T[]>

export type ObituaryMap = Record<string, Obituary>
export type ObituaryPageProcessor = PageProcessor<Obituary[]>
export type ObituaryOutputHandler = OutputHandler<Obituary[]>
