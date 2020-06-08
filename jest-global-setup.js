// eslint-disable-next-line @typescript-eslint/no-var-requires
const childProcess = require('child_process');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const handler = require('serve-handler');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const http = require('http');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const options = require('./serve.json');

module.exports = async () => {
    return new Promise(resolve => {
        const server = http.createServer((request, response) => {
            return handler(request, response, options);
        });
        global.server = server;

        server.listen(5000, () => {
            resolve();
        });
    });
};
