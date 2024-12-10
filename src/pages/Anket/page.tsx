import React, { useState } from 'react';
<<<<<<< HEAD
import { updateUser } from '@api/userApi'; // Import API từ file userApi.ts

// Định nghĩa các style
=======

// Định nghĩa các style trong JS
>>>>>>> 6c7153aa97bc661dd9e9ad11ff00c524d6a66a88
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7fc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    padding: '20px',
    flexDirection: 'column',
    width: '100%',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    width: '80%',
    maxWidth: '700px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: '20px',
    marginBottom: '10px',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '12px',
  },
  optionButton: {
<<<<<<< HEAD
    backgroundColor: '#65558f',
=======
    backgroundColor: '#65558f', // Màu tím cho các lựa chọn
>>>>>>> 6c7153aa97bc661dd9e9ad11ff00c524d6a66a88
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
<<<<<<< HEAD
=======
  optionButtonSelected: {
    backgroundColor: '#4e4070', // Màu tím đậm khi lựa chọn
  },
>>>>>>> 6c7153aa97bc661dd9e9ad11ff00c524d6a66a88
  inputField: {
    width: '100%',
    padding: '8px',
    marginTop: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s',
  },
  cancelButton: {
    backgroundColor: '#aaa',
    color: '#fff',
  },
  saveButton: {
<<<<<<< HEAD
    backgroundColor: '#FF0000',
=======
    backgroundColor: '#FF0000', // Màu đỏ cho nút Lưu
>>>>>>> 6c7153aa97bc661dd9e9ad11ff00c524d6a66a88
    color: '#fff',
  },
};

const Anket: React.FC = () => {
<<<<<<< HEAD
  const [vegetarian, setVegetarian] = useState<string>('no');
=======
  const [vegetarian, setVegetarian] = useState<string>('');
>>>>>>> 6c7153aa97bc661dd9e9ad11ff00c524d6a66a88
  const [location, setLocation] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [likes, setLikes] = useState<string[]>([]);
  const [dislikes, setDislikes] = useState<string[]>([]);

<<<<<<< HEAD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData = {
      vegetarian: vegetarian === 'yes',
      address: location,
      distance,
      budget: parseInt(budget.replace('~', '').replace('VND', ''), 10),
      liked_flavors: likes,
      disliked_flavors: dislikes,
    };

    try {
      const response = await updateUser(requestData);
      alert('保存しました！'); // Thông báo khi lưu thành công
      console.log('Response from API:', response);
    } catch (error) {
      console.error('Error updating user:', error);
      alert('更新に失敗しました。'); // Thông báo khi lưu thất bại
    }
  };

  // Hàm xử lý nút "Hủy bỏ"
  const handleCancel = () => {
    setVegetarian('');
    setLocation('');
    setDistance('');
    setBudget('');
    setLikes([]);
    setDislikes([]);
    console.log('Form đã được reset.');
  };

  // Thêm/xóa mục yêu thích hoặc không thích
=======
  // Hàm xử lý khi form được submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("保存しました！");
    console.log({
      vegetarian,
      location,
      distance,
      budget,
      likes,
      dislikes
    });
  };

  // Thêm món vào danh sách thích hoặc không thích
>>>>>>> 6c7153aa97bc661dd9e9ad11ff00c524d6a66a88
  const handleAddItem = (list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (!list.includes(item)) {
      setter([...list, item]);
    }
  };

<<<<<<< HEAD
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={{ textAlign: 'center', color: '#FF0000', fontSize: '32px' }}>アンケート</h1>

        <form onSubmit={handleSubmit}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>一般情報</h2>
            <div>
              <label>ベジタリアンですか？</label>
              <div style={styles.optionsContainer}>
                <label>
                  <input
                    type="radio"
                    name="vegetarian"
                    value="yes"
                    onChange={() => setVegetarian('yes')}
                    checked={vegetarian === 'yes'}
                  />
                  はい
                </label>
                <label>
                  <input
                    type="radio"
                    name="vegetarian"
                    value="no"
                    onChange={() => setVegetarian('no')}
                    checked={vegetarian === 'no'}
                  />
                  いいえ
                </label>
              </div>
            </div>

            <div>
              <label>どこにいますか？</label>
              <input
                type="text"
                placeholder="例: １Dai Co Viet通り、Hai Ba Trung、Ha Noi"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={styles.inputField}
              />
            </div>

            <div>
              <label>本場から行ける距離</label>
              <input
                type="text"
                placeholder="例: ３キロ以下"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                style={styles.inputField}
              />
            </div>

            <div>
              <label>食事の予算</label>
              <input
                type="text"
                placeholder="例: ~50000VND"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                style={styles.inputField}
              />
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>好み</h2>
            <div style={styles.optionsContainer}>
              {['辛い物', '甘い物', '揚げ物', '焼き物'].map((item) => (
                <button
                  key={item}
                  style={styles.optionButton}
                  onClick={() => handleAddItem(likes, setLikes, item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>苦手</h2>
            <div style={styles.optionsContainer}>
              {['日本料理', 'フランス料理', '揚げ物', '焼き物'].map((item) => (
                <button
                  key={item}
                  style={styles.optionButton}
                  onClick={() => handleAddItem(dislikes, setDislikes, item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div style={styles.buttonContainer}>
            <button
              style={{ ...styles.button, ...styles.cancelButton }}
              type="button"
              onClick={handleCancel}
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
        </form>
=======
  // Xóa món khỏi danh sách
  const handleRemoveItem = (list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(list.filter(i => i !== item));
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Tiêu đề */}
        <h1 style={{ textAlign: 'center', color: '#FF0000', fontSize: '32px' }}>アンケート</h1>

        {/* Section 1: Thông tin chung */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>一般情報</h2>
          
          {/* Câu hỏi: ベジタリアンですか？ */}
          <div className="question">
            <label>ベジタリアンですか？</label>
            <div style={styles.optionsContainer}>
              <label>
                <input
                  type="radio"
                  name="vegetarian"
                  value="yes"
                  onChange={() => setVegetarian('yes')}
                  checked={vegetarian === 'yes'}
                />
                はい
              </label>
              <label>
                <input
                  type="radio"
                  name="vegetarian"
                  value="no"
                  onChange={() => setVegetarian('no')}
                  checked={vegetarian === 'no'}
                />
                いいえ
              </label>
            </div>
          </div>

          {/* Câu hỏi nhập vị trí */}
          <div className="question">
            <label>どこにいますか？</label>
            <input
              type="text"
              placeholder="例: １Dai Co Viet通り、Hai Ba Trung、Ha Noi"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={styles.inputField}
            />
          </div>

          {/* Câu hỏi khoảng cách */}
          <div className="question">
            <label>本場から行ける距離</label>
            <input
              type="text"
              placeholder="例: ３キロ以下"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              style={styles.inputField}
            />
          </div>

          {/* Câu hỏi ngân sách */}
          <div className="question">
            <label>食事の予算</label>
            <input
              type="text"
              placeholder="例: ~50000VND"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={styles.inputField}
            />
          </div>
        </div>

        {/* Section 2: 好み */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>好み</h2>
          <small>好みをリストに追加できます</small>
          <div style={styles.optionsContainer}>
            {['辛い物', '甘い物', '揚げ物', '焼き物'].map(item => (
              <button
                key={item}
                style={styles.optionButton}
                onClick={() => handleAddItem(likes, setLikes, item)}
              >
                {item}
              </button>
            ))}
          </div>
          
        </div>

        {/* Section 3: 苦手 */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>苦手</h2>
          <div style={styles.optionsContainer}>
            {['日本料理', 'フランス料理', '揚げ物', '焼き物'].map(item => (
              <button
                key={item}
                style={styles.optionButton}
                onClick={() => handleAddItem(dislikes, setDislikes, item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Nút lưu và hủy */}
        <div style={styles.buttonContainer}>
          <button
            style={{ ...styles.button, ...styles.cancelButton }}
            onClick={() => console.log('Cancelled')}
          >
            キャンセル
          </button>
          <button
            style={{ ...styles.button, ...styles.saveButton }}
            onClick={handleSubmit}
          >
            保存
          </button>
        </div>
>>>>>>> 6c7153aa97bc661dd9e9ad11ff00c524d6a66a88
      </div>
    </div>
  );
};

export default Anket;
