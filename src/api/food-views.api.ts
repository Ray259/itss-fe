import api from '@configs/axios';
import { SUGGESTED_DISHES_ENDPOINT } from '@configs/api-endpoints';
import { DISHES_ENDPOINT } from '@configs/api-endpoints';

export const getSuggestedDishes = async ({ per_page, page }: { per_page: number; page: number }) => {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            throw new Error('No authentication token found');
        }

        const response = await api.get( `${SUGGESTED_DISHES_ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                per_page,
                page,
            },
        });

        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to fetch suggested dishes: ${error.message}`);
    }
};


export const getDishes = async ({ per_page, page }: { per_page: number; page: number }) => {
    try {
        // Gọi API mà không cần authorization
        const response = await api.get(DISHES_ENDPOINT, {
            params: {
                per_page,
                page,
            },
        });

        return response.data;
    } catch (error: any) {
        throw new Error(`Failed to fetch dishes: ${error.message}`);
    }
};
