import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files (we will create these later or load dynamically)
// For now, we'll start with basic structure
const resources = {
    en: {
        translation: {
            "dashboard_title": "Incident Commander",
            "new_incident": "New Incident",
            "status_open": "Open",
            "status_investigating": "Investigating",
            "status_resolved": "Resolved",
            "status_critical": "Critical",
            "priority_low": "Low",
            "priority_medium": "Medium",
            "priority_high": "High",
            "priority_critical": "Critical",
            "loading": "Loading...",
            "no_incidents": "No active incidents.",
            "create_incident": "Create Incident",
            "title": "Title",
            "description": "Description",
            "submit": "Submit",
            "cancel": "Cancel"
        }
    },
    es: { translation: {} },
    hi: { translation: {} },
    ja: { translation: {} },
    pt: { translation: {} }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
