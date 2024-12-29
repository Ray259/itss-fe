import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button, Pagination } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

interface Image {
  url?: string; 
  file?: File; 
}

interface MenuItem {
  foodname: string;
  address: string;
  price: string;
  image: Image; 
  id: string;
}

const DishesList: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 12; // Số món ăn mỗi trang
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://itss-restaurant-backend.onrender.com/api/v1/dishes", {
        params: { per_page: 37, page: 1 }, // Lấy tất cả món ăn (hoặc giới hạn tùy backend)
      })
      .then((response) => {
        const dishes = response.data.data.map((dish: any) => ({
          foodname: dish.name || "No name",
          address: dish.address || "No description",
          price: dish.price ? `${dish.price}đ` : "No price",
          image: { url: dish.images?.[0] }, 
          id: dish.id,
        }));
        setMenuItems(dishes);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/dishes/${id}`);
  };

  const handleAddNew = () => {
    navigate("/addfoodadmin");
  };

  const getImageSrc = (image: Image) => {
    return image.url || (image.file ? URL.createObjectURL(image.file) : "/path/to/default-image.png");
  };

  // Tính toán món ăn hiển thị dựa trên trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = menuItems.slice(startIndex, endIndex);

  // Tổng số trang
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value); // Cập nhật trang hiện tại
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa món ăn này không?");
    if (!confirmDelete) return;
  
    const token = localStorage.getItem('accessToken');
    try {
      await axios.delete(`https://itss-restaurant-backend.onrender.com/api/v1/dishes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Món ăn đã được xóa thành công!");
  
      // Cập nhật danh sách món ăn
      setMenuItems((prevMenuItems) => prevMenuItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa món ăn:", error);
      alert("Xóa món ăn thất bại!");
    }
  };

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom style={{ color: "red", fontWeight: "bold" }}>
      食べ物一覧
      </Typography>
      <Box textAlign="center" marginBottom={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handleAddNew}
          style={{ fontWeight: "bold" }}
        >
          + 食べ物を追加
        </Button>
      </Box>
      <Grid container spacing={3} alignItems="stretch">
        {currentItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: "16px",
              }}
            >
              <CardMedia
                component="img"
                image={getImageSrc(item.image)}
                alt={item.foodname}
                style={{
                  width: "100%", // Chiếm toàn bộ chiều ngang của Card
                  height: "200px", // Cố định chiều cao
                  objectFit: "cover", // Ảnh hiển thị vừa khung mà không méo
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              />
              <CardContent
                style={{
                  flex: "1 0 auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" noWrap>
                  {item.foodname}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                  }}
                >
                  {item.address}
                </Typography>
                <Box display="flex" alignItems="center" marginTop={1}>
                  <MonetizationOnIcon fontSize="small" />
                  <Typography variant="subtitle1" fontWeight="bold" marginLeft={0.5}>
                    {item.price}
                  </Typography>
                </Box>
              </CardContent>
              <Box textAlign="center" paddingBottom={2}>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(item.id)}
                >
                  編集する
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(item.id)}
                >
                  削除する
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" marginTop={4}>
        <Pagination
          count={totalPages} // Tổng số trang
          page={currentPage} // Trang hiện tại
          onChange={handlePageChange} // Xử lý khi đổi trang
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};

export default DishesList;
