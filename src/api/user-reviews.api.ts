import api from '@configs/axios';
import { GET_DISH_REVIEWS_ENDPOINT, CREATE_DISH_REVIEW_ENDPOINT } from '@configs/api-endpoints';

// Hàm lấy reviews cho món ăn
export const getDishReviews = async (dishId: string) => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await api.get(GET_DISH_REVIEWS_ENDPOINT.replace('{dish_id}', dishId), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('API response:', response.data); // Log phản hồi từ API

        // Đảm bảo rằng response.data.reviews là một mảng
        if (!Array.isArray(response.data.reviews)) {
            throw new Error('Expected an array of reviews');
        }

        return response.data.reviews;
    } catch (error: any) {
        throw new Error(`Failed to fetch dish reviews: ${error.message}`);
    }
};
// Hàm tạo review cho món ăn
export const createDishReview = async (dishId: string, review: { comment: string; rating?: number, userId: number }) => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await api.post(
            CREATE_DISH_REVIEW_ENDPOINT.replace('{dish_id}', dishId),
            {
                comment: review.comment,
                rating: review.rating,
                dish_id: dishId,
                user_id: review.userId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to create dish review: ${error.message}`);
    }
};
