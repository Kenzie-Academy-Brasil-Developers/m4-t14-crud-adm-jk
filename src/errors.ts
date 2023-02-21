import { NextFunction, Response, Request } from "express";
import { ZodError } from 'zod'

class AppError extends Error {

    message: string
    statusCode: number

    constructor(message: string, statusCode: number = 400){
        super()
        this.message = message
        this.statusCode = statusCode
    }
};

const handleErrors = (error: Error, req: Request, resp: Response, next: NextFunction): Response|void => {
    if(error instanceof AppError){
        return resp.status(error.statusCode).json({
            message: error.message
        })
    };

    if(error instanceof ZodError){
        return resp.status(400).json({
            message: error.flatten().fieldErrors
        })
    };
    
    console.log(error)
    return resp.status(500).json({
        message: 'Internal server error'
    })
};

export { AppError, handleErrors };
