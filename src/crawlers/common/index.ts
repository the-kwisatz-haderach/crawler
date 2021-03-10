import path from 'path'
import fs from 'fs'
import { ObituaryMap, ObituaryOutputHandler } from '../../lib/types'
import obituaryIdGenerator from '../../lib/helpers/obituaryIdGenerator/obituaryIdGenerator'
import { createObituary } from '../../lib/models/obituary'

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

export const obituaryDefaults = createObituary({
  firstname: '',
  surname: '',
  dateOfBirth: null,
  dateOfDeath: null
})
