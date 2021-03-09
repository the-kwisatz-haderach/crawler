import puppeteer from 'puppeteer'

const usePuppeteer = async (headless = true) => {
  const browser = await puppeteer.launch({ headless })
  const page = await browser.newPage()

  return {
    page,
    goTo: async (path: string) => {
      await page.goto(path)
    },
    teardown: async () => {
      await page.close()
      await browser.close()
    }
  }
}

export default usePuppeteer
