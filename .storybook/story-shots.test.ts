import initStoryshots from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';
import { axeTest } from '@storybook/addon-storyshots-puppeteer';
import { puppeteerTest } from '@storybook/addon-storyshots-puppeteer';
const path = require('path');

const storybookUrl = process.env.STORYBOOK_STATIC
    ? `file://${path.resolve(__dirname, '../storybook-static')}`
    : 'http://localhost:6006';
initStoryshots({ suite: 'Puppeteer storyshots', test: puppeteerTest({ storybookUrl }) });
initStoryshots({
    suite: 'Image storyshots',
    test: imageSnapshot({
        storybookUrl,
    }),
});
// @ts-ignore
axeTest({ suite: 'A11y checks', test: axeTest() });
