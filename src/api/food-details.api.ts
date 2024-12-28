import api from '@configs/axios';
import { FOOD_DETAILS_ENDPOINT } from '@configs/api-endpoints';

export const getFoodDetailsById = async (id: string) => {
    try {
        const response = await api.get(`${FOOD_DETAILS_ENDPOINT}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch food details: ${error.message}`);
    }
};

export const searchDishes = async (nameKeyword: string, page = 1, perPage = 10) => {
    try {
        const response = await api.get(FOOD_DETAILS_ENDPOINT, {
            params: { per_page: perPage, page, name_keyword: nameKeyword },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to search dishes: ${error.message}`);
    }
};
