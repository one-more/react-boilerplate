// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const debounce = require('lodash/debounce');

function generateFromLangObj(lng, prefix = '') {
    return Object.keys(lng)
        .reduce((acc, key) => {
            const i18nKey = (prefix ? prefix + '.' : '') + key;
            if (typeof lng[key] === 'object') {
                return acc.concat(generateFromLangObj(lng[key], i18nKey));
            }
            return acc.concat([`'${i18nKey}'`]);
        }, [])
        .join('|');
}

const enResourcePath = path.resolve(__dirname, '../resources/en.json');
function generateEnDeclarations() {
    try {
        const enDeclarationsPath = path.resolve(__dirname, '../en.ts');
        delete require.cache[require.resolve(enResourcePath)];
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const en = require(enResourcePath);
        const declarations = 'export type i18nKey = ' + generateFromLangObj(en.translations) + `|''`;
        fs.writeFileSync(enDeclarationsPath, declarations);
    } catch (e) {
        console.log(e);
    }
}
generateEnDeclarations();
fs.watch(enResourcePath, debounce(generateEnDeclarations, 400));
