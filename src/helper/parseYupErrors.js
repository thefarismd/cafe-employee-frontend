function parseYupErrors(validationError) {
    const errors = {};

    if (validationError.inner) {
        validationError.inner.forEach((err) => {
            if (err.path && err.message) {
                errors[err.path] = err.message;
            }
        });
    }

    return errors;
}

export { parseYupErrors };