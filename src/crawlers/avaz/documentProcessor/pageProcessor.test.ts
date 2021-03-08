import handler from './pageProcessor'
import readStub from '../../helpers/readStub'
import obituaries from '../../__stubs__/oslobodjenje'
import { Page } from 'puppeteer'

describe('pageParser', () => {
  let page: Page | null

  afterAll(async () => {
    if (page) {
      await page.close()
    }
    page = null
  })

  it('parses a page', async () => {
    page = await readStub('oslobodjenje')

    const actual = await handler(page)

    expect(actual).toEqual(obituaries)
  })
})
