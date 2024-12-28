import api from '@configs/axios';
import { USER_BASE_ENDPOINT, USER_INFO_ENDPOINT } from '@configs/api-endpoints';
import { getAccessToken } from '@utils/auth';

export interface UserPreferencesRequest {
    address: string;
    hated_flavor: string[];
    loved_distinct: number;
    loved_flavor: string[];
    loved_price: number;
    vegeterian: boolean;
}
export interface UpdateUserRequest {
    address?: string;
    email?: string;
    phone?: string;
    display_name?: string;
    dark_mode?: boolean;
    language?: string;
    font_size?: number;
    notification?: boolean;
    avatar_url?: string;
    loved_flavor?: string[];
    hated_flavor?: string[];
    loved_dish?: string[];
    vegetarian?: boolean;
    loved_distinct?: number;
    loved_price?: number;
}

export const updatePreferences = async (id: string, body: UserPreferencesRequest) => {
    try {
        const token = getAccessToken();
        const response = await api.patch(`${USER_BASE_ENDPOINT}/${id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
};
export const updateUser = async (id: number, body: UpdateUserRequest) => {
    try {
        const token = getAccessToken();
        const response = await api.patch(`${USER_BASE_ENDPOINT}/${id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
};

export const getUserInfo = async () => {
    try {
        const token = getAccessToken();
        const response = await api.get(`${USER_INFO_ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to get user info: ${error.message}`);
    }
};
