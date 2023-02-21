import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const tokenValidationMiddleware = async (req: Request, resp: Response, next: NextFunction): Promise<void> =>{

    let token = req.headers.authorization

    if(!token){
        throw new AppError('Token is missing', 401)
    };

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
        if(error){
            throw new AppError(error.message, 401)
        }

        req.user = {
            id: parseInt(decoded.sub),
            admin: decoded.admin
        }
      
    })

    return next()
};

export default tokenValidationMiddleware;
