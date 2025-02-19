const responseHandler = (req, res, next) => {
    res.success = (data, message = "Successfully") => {
        res.json({
            status: "success",
            message,
            data
        });
    };

    res.error = (message = "Failure", errorCode = 500) => {
        res.status(errorCode).json({
            status: "error",
            message,
            errorCode
        });
    };

    next();
};

module.exports = responseHandler;
