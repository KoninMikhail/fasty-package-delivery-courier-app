import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

await i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'ru'],
        debug: import.meta.env.DEV, // выключите в продакшене
        defaultNS: 'common',
        interpolation: {
            escapeValue: false, // react уже умеет эскейпить html
        },
    });

// eslint-disable-next-line no-restricted-exports
export { default as locale } from 'i18next';
export { ErrorMessageKeys } from './errorMessageKeys';
