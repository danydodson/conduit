import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export default function i18n({ locale, resources }, debug?: boolean) {
  return i18next.use(initReactI18next).init({
    keySeparator: '$',
    lng: locale,
    debug,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      [locale]: {
        translation: resources,
      },
    },
    react: {
      useSuspense: false,
    },
  });
}
