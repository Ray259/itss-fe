import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import i18n from './i18n/index.ts';
import { I18nextProvider } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import { DarkModeProvider } from './contexts/DarkModeContext';

if (!i18n.language) {
    i18n.changeLanguage('ja');
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <I18nextProvider i18n={i18n}>
                <DarkModeProvider>
                    <App />
                </DarkModeProvider>
            </I18nextProvider>
        </HelmetProvider>
    </StrictMode>
);