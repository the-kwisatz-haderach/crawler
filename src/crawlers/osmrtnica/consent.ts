import type { Page } from 'puppeteer-core'

const wait = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration))

const consent = async (page: Page): Promise<void> => {
  const cookieDialog = await page.$('.fc-footer-buttons-container')
  if (cookieDialog) {
    const consentButton = await page.$(
      '.fc-footer-buttons-container button:first-child'
    )
    if (consentButton) {
      await consentButton.click()
    }
  }
}

export default async (page: Page) => Promise.race([wait(5000), consent(page)])
