
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
      border: 'none',
      fontSize: '16px',
      transition: 'background-color 0.3s',
          border: '1px solid red', // Thay đổi border thành solid red
  
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
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {/* Div lớn hơn với bg-white */}
        <div className="w-full max-w-3xl p-10 bg-white shadow-lg rounded-xl">
          {/* Thanh input */}
          <input
            type="text"
            placeholder="探したいものを入力してください"
            className="w-full p-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
          />
  
          {/* Chữ "Mã" */}
          <h2 className="text-xl font-bold text-gray-800 mb-4">味</h2>
  
          {/* Dòng gạch ngang */}
          <hr className="border-t border-gray-300 mb-6" />
  
          {/* Button tím nhẹ chia thành 5 cột */}
          <div className="grid grid-cols-5 gap-6">
            {['辛い', '甘い', '苦い', '酸っぱい', '甘辛い', '塩辛い', '淡白', '薄い', '濃い', '旨味'].map((item) => (
              <button
                key={item}
                className="bg-purple-800 text-white py-3 px-2 rounded-full hover:bg-purple-700 transition text-sm"
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          {/* Chữ "Mã" */}
          <h2 className="text-xl font-bold text-gray-800 mb-4 mt-4">食材</h2>
  
          {/* Dòng gạch ngang */}
          <hr className="border-t border-gray-300 mb-6" />
  
          {/* Button tím nhẹ chia thành 5 cột */}
          <div className="grid grid-cols-5 gap-6">
            {['人参', 'ニンニク', '鳥肉', '豚肉', '牛', '野菜', '唐辛子', '卵', '豆腐', 'う魚', 'チーズ'].map((item) => (
              <button
                key={item}
                className="bg-purple-800 text-white py-3 px-2 rounded-full hover:bg-purple-700 transition text-sm"
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          {/* Chữ "Mã" */}
          <h2 className="text-xl font-bold text-gray-800 mb-4 mt-4">種類</h2>
  
          {/* Dòng gạch ngang */}
          <hr className="border-t border-gray-300 mb-6" />
  
          {/* Button tím nhẹ chia thành 5 cột */}
          <div className="grid grid-cols-5 gap-6">
            {['日本料理', '甘イタリア料理', 'フランス料理', 'ベトナム料理', 'アジア料理', 'ベジタリアン', '美食', 'ファストフード', 'ストリートフード'].map((item) => (
              <button
                key={item}
                className="bg-purple-800 text-white py-3  rounded-full hover:bg-purple-900 transition text-sm"
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          {/* Chữ "Mã" */}
          <h2 className="text-xl font-bold text-gray-800 mb-4 mt-4">作り方</h2>
  
          {/* Dòng gạch ngang */}
          <hr className="border-t border-gray-300 mb-6" />
  
          {/* Button tím nhẹ chia thành 5 cột */}
          <div className="grid grid-cols-5 gap-6">
            {['焼く', '揚げる', '煮る', '蒸す', '炒める', '茹でる', '漬ける'].map((item) => (
              <button
                key={item}
                className="bg-purple-800 text-white py-3 px-2 rounded-full hover:bg-purple-700 transition text-sm"
                type="button"
              >
                {item}
              </button>
            ))}
          </div>

          <hr className="border-t border-gray-300 mb-6 mt-4" />
          <div style={styles.buttonContainer}>
            <button
              style={{ ...styles.button, ...styles.cancelButton}}
              type="button"
            //   onClick={handleCancel}
              className=" border-red-500"
            >
              キャンセル
            </button>
            <button
              style={{ ...styles.button, ...styles.saveButton }}
              type="submit"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default LikeAndDislikePage;