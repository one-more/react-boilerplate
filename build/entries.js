import path from 'path';

export const root = path.join(__dirname, '../');

export const assetEntries = [path.join(root, 'app/index.html')];

const entries = {
    vendor: [
        'react',
        'redux',
        'react-redux',
        'whatwg-fetch'
    ],
    main: ['normalize.css', path.join(root, 'app')]
};

export default entries;
