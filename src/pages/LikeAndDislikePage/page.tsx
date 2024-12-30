import React, { useState } from 'react';

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '30px',
  },
  button: {
    padding: '12px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
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

interface LikeAndDislikePageProps {
  source: 'likes' | 'dislikes';
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: () => void;
}

const LikeAndDislikePage: React.FC<LikeAndDislikePageProps> = ({ source, selectedItems, setSelectedItems, onClose }) => {
  const toggleSelection = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSave = () => {
    onClose();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-10 bg-white shadow-lg rounded-xl">
        <input
          type="text"
          placeholder="探したいものを入力してください"
          className="w-full p-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
        />

        {/* Mục: 味 */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">味</h2>
        <hr className="border-t border-gray-300 mb-6" />
        <div className="grid grid-cols-5 gap-6">
          {['辛い', '甘い', '苦い', '酸っぱい', '甘辛い', '塩辛い', '淡白', '薄い', '濃い', '旨味'].map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(item)}
              className={`py-3 px-2 rounded-full text-sm transition ${
                selectedItems.includes(item)
                  ? 'bg-purple-900 text-white'
                  : 'bg-purple-800 text-white hover:bg-purple-700'
              }`}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mục: 食材 */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-4">食材</h2>
        <hr className="border-t border-gray-300 mb-6" />
        <div className="grid grid-cols-5 gap-6">
          {['人参', 'ニンニク', '鳥肉', '豚肉', '牛', '野菜', '唐辛子', '卵', '豆腐', 'う魚', 'チーズ'].map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(item)}
              className={`py-3 px-2 rounded-full text-sm transition ${
                selectedItems.includes(item)
                  ? 'bg-purple-900 text-white'
                  : 'bg-purple-800 text-white hover:bg-purple-700'
              }`}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mục: 種類 */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-4">種類</h2>
        <hr className="border-t border-gray-300 mb-6" />
        <div className="grid grid-cols-5 gap-6">
          {['日本料理', '甘イタリア料理', 'フランス料理', 'ベトナム料理', 'アジア料理', 'ベジタリアン', '美食', 'ファストフード', 'ストリートフード'].map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(item)}
              className={`py-3 px-2 rounded-full text-sm transition ${
                selectedItems.includes(item)
                  ? 'bg-purple-900 text-white'
                  : 'bg-purple-800 text-white hover:bg-purple-700'
              }`}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mục: 作り方 */}
        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-4">作り方</h2>
        <hr className="border-t border-gray-300 mb-6" />
        <div className="grid grid-cols-5 gap-6">
          {['焼く', '揚げる', '煮る', '蒸す', '炒める', '茹でる', '漬ける'].map((item) => (
            <button
              key={item}
              onClick={() => toggleSelection(item)}
              className={`py-3 px-2 rounded-full text-sm transition ${
                selectedItems.includes(item)
                  ? 'bg-purple-900 text-white'
                  : 'bg-purple-800 text-white hover:bg-purple-700'
              }`}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>

        <hr className="border-t border-gray-300 mb-6 mt-4" />
        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.cancelButton }}
            type="button"
            onClick={onClose}
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