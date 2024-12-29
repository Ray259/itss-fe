import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://itss-restaurant-backend.onrender.com/api/v1/dishes", {
        params: { per_page: 12, page: 1 },
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

  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom style={{ color: "red", fontWeight: "bold" }}>
        食べ物
      </Typography>
      <Box textAlign="center" marginBottom={2}>
        <Button
          variant="contained"
          color="error"
          onClick={handleAddNew}
          style={{ fontWeight: "bold" }}
        >
          食べ物を追加
        </Button>
      </Box>
      <Grid container spacing={3} alignItems="stretch">
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={{ display: "flex", flexDirection: "column", height: "100%", borderRadius: "16px" }}>
              {/* Render ảnh món ăn */}
              <CardMedia
                component="img"
                height="140"
                image={getImageSrc(item.image)} // Kiểm tra URL hoặc Blob URL
                alt={item.foodname}
                style={{
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                  minHeight: "200px",
                  objectFit: "cover",
                }}
              />

              {/* Nội dung món ăn */}
              <CardContent
                style={{
                  flex: "1 0 auto",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
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
                </div>
                <Box display="flex" alignItems="center" marginTop={1}>
                  <MonetizationOnIcon fontSize="small" />
                  <Typography variant="subtitle1" fontWeight="bold" marginLeft={0.5}>
                    {item.price}
                  </Typography>
                </Box>
              </CardContent>

              {/* Nút chỉnh sửa */}
              <Box textAlign="center" paddingBottom={2}>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<EditIcon />}
                  onClick={() => handleEdit(item.id)}
                >
                  編集する
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DishesList;
