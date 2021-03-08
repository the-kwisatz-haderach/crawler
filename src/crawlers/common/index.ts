import { CronJob } from 'cron'
import { ErrorHandler, Scheduler } from '../../lib/types'

export const errorHandler: ErrorHandler = (err) => console.error(err)

export const createScheduler = (cronPattern: string): Scheduler => (crawl) => {
  new CronJob(cronPattern, crawl, null, false).start()
}
