
// react structure
import React from 'react';
import ReactDOM from 'react-dom/client';

// components
import App from './App';

// i18next
import i18next from 'i18next';
import RU from './translations/ru.json';
import EN from './translations/en.json';

// style
import './scss/fonts.scss';
import './scss/index.scss';
import { initReactI18next } from 'react-i18next';

// locale
i18next
	.use(initReactI18next)
	.init({
		lng: 'ru',
		resources: {
			en: { translation: EN },
			ru: { translation: RU },
		}
	});

// render
ReactDOM.createRoot(document.getElementById('root')).render(
	<App />
);
