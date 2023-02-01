import { createDbInserter } from './saveToDb'

export const saveToDb = createDbInserter(
  process.env.MONGODB_URI || 'mongodb://localhost:27017',
  process.env.MONGODB_DB || 'dev'
)
