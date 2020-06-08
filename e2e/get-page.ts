import { Browser, Page } from 'puppeteer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');

export async function getPage(): Promise<[Page, Browser]> {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    return [page, browser];
}
