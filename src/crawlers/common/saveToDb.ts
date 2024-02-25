import { MongoClient } from 'mongodb'
import { ObituaryOutputHandler } from '../../types'

export const createDbInserter = (
  dbUri: string,
  dbName: string,
  crawler: string
): ObituaryOutputHandler => {
  const client = new MongoClient(dbUri)
  return async (obituaries) => {
    try {
      if (obituaries.length > 0) {
        await client.connect()
        const db = await client.db(dbName)
        console.log('Successfully connected to database server')
        await db
          .collection('obituaries')
          .insertMany(obituaries.reverse(), { ordered: false })
        console.log(
          `Inserted ${obituaries.length} entries from crawler ${crawler} into db`
        )
      } else {
        console.log(`No results found for crawler: ${crawler}`)
      }
    } finally {
      console.log('Closing database connection')
      await client.close()
    }
  }
}
