import type { Page } from 'puppeteer'

export type Scheduler = (cb: () => void) => void
export type Parser<T> = (text: string) => Promise<T>
export type InputProcessor<O> = (input: Page) => Promise<O>
export type OutputHandler<U> = (input: U) => void
export type Processor<T, U> = {
  selector: (element: T) => T
  processor: U
}
