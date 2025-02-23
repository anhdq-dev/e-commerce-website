export const responseHandler = (res, status, action, success, message, data = null, error = null) => {
    const response = {
        status,
        action,
        success,
        message
    };

    if (data !== null) {
        response.data = data;
    }

    if (error !== null) {
        response.error = error;
    }

    return res.status(status).json(response);
};
