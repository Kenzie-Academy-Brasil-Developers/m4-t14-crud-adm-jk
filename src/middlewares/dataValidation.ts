import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const dataValidationMiddleware = (schema: ZodTypeAny) => (req: Request, resp: Response, next: NextFunction) => {
    
    const validateData = schema.parse(req.body)
    
    req.body = validateData

    next();
};

export { dataValidationMiddleware };
