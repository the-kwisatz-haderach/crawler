import { createDbInserter } from './saveToDb'

export const saveToDb = (crawler: string) =>
  createDbInserter(
    process.env.MONGODB_URI || 'mongodb://localhost:27017',
    process.env.MONGODB_DB || 'development',
    crawler
  )
