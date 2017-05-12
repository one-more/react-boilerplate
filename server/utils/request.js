/* eslint-disable import/no-extraneous-dependencies */
import http from 'http';
import urlBuilder from 'url';
import {GET, POST} from '../../app/api';

export function get(url) {
    return _request(url, GET);
}

/**
 * Executes post request
 * @param {String} url
 * @param data
 * @returns {Promise}
 */
export function post(url, data) {
    return _request(url, POST, data);
}

/**
 * Generic request function
 * @param {String} url
 * @param {String} method
 * @param {Object} data
 * @returns {Promise}
 * @private
 */
function _request(url, method = GET, data = null) {
    return new Promise((resolve, reject) => {
        const {hostname, port, path} = urlBuilder.parse(url);
        const rawData = JSON.stringify(data);
        const options = {
            hostname,
            port,
            path,
            method
        };

        if (method === POST) {
            options.headers = {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(rawData)
            };
        }

        const request = http.request(options, (response) => {
            const {statusCode, headers} = response;
            let body = '';
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                body += chunk;
            });
            response.on('end', () => {
                resolve({body, status: statusCode, headers});
            });
        });

        request.on('error', (error) => {
            reject(error);
        });

        if (method === POST) {
            request.write(rawData);
        }
        request.end();
    });
}
