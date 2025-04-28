import axios from 'axios';
import { handleApiError } from '../helper/apiErrorHandler';

async function getEmployees(cafe) {
    try {
        const response = await axios.get('/api/employees', {
            params: { cafe },
        });

        return response.data;
    } catch (error) {
        handleApiError(error, 'Unable to fetch list');
        return []; 
    }
}

async function deleteEmployee(employeeId) {
    try {
        await axios.delete('/api/employees', {
            data: { id: employeeId },
        });
        return true;
    } catch (error) {
        handleApiError(error, 'Failed to delete employee.');
    }
}

async function addEmployee(employee) {
    try {
        await axios.post('/api/employees', employee);
        return true;
    } catch (error) {
        handleApiError(error, 'Failed to add employee.');
    }
}

async function updateEmployee(employee) {
    try {
        await axios.put('/api/employees', employee);
        return true;
    } catch (error) {
        handleApiError(error, 'Failed to update employee.');
    }
}

export { getEmployees, deleteEmployee, addEmployee, updateEmployee };
