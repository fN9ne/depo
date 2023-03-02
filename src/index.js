
// react structure
import React from 'react';
import ReactDOM from 'react-dom/client';

// components
import App from './App';

// i18next
import i18next from 'i18next';

// style
import './scss/fonts.scss';
import './scss/index.scss';
import { initReactI18next } from 'react-i18next';

const en = {
	"aboutUs": "About us",
	"howItWorks": "How it works",
	"whereWeWork": "Where we work",
	"contacts": "Contacts"
}
const ru = {
	"aboutUs": "О нас",
	"howItWorks": "Как это работает",
	"whereWeWork": "Где работаем",
	"contacts": "Контакты"
}

// locale
i18next
	.use(initReactI18next)
	.init({
		lng: 'ru',
		resources: {
			en: { translation: en },
			ru: { translation: ru },
		}
	});

// render
ReactDOM.createRoot(document.getElementById('root')).render(
	<App />
);
