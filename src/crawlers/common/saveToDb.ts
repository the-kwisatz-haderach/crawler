import { MongoClient } from 'mongodb'
import { ObituaryOutputHandler } from '../../types'

export const createDbInserter = (
  dbUri: string,
  dbName: string
): ObituaryOutputHandler => {
  const client = new MongoClient(dbUri)
  return async (obituaries) => {
    if (obituaries.length > 0) {
      try {
        await client.connect()
        const db = await client.db(dbName)
        console.log('Successfully connected to database server')
        await db.collection('obituaries').insertMany(obituaries)
        console.log(`Inserted ${obituaries.length} entries into db`)
      } finally {
        await client.close()
      }
    }
  }
}
