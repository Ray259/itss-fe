import api from '@configs/axios';
import { UPDATE_USER_ENDPOINT } from '@configs/api-endpoints';
import { getAccessToken } from '@utils/auth';

export interface UserPreferencesRequest {
    address: string;
    hated_flavor: string[];
    loved_distinct: number;
    loved_flavor: string[];
    loved_price: number;
    vegeterian: boolean;
}

export const updatePreferences = async (id: string, body: UserPreferencesRequest) => {
    try {
        const token = getAccessToken();
        const response = await api.patch(`${UPDATE_USER_ENDPOINT}/${id}`, body, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
};