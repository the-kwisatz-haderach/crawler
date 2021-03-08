import type { ElementHandle, Page } from 'puppeteer'
import { Obituary } from './models/obituary/types'

export type Scheduler = (cb: () => void) => void
export type PageProcessor<T> = (input: Page) => Promise<T>
export type OutputHandler<T> = (crawlOutput: T) => void
export type ErrorHandler<T extends Error = Error> = (error: T) => void

export type NextPageSelector = (page: Page) => Promise<ElementHandle | null>

export type NextPageNavigatorFactory = (
  nextPageLinkSelector: NextPageSelector
) => (page: Page) => Promise<{ success: boolean }>

export type ObituaryMap = Record<string, Obituary>
export type ObituaryPageProcessor = PageProcessor<ObituaryMap>
export type ObituaryOutputHandler = OutputHandler<ObituaryMap>
