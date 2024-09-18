import { ApiError} from "../Utils/index.js"

const notFound = (req,res,next) => {
    const error = new ApiError(404,`Not Found! - ${req.originalUrl}`);
    res.status(404)
    next(error)
}

const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message,
        success: err.success,
        errors: err.errors,
        stack: process.env.DEBUG === 'TRUE' ? err.stack : undefined,
      });
    } else {
      res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
        success: false,
        errors: [],
      });
    }
  };

export {notFound,errorMiddleware}