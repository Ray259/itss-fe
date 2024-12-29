import React, { useState } from 'react';
import { updatePreferences, UserPreferencesRequest } from '@api/user-info.api';
import { useTranslation } from 'react-i18next';
import { getLocalUser } from '@/utils/auth';

const Anket: React.FC = () => {
    const user = getLocalUser();
    const userId = user?.id;
    const { t } = useTranslation('anket');
    const [vegetarian, setVegetarian] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [distance, setDistance] = useState<string>('');
    const [budget, setBudget] = useState<string>('');
    const [likes, setLikes] = useState<string[]>([]);
    const [dislikes, setDislikes] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requestData: UserPreferencesRequest = {
            vegeterian: vegetarian === 'yes',
            address: location,
            loved_distinct: parseInt(distance.replace(t('distanceUnit'), ''), 10),
            loved_price: parseInt(budget.replace('~', '').replace('VND', ''), 10),
            loved_flavor: likes,
            hated_flavor: dislikes,
        };

        try {
            if (userId) {
                const response = await updatePreferences(userId, requestData);
                alert(t('saved'));
                console.log('Response from API:', response);
            } else {
                console.error('User ID is undefined');
                alert(t('userIdNotFound'));
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert(t('updateFailed'));
        }
    };

    const handleCancel = () => {
        setVegetarian('');
        setLocation('');
        setDistance('');
        setBudget('');
        setLikes([]);
        setDislikes([]);
        console.log(t('formReset'));
    };

    const handleAddItem = (
        list: string[],
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        item: string
    ) => {
        if (!list.includes(item)) {
            setter([...list, item]);
        } else {
            setter(list.filter((i) => i !== item));
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-5'>
            <div className='bg-gray-100 dark:bg-gray-800 w-full max-w-2xl p-5 rounded-lg shadow-md'>
                <h1 className='text-center text-red-600 dark:text-red-400 text-4xl mb-5'>{t('survey')}</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-5'>
                        <h2 className='font-bold text-xl mb-3'>{t('generalInfo')}</h2>
                        <div className='mb-3'>
                            <label>{t('vegetarianQuestion')}</label>
                            <div className='flex space-x-3 mt-2'>
                                <label className='flex items-center'>
                                    <input
                                        type='radio'
                                        name='vegetarian'
                                        value='yes'
                                        onChange={() => setVegetarian('yes')}
                                        checked={vegetarian === 'yes'}
                                        className='mr-2'
                                    />
                                    {t('yes')}
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        type='radio'
                                        name='vegetarian'
                                        value='no'
                                        onChange={() => setVegetarian('no')}
                                        checked={vegetarian === 'no'}
                                        className='mr-2'
                                    />
                                    {t('no')}
                                </label>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label>{t('locationQuestion')}</label>
                            <input
                                type='text'
                                placeholder={t('locationPlaceholder')}
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className='w-full p-2 mt-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded'
                            />
                        </div>
                        <div className='mb-3'>
                            <label>{t('distanceQuestion')}</label>
                            <input
                                type='text'
                                placeholder={t('distancePlaceholder')}
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                className='w-full p-2 mt-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded'
                            />
                        </div>
                        <div className='mb-3'>
                            <label>{t('budgetQuestion')}</label>
                            <input
                                type='text'
                                placeholder={t('budgetPlaceholder')}
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className='w-full p-2 mt-2 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 rounded'
                            />
                        </div>
                    </div>

                    <div className='mb-5'>
                        <h2 className='font-bold text-xl mb-3'>{t('likes')}</h2>
                        <div className='flex flex-wrap gap-3'>
                            {['spicy', 'sweet', 'fried', 'grilled'].map((item) => (
                                <button
                                    key={item}
                                    className={`py-2 px-4 rounded transition duration-300 ${
                                        likes.includes(t(`flavors.${item}`))
                                            ? 'bg-gray-500 text-gray-100'
                                            : 'bg-[#65558f] text-gray-100 hover:bg-[#4e4070]'
                                    }`}
                                    onClick={() => handleAddItem(likes, setLikes, t(`flavors.${item}`))}
                                    type='button'
                                >
                                    {t(`flavors.${item}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='mb-5'>
                        <h2 className='font-bold text-xl mb-3'>{t('dislikes')}</h2>
                        <div className='flex flex-wrap gap-3'>
                            {['japanese', 'french', 'fried', 'grilled'].map((item) => (
                                <button
                                    key={item}
                                    className={`py-2 px-4 rounded transition duration-300 ${
                                        dislikes.includes(t(`flavors.${item}`))
                                            ? 'bg-gray-500 text-gray-100'
                                            : 'bg-[#65558f] text-gray-100 hover:bg-[#4e4070]'
                                    }`}
                                    onClick={() => handleAddItem(dislikes, setDislikes, t(`flavors.${item}`))}
                                    type='button'
                                >
                                    {t(`flavors.${item}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='flex justify-center gap-3 mt-5'>
                        <button
                            className='bg-gray-500 text-gray-100 py-2 px-4 rounded transition duration-300 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500'
                            type='button'
                            onClick={handleCancel}
                        >
                            {t('cancel')}
                        </button>
                        <button
                            className='bg-red-600 text-gray-100 py-2 px-4 rounded transition duration-300 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400'
                            type='submit'
                        >
                            {t('save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Anket;
