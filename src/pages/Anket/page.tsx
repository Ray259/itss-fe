import React, { useState } from 'react';
import { updatePreferences, UserPreferencesRequest } from '@api/user-info.api';
import { useParams } from 'react-router-dom';

const Anket: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
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
            loved_distinct: parseInt(distance.replace('キロ以下', ''), 10),
            loved_price: parseInt(budget.replace('~', '').replace('VND', ''), 10),
            loved_flavor: likes,
            hated_flavor: dislikes
        };

        try {
            if (userId) {
                const response = await updatePreferences(userId, requestData);
                alert('保存しました！');
                console.log('Response from API:', response);
            } else {
                console.error('User ID is undefined');
                alert('ユーザーIDが見つかりません。');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('更新に失敗しました。');
        }
    };

    const handleCancel = () => {
        setVegetarian('');
        setLocation('');
        setDistance('');
        setBudget('');
        setLikes([]);
        setDislikes([]);
        console.log('Form đã được reset.');
    };

    const handleAddItem = (list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
        if (!list.includes(item)) {
            setter([...list, item]);
        } else {
            setter(list.filter((i) => i !== item));
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100 p-5'>
            <div className='bg-white w-full max-w-2xl p-5 rounded-lg shadow-md'>
                <h1 className='text-center text-red-600 text-4xl mb-5'>アンケート</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-5'>
                        <h2 className='font-bold text-xl mb-3'>一般情報</h2>
                        <div className='mb-3'>
                            <label>ベジタリアンですか？</label>
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
                                    はい
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
                                    いいえ
                                </label>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label>どこにいますか？</label>
                            <input
                                type='text'
                                placeholder='例: １Dai Co Viet通り、Hai Ba Trung、Ha Noi'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className='w-full p-2 mt-2 border rounded'
                            />
                        </div>
                        <div className='mb-3'>
                            <label>本場から行ける距離</label>
                            <input
                                type='text'
                                placeholder='例: ３キロ以下'
                                value={distance}
                                onChange={(e) => setDistance(e.target.value)}
                                className='w-full p-2 mt-2 border rounded'
                            />
                        </div>
                        <div className='mb-3'>
                            <label>食事の予算</label>
                            <input
                                type='text'
                                placeholder='例: ~50000VND'
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className='w-full p-2 mt-2 border rounded'
                            />
                        </div>
                    </div>

                    <div className='mb-5'>
                        <h2 className='font-bold text-xl mb-3'>好み</h2>
                        <div className='flex flex-wrap gap-3'>
                            {['辛い物', '甘い物', '揚げ物', '焼き物'].map((item) => (
                                <button
                                    key={item}
                                    className={`py-2 px-4 rounded transition duration-300 ${
                                        likes.includes(item)
                                            ? 'bg-[#4e4070] text-white'
                                            : 'bg-[#65558f] text-white hover:bg-[#4e4070]'
                                    }`}
                                    onClick={() => handleAddItem(likes, setLikes, item)}
                                    type='button'
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='mb-5'>
                        <h2 className='font-bold text-xl mb-3'>苦手</h2>
                        <div className='flex flex-wrap gap-3'>
                            {['日本料理', 'フランス料理', '揚げ物', '焼き物'].map((item) => (
                                <button
                                    key={item}
                                    className={`py-2 px-4 rounded transition duration-300 ${
                                        dislikes.includes(item)
                                            ? 'bg-[#4e4070] text-white'
                                            : 'bg-[#65558f] text-white hover:bg-[#4e4070]'
                                    }`}
                                    onClick={() => handleAddItem(dislikes, setDislikes, item)}
                                    type='button'
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className='flex justify-center gap-3 mt-5'>
                        <button
                            className='bg-gray-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-gray-600'
                            type='button'
                            onClick={handleCancel}
                        >
                            キャンセル
                        </button>
                        <button
                            className='bg-red-600 text-white py-2 px-4 rounded transition duration-300 hover:bg-red-700'
                            type='submit'
                        >
                            保存
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Anket;
