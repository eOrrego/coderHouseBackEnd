export const errorMiddleware = (error, req, res, next) => {
    res.send({
        status: error.status,
        message: error.message,
        cause: error.cause,
    });
};
