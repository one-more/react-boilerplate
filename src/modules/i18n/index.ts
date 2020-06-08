import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import en from './resources/en.json';
// eslint-disable-next-line import/no-unresolved
import { i18nKey } from './en';

export const initI18N = (): void => {
    i18n.use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources: {
                en,
            },
            fallbackLng: 'en',
            debug: false,

            keySeparator: '.',

            interpolation: {
                escapeValue: false,
            },
            react: {
                wait: true,
            },
            initImmediate: true,
            ns: ['translations'],
            defaultNS: 'translations',
        });
};

export const t = (key: i18nKey): string => i18n.t(key);
export { default as i18n } from 'i18next';
export * from './trans';
// eslint-disable-next-line import/no-unresolved
export { i18nKey } from './en';
