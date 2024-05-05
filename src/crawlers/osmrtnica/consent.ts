import type { Page } from 'puppeteer-core'
import { wait } from '../../utils/wait'

const consent = async (page: Page): Promise<void> => {
  try {
    const cookieDialog = await page.$('.fc-footer-buttons-container')
    if (cookieDialog) {
      const consentButton = await page.$(
        '.fc-footer-buttons-container button:first-child'
      )
      if (consentButton) {
        await consentButton.click()
      }
    }
  } catch (err) {
    console.error('Consent error:', err)
  }
}

export default async (page: Page) => Promise.race([wait(5000), consent(page)])
