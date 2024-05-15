
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong!",
        errors = [],
        stack = "",
    ) {
        super(message)
        this.statusCode = statusCode    
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        this.stack = ""

        if (process.env.DEBUG === "TRUE") {
            if (stack) {
                this.stack = stack
            }
            else {
                Error.captureStackTrace(this, this.constructor)
            }
        }

    }
}

export { ApiError }