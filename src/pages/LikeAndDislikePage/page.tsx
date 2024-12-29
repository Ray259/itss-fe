import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginTop: '30px',
    },
    button: {
      padding: '12px 25px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background-color 0.3s',
      border: '1px solid red',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        color: '#333',
    },
    saveButton: {
        backgroundColor: '#FF0000',
        color: '#fff',
    },
};

function LikeAndDislikePage() {
    const navigate = useNavigate();
    const [selectedLikes, setSelectedLikes] = useState<string[]>([]);
    const [selectedDislikes, setSelectedDislikes] = useState<string[]>([]);

    const handleAddItem = (list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
        if (!list.includes(item)) {
            setter([...list, item]);
        } else {
            setter(list.filter((i) => i !== item));
        }
    };

    const handleSave = () => {
        // Điều hướng về /anket/12 và truyền state
        navigate('/anket/12', { state: { likes: selectedLikes, dislikes: selectedDislikes } });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-3xl p-10 bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl">
                <input
                    type="text"
                    placeholder="探したいものを入力してください"
                    className="w-full p-4 mb-6 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />

                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">味</h2>
                <hr className="border-t border-gray-300 dark:border-gray-600 mb-6" />
                <div className="grid grid-cols-5 gap-6">
                    {['辛い', '甘い', '苦い', '酸っぱい', '甘辛い', '塩辛い', '淡白', '薄い', '濃い', '旨味'].map((item) => (
                        <button
                            key={item}
                            className={`bg-purple-800 dark:bg-purple-900 text-gray-100 dark:text-gray-300 py-3 px-2 rounded-full hover:bg-purple-700 dark:hover:bg-purple-800 transition text-sm ${
                                selectedLikes.includes(item) ? 'bg-purple-700' : ''
                            }`}
                            type="button"
                            onClick={() => handleAddItem(selectedLikes, setSelectedLikes, item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 mt-4">食材</h2>
                <hr className="border-t border-gray-300 dark:border-gray-600 mb-6" />
                <div className="grid grid-cols-5 gap-6">
                    {['人参', 'ニンニク', '鳥肉', '豚肉', '牛', '野菜', '唐辛子', '卵', '豆腐', 'う魚', 'チーズ'].map((item) => (
                        <button
                            key={item}
                            className={`bg-purple-800 dark:bg-purple-900 text-gray-100 dark:text-gray-300 py-3 px-2 rounded-full hover:bg-purple-700 dark:hover:bg-purple-800 transition text-sm ${
                                selectedDislikes.includes(item) ? 'bg-purple-700' : ''
                            }`}
                            type="button"
                            onClick={() => handleAddItem(selectedDislikes, setSelectedDislikes, item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <div style={styles.buttonContainer}>
                    <button
                        style={{ ...styles.button, ...styles.cancelButton }}
                        type="button"
                        onClick={() => navigate('/')}
                    >
                        キャンセル
                    </button>
                    <button
                        style={{ ...styles.button, ...styles.saveButton }}
                        type="button"
                        onClick={handleSave}
                    >
                        保存
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LikeAndDislikePage;
