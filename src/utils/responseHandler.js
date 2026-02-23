export const successResponse = (res, message, data = null, statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

export const errorResponse = (res, message, statusCode = 500) => {
    res.status(statusCode).json({
        ok: false,
        error: message
    });
};