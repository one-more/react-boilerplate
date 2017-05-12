// This loader should be used as first loader in chain
// ignores all other loaders, and returns the same result like raw-loader

const rawLoader = require('raw-loader');
const fs = require('fs');

module.exports = function forceRawLoader(content) {
    return rawLoader(content);
};

module.exports.pitch = function pitch(remainingRequest, precedingRequest) {
    if (precedingRequest) {
        throw Error('This loader should be used as first loader in chain');
    }
    return rawLoader(fs.readFileSync(remainingRequest.split('!').pop(), 'utf8'));
};

