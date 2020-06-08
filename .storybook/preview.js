import React from 'react';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import '@storybook/addon-console';
import { GlobalStyles } from '../src/global-styles';
import 'typeface-roboto/index.css';
import { initI18N } from '../src/modules/i18n';
import { Provider } from 'react-redux';
import { store } from '../src/modules/monolith-store';
import { BrowserRouter as Router } from 'react-router-dom';
import { addParameters } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const AppDialogs = () => null;

addDecorator(
    withInfo({
        header: false,
    }),
);
addDecorator(storyFn => (
    <>
        <GlobalStyles />
        <Provider store={store}>
            <Router>{storyFn()}</Router>
            <AppDialogs />
        </Provider>
    </>
));

const customViewports = {
    kindleFire2: {
        name: 'Kindle Fire 2',
        styles: {
            width: '600px',
            height: '963px',
        },
    },
    kindleFireHD: {
        name: 'Kindle Fire HD',
        styles: {
            width: '533px',
            height: '801px',
        },
    },
};

addParameters({
    viewport: {
        viewports: {
            ...INITIAL_VIEWPORTS,
            ...customViewports,
        },
    },
});

initI18N();

window.store = store;
