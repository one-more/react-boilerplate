// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './app'

function render(node) {
    if (module.hot) {
        ReactDOM.render(<AppContainer><App /></AppContainer>, node);

        // $FlowIgnore
        module.hot.accept('./app', () => {
            const NextApp = require('./app').default;
            ReactDOM.render(<AppContainer><NextApp /></AppContainer>, node);
        });
    } else {
        ReactDOM.render(<App />, node);
    }
}

render(document.getElementById('app'));
