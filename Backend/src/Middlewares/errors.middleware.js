import { ApiError} from "../Utils/index.js"

const notFound = (req,res,next) => {
    const error = new ApiError(404,`Not Found! - ${req.originalUrl}`);
    res.status(404)
    next(error)
}

export {notFound}