import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSetting: React.FC<{ value: string }> = ({ value }) => {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <div className='flex justify-center space-x-4 mt-4'>
            <select
                onChange={handleChangeLanguage}
                value={value}
                className='w-full border border-orange-500 dark:border-orange-400 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
            >
                <option value='en'>English</option>
                <option value='jp'>日本語</option>
                <option value='vn'>Tiếng Việt</option>
            </select>
        </div>
    );
};

export default LanguageSetting;
