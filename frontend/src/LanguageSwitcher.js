import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const changeLanguage = (lng) => {
        if (lng !== currentLanguage) {
            i18n.changeLanguage(lng);
        }
    };

    return (
        <div className="lang-switcher">
            <button
                onClick={() => changeLanguage('en')}
                className={currentLanguage === 'en' ? 'active' : ''}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage('de')}
                className={currentLanguage === 'de' ? 'active' : ''}
            >
                DE
            </button>
        </div>
    );
}

export default LanguageSwitcher;
