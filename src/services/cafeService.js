import axios from 'axios';
import { handleApiError } from '../helper/apiErrorHandler';

async function getCafes(location) {
    try {
        const response = await axios.get('/api/cafes', {
            params: { location },
        });
        return response.data;
    } catch (error) {
        handleApiError(error, 'Unable to fetch list.')
        return [];
    }
}

async function deleteCafe(cafeId) {
    try {
        await axios.delete('/api/cafes', {
            data: { id: cafeId },
        });
        return true;
    } catch (error) {
        handleApiError(error, 'Failed to delete cafe.');
    }
}

async function addCafe(cafe) {
    try {
        await axios.post('/api/cafes', cafe);
        return true;
    } catch (error) {
        handleApiError(error, 'Failed to add cafe.');
    }
}

async function updateCafe(cafe) {
    try {
        await axios.put('/api/cafes', cafe);
        return true;
    } catch (error) {
        handleApiError(error, 'Failed to update cafe.');
    }
}

export { getCafes, deleteCafe, addCafe, updateCafe }