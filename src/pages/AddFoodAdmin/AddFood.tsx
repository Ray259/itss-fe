import React, { useState  } from "react";
import axios from "axios";
 import "bootstrap/dist/css/bootstrap.min.css";
import './AddFood.css'; 
import { useNavigate } from "react-router-dom";


const AddFoodForm: React.FC = () => {

  const navigate = useNavigate();

  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm("変更を取り消したいですか？");
    if (confirmCancel) {
      navigate("/admin/dishes");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      // 1. Upload từng ảnh qua API
      const uploadedImageUrls = await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);
  
          const response = await axios.post(
            "https://itss-restaurant-backend.onrender.com/api/v1/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          return response.data.url; // Trả về URL của ảnh đã upload
        })
      );
  
      console.log("Uploaded image URLs:", uploadedImageUrls);
  
      // 2. Gửi request tạo món ăn
      const dishData = {
        name: foodName,
        price: parseFloat(price),
        address: address,
        categories: categories,
        images: uploadedImageUrls, // Gửi các URL ảnh đã upload
        info: description,
      };
      
      const response = await axios.post(
        "https://itss-restaurant-backend.onrender.com/api/v1/dishes",
        dishData,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Phản hồi từ server:", response.data);
      alert("料理が正常に追加されました！");
      navigate("/admin/dishes");
    } catch (error) {
      console.error("Lỗi khi xử lý:", error);
    }
  };
  

  // Hàm xử lý khi người dùng chọn nhiều ảnh
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImages = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...selectedImages]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div className="container mt-5 page-container bg-gray-100 dark:bg-gray-900 dark:text-gray-100 shadow-md">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4" style={{fontWeight: 'Bold', color:"Red", paddingLeft:"15px"}}>食べ物を追加</h2>

        {/* Các trường nhập liệu */}
        {[{
            id: "foodName", label: "料理名:", value: foodName, setValue: setFoodName,
          }, {
            id: "price", label: "価格:", value: price, setValue: setPrice,
          }, {
            id: "address", label: "住所:", value: address, setValue: setAddress,
        }].map((field) => (
          <div className="mb-3 d-flex align-items-center" key={field.id}>
            <label htmlFor={field.id} className="me-3" style={{ width: "150px", fontWeight: 'Bold', borderColor: "red", fontSize: "20px", padding:"20px" }}>
              {field.label}
            </label>
            <input
              type="text"
              id={field.id}
              className="form-control bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              style={{ width: "696px", height:"50px" ,borderColor: "red" }}
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
            />
          </div>
        ))}

        {/* Hình ảnh */}
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="image" className="me-3" style={{ width: "150px", fontWeight: 'Bold', fontSize: "20px",padding:"20px" }}>
            イメージ:
          </label>
          <input
            type="file"
            id="image"
            className="d-none"
            style={{ width: "696px" }}
            onChange={handleImageChange}
            multiple
          />
          {/* Thay thế bằng một button với icon */}
          <label htmlFor="image" className="btn btn-outline-secondary" style={{ display: "flex", alignItems: "center" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v3.6A1 1 0 0 0 2.5 15h11a1 1 0 0 0 1-1v-3.6a.5.5 0 0 1 1 0v3.6a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-3.6a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V10.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
            </svg>
            <span className="ms-2">Upload</span>
          </label>
        </div>

        {/* Hiển thị ảnh sau khi tải lên */}
        {images.length > 0 && (
          <div className="uploaded-images mt-3 d-flex flex-wrap shadow-sm p-3 mb-9 bg-gray-100 dark:bg-gray-800 rounded" style={{ marginLeft: "165px", border: "5px   ", borderRadius: "30px" }}>
            {images.map((image, index) => (
              <div key={index} className="image-preview me-2 mb-2 position-relative " >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`uploaded preview ${index}`}
                  style={{ width: "285px", height: "200px", objectFit: "cover", borderRadius: "28px", margin:"10px", boxShadow: "3px 2px rgb(228, 166, 166)" }}
                />
                {/* Nút xóa ảnh */}
                <button
                  type="button"
                  className="btn btn-danger btn-sm position-absolute top-0 start-0"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Mô tả */}
        <div className="mb-3 d-flex align-items" style={{ marginTop: "20px"}}>
          <label htmlFor="description" className="me-3" style={{ width: "150px", fontWeight: 'Bold', fontSize: "20px", padding:"20px" }}>
            記述:
          </label>
          <textarea
            id="description"
            className="form-control shadow-sm p-3 mb-9 bg-gray-100 dark:bg-gray-800 rounded text-gray-900 dark:text-gray-100"
            style={{ width: "696px", height: "250px"}}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        {/* Danh mục món ăn */}
        <div className="mb-3 d-flex align-items">
          <label className="form-label" style={{ width: "150px", fontWeight: 'Bold', fontSize: "20px", padding:"20px" }}>カテゴリ:</label>
          <div className="container" style={{ paddingTop: "20px", width: "900px", marginLeft: "0"}}>
          <div
      className="category-grid" 
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)", // 4 cột, mỗi cột chia đều
        gap: "20px", // Khoảng cách giữa các phần tử
      }}
    >
      {[
        '辛い', '甘い', '苦い', '酸っぱい', '甘辛い', '塩辛い', '淡白', '薄い', '濃い', '旨味',
        '人参', 'ニンニク', '鳥肉', '豚肉', '牛', '野菜', '唐辛子', '卵', '豆腐', 'う魚', 'チーズ',
        '日本料理', '甘イタリア料理', 'フランス料理', 'ベトナム料理', 'アジア料理', 'ベジタリアン', '美食', 'ファストフード', 'ストリートフード'
        // Các phần tử khác có thể thêm ở đây trong tương lai
      ].map((category) => (
        <div key={category} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "180px" }}>
          <label className="form-check-label category-label" htmlFor={category}>
            {category}
          </label>
          <input
            className="form-check-input checkbox-align"
            type="checkbox"
            style={{ borderColor: "black" }}
            id={category}
            value={category}
            onChange={() => handleCategoryChange(category)}
          />
        </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nút bấm */}
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary me-3" onClick={handleCancel}>
            キャンセル
          </button>
          <button type="submit" className="btn btn-danger">
          追加
          </button>
        </div>
      </form>
    </div>
  );
};


export default AddFoodForm;
