import { MongoClient } from 'mongodb'
import { IObituary } from '../domain/types'
import { createCrawlKey } from '../domain/createObituary'
import { mongoDbDb, mongoDbUri } from '../constants'

const dbUri = mongoDbUri || 'mongodb://localhost:27017'
const dbName = mongoDbDb || 'development'

export const updateDb = async () => {
  const client = new MongoClient(dbUri)
  try {
    await client.connect()
    const db = await client.db(dbName)
    console.log('Successfully connected to database server')

    const obituariesCol = await db.collection<IObituary>('obituaries')
    const bulkOp = obituariesCol.initializeOrderedBulkOp()

    const withoutCrawlKey = obituariesCol.find({
      crawl_key: { $exists: false },
      is_crawled: true
    })

    const arr = await withoutCrawlKey.toArray()

    arr.forEach((field) => {
      bulkOp
        .find({ _id: field._id })
        .updateOne({ $set: { crawl_key: createCrawlKey(field) } })
    })
    await bulkOp.execute()
  } finally {
    console.log('Closing database connection')
    await client.close()
  }
}

export const bulkUpdateCategory = async () => {
  const client = new MongoClient(dbUri)
  try {
    await client.connect()
    const db = await client.db(dbName)
    console.log('Successfully connected to database server')

    const obituariesCol = await db.collection<IObituary>('obituaries')
    const bulkOp = obituariesCol.initializeUnorderedBulkOp()

    bulkOp
      .find({
        type: 'gratitude-display'
      })
      .update({ $set: { type: 'last-greetings' } })

    await bulkOp.execute()
  } finally {
    console.log('Closing database connection')
    await client.close()
  }
}

export const createIndex = async () => {
  const client = new MongoClient(dbUri)
  try {
    await client.connect()
    const db = await client.db(dbName)
    console.log('Successfully connected to database server')

    const obituariesCol = await db.collection<IObituary>('obituaries')
    await obituariesCol.createIndex(
      { crawl_key: 1 },
      { unique: true, sparse: true }
    )
  } finally {
    console.log('Closing database connection')
    await client.close()
  }
}
