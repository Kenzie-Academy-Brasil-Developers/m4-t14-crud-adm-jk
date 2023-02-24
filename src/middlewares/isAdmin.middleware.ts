import { Request, Response, NextFunction } from "express";
import { AppError } from '../errors'

const isAdminMiddleware = (req: Request, resp: Response, next: NextFunction) => {

    if(!req.user.admin){
        throw new AppError('Insufficient permission', 401)
    };

    next();
};

export default  isAdminMiddleware
;