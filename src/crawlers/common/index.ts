import { CronJob } from 'cron'
import path from 'path'
import fs from 'fs'
import {
  ErrorHandler,
  ObituaryMap,
  ObituaryOutputHandler,
  Scheduler
} from '../../lib/types'
import { obituaryIdGenerator } from '../../lib/helpers/obituaryIdGenerator'

export const errorHandler: ErrorHandler = (err) => console.error(err)

export const createScheduler = (cronPattern: string): Scheduler => (crawl) => {
  new CronJob(cronPattern, crawl, null, false).start()
}

export const createOutputWriter = (fileName: string): ObituaryOutputHandler => (
  obituaries
) => {
  const data = obituaries.reduce<ObituaryMap>(
    (acc, curr) => ({
      ...acc,
      [obituaryIdGenerator(curr)]: curr
    }),
    {}
  )

  const outputPath = path.resolve(
    process.cwd(),
    'crawl-results',
    `${fileName}.json`
  )
  fs.writeFile(outputPath, JSON.stringify(data), (err) => {
    if (err) {
      throw err
    }
  })
}
