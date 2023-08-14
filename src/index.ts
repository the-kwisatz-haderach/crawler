import SiteCrawler from './SiteCrawler'
import { saveToDb } from './crawlers/common'
import * as processors from './crawlers/osmrtnica'
import type { IObituary } from './domain/types'

type Event = {
  type:
    | 'obavijest-o-smrti'
    | 'posljednje-zbogom'
    | 'posljednji-pozdrav'
    | 'sjecanje'
    | 'zahvale'
}

const crawlers: Record<Event['type'], SiteCrawler<IObituary[]>> = {
  zahvale: new SiteCrawler({
    url: 'https://www.osmrtnica.ba/category/zahvala/',
    documentProcessor: processors.zahvaleObitCategoryProcessor,
    outputHandler: saveToDb('zahvale')
  }),
  'obavijest-o-smrti': new SiteCrawler({
    url: 'https://www.osmrtnica.ba/category/obavijest-o-smrti/',
    documentProcessor: processors.osmrtnicaObitCategoryProcessor,
    outputHandler: saveToDb('osmrtnica')
  }),
  'posljednje-zbogom': new SiteCrawler({
    url: 'https://www.osmrtnica.ba/category/posljednje-zbogom/',
    documentProcessor: processors.zbogomObitCategoryProcessor,
    outputHandler: saveToDb('zbogom')
  }),
  'posljednji-pozdrav': new SiteCrawler({
    url: 'https://www.osmrtnica.ba/category/posljednji-pozdrav/',
    documentProcessor: processors.posljednjiPozdravObitCategoryProcessor,
    outputHandler: saveToDb('posljednji-pozdrav')
  }),
  sjecanje: new SiteCrawler({
    url: 'https://www.osmrtnica.ba/category/sjecanje/',
    documentProcessor: processors.sjecanjeObitCategoryProcessor,
    outputHandler: saveToDb('sjecanje')
  })
}

export const handler = async (event: Event) => {
  try {
    const crawlOptions: any = {
      headless: process.env.PUPPETEER_HEADLESS !== 'false',
      slowMo: Number.parseInt(process.env.PUPPETEER_SLOWMO || '100')
    }

    const crawler = crawlers?.[event?.type || '']

    if (!crawler) {
      return {
        statusCode: 404,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `No such crawler: ${event?.type}`
        })
      }
    }

    await crawler.crawl(crawlOptions)

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ event })
    }
  } catch (err: any) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        err,
        message: err?.message
      })
    }
  }
}
