import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from '../database'
import { AppError } from '../errors'

const userValidationMiddleware = async (req: Request, resp: Response, next: NextFunction): Promise <Response|void> =>{

    const userId: number = parseInt(req.params.id)

    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1;
    `

    const queryConfig: QueryConfig ={
        text: queryString,
        values: [userId]
    };

    const queryResult: QueryResult = await client.query(queryConfig)

    if(queryResult.rowCount === 0){
        throw new AppError('User not found!', 404)
    }

    if(req.user.id != userId){
        throw new AppError('Insufficient Permission', 403)
    }

    return next();
}

export default userValidationMiddleware;
