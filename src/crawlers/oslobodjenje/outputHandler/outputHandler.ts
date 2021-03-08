import path from 'path'
import fs from 'fs'
import { ObituaryOutputHandler } from '../../../lib/types'

const outputWriter: ObituaryOutputHandler = (obituaries) => {
  const outputPath = path.resolve(
    __dirname,
    '..',
    'crawl-results',
    'oslobodjenje.json'
  )
  fs.writeFile(outputPath, JSON.stringify(obituaries), (err) => {
    if (err) {
      throw err
    }
  })
}

export default outputWriter
