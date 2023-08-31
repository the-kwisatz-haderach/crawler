import { mongoDbDb, mongoDbUri } from '../../constants'
import { createDbInserter } from './saveToDb'

export const saveToDb = (crawler: string) =>
  createDbInserter(
    mongoDbUri || 'mongodb://localhost:27017',
    mongoDbDb || 'development',
    crawler
  )
