import path from 'path'
import fs from 'fs'
import { ObituaryMap, ObituaryOutputHandler } from '../../types'
import { obituaryIdGenerator } from '../../helpers/obituaryIdGenerator'

export const createOutputWriter =
  (fileName: string): ObituaryOutputHandler =>
  async (obituaries) => {
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
