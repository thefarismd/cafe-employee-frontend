// Centralized error handler function
function handleApiError(error, defaultMessage) {
    console.error('API Error:', error);

    if (error.response && error.response.data) {
        const backendError = error.response.data;
        if (backendError.errors && backendError.errors.length > 0) {
            throw new Error(backendError.errors.join('\n'));
        } else if (backendError.message) {
            throw new Error(backendError.message);
        } else {
            throw new Error(defaultMessage);
        }
    } else {
        throw new Error('Network error. Please check your connection.');
    }
}

export { handleApiError };