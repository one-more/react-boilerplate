const transport = require('./reducers/transport');
const {backendMiddleware} = require('falx-bus');

const backend = {
    transport
};

module.exports = backendMiddleware(backend);
