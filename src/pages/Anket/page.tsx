import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updatePreferences, UserPreferencesRequest } from '@api/user-info.api';
import { useTranslation } from 'react-i18next';
import { getLocalUser } from '@/utils/auth';
import Modal from '@components/Modal';
import LikeAndDislikePage from '@/pages/LikeAndDislikePage/page';

const Anket: React.FC = () => {
    const user = getLocalUser();
    const userId = user?.id;
    const { t } = useTranslation('anket');
    const location = useLocation();
    const navigate = useNavigate(); // Thêm hook điều hướng

    // Nhận dữ liệu từ LikeAndDislikePage
    const selectedItems = location.state?.selectedItems || [];
    const source = location.state?.source || ''; // 'likes' hoặc 'dislikes'

    const [vegetarian, setVegetarian] = useState<boolean>(false);
    const [locationInput, setLocationInput] = useState<string>('');
    const [distance, setDistance] = useState<string>('');
    const [budget, setBudget] = useState<string>('');
    const [likes, setLikes] = useState<string[]>([]);
    const [dislikes, setDislikes] = useState<string[]>([]);

    // Cập nhật danh sách "likes" hoặc "dislikes" khi nhận được dữ liệu từ LikeAndDislikePage
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalSource, setModalSource] = useState<'likes' | 'dislikes'>('likes');

    useEffect(() => {
        if (user) {
            setVegetarian(user.vegetarian || false);
            setLocationInput(user.address || '');
            setLikes(user.loved_flavor || []);
            setDislikes(user.hated_flavor || []);
            setDistance(user.loved_distinct?.toString() || '');
            setBudget(user.loved_price?.toString() || '');
        }
    }, []);

    useEffect(() => {
        if (selectedItems.length > 0) {
            if (source === 'likes') {
                setLikes((prev) => [...new Set([...prev, ...selectedItems])]); // Thêm mục mới vào likes
            } else if (source === 'dislikes') {
                setDislikes((prev) => [...new Set([...prev, ...selectedItems])]); // Thêm mục mới vào dislikes
            }
        }
    }, [selectedItems, source]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const requestData: UserPreferencesRequest = {
            vegetarian,
            address: locationInput,
            loved_distinct: parseInt(distance.replace(t('distanceUnit'), ''), 10),
            loved_price: parseInt(budget.replace('~', '').replace('VND', ''), 10),
            loved_flavor: likes,
            hated_flavor: dislikes
        };

        try {
            if (userId) {
                const response = await updatePreferences(userId, requestData);
                alert(t('saved'));
                console.log('Response from API:', response);

                // Chuyển hướng về Homepage sau khi lưu thành công
                navigate('/homepage');
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
        if (user) {
            setVegetarian(user.vegetarian || false);
            setLocationInput(user.address || '');
            setLikes(user.loved_flavor || []);
            setDislikes(user.hated_flavor || []);
            setDistance(user.loved_distinct?.toString() || '');
            setBudget(user.loved_price?.toString() || '');
        }
        console.log(t('formReset'));
    };

    const openModal = (source: 'likes' | 'dislikes') => {
        setModalSource(source);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                                        onChange={() => setVegetarian(true)}
                                        checked={vegetarian === true}
                                        className='mr-2'
                                    />
                                    {t('yes')}
                                </label>
                                <label className='flex items-center'>
                                    <input
                                        type='radio'
                                        name='vegetarian'
                                        value='no'
                                        onChange={() => setVegetarian(false)}
                                        checked={vegetarian === false}
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
                                value={locationInput}
                                onChange={(e) => setLocationInput(e.target.value)}
                                className='w-full p-2 mt-2 border rounded'
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
                        <h2 className='font-bold text-xl mb-1'>{t('likes')}</h2>
                        <p className='text-sm text-gray-600 mb-3'>{t('likesDes')}</p>
                        <div className='flex flex-wrap gap-3 items-center'>
                            {likes.map((item, index) => (
                                <span key={index} className='py-2 px-4 bg-purple-800 text-white rounded'>
                                    {item}
                                </span>
                            ))}
                            <button
                                type='button'
                                className='py-2 px-4 bg-purple-800 text-white rounded hover:bg-purple-900 transition'
                                onClick={() => openModal('likes')}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className='mb-5'>
                        <h2 className='font-bold text-xl mb-1'>{t('dislikes')}</h2>
                        <p className='text-sm text-gray-600 mb-3'>{t('dislikesDes')}</p>
                        <div className='flex flex-wrap gap-3 items-center'>
                            {dislikes.map((item, index) => (
                                <span key={index} className='py-2 px-4 bg-purple-800 text-white rounded'>
                                    {item}
                                </span>
                            ))}
                            <button
                                type='button'
                                className='py-2 px-4 bg-purple-800 text-white rounded hover:bg-purple-900 transition'
                                onClick={() => openModal('dislikes')}
                            >
                                +
                            </button>
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

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <LikeAndDislikePage
                    source={modalSource}
                    selectedItems={modalSource === 'likes' ? likes : dislikes}
                    setSelectedItems={modalSource === 'likes' ? setLikes : setDislikes}
                    onClose={closeModal}
                />
            </Modal>
        </div>
    );
};

export default Anket;
