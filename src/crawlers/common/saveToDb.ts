import { MongoClient } from 'mongodb'
import { ObituaryOutputHandler } from '../../lib/types'

export const createDbInserter = (
  dbUri: string,
  dbName: string
): ObituaryOutputHandler => {
  const client = new MongoClient(dbUri)
  return async (obituaries) => {
    try {
      await client.connect()
      const db = await client.db(dbName)
      const res = await db.collection('obituaries').insertMany(obituaries)
      console.log(res)
      console.log('Successfully connected to database server')
    } finally {
      await client.close()
    }
  }
}
