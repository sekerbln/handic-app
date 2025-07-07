import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "eventList": "Event List",
            "viewDetails": "View Details",
            "loading": "Loading...",
            "noEvents": "No events found.",
            "back": "← Back to Event List",
            "description": "Description",
            "start": "Start",
            "end": "End",
            "website": "Website",
            "eventType": "Event Type",
            "tags": "Tags",
            "language": "Language",
            "maxCapacity": "Max Capacity"
        }
    },
    de: {
        translation: {
            "eventList": "Veranstaltungsliste",
            "viewDetails": "Details ansehen",
            "loading": "Lade...",
            "noEvents": "Keine Veranstaltungen gefunden.",
            "back": "← Zurück zur Liste",
            "description": "Beschreibung",
            "start": "Beginn",
            "end": "Ende",
            "website": "Webseite",
            "eventType": "Veranstaltungstyp",
            "tags": "Schlagwörter",
            "language": "Sprache",
            "maxCapacity": "Maximale Kapazität"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
