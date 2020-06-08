import { Page } from 'puppeteer';

export async function clearInput(page: Page, selector: string): Promise<void> {
    await page.click(selector, { clickCount: 3 });
    await page.keyboard.press('Backspace');
}
