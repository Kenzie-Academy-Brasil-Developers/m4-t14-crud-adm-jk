import { Request, Response, NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from '../errors'

const isUserActiveMiddleware = async (req: Request, resp: Response, next: NextFunction) => {
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

    if(queryResult.rows[0].active){
        throw new AppError('User already active', 400)
    };


    next();
};

export default isUserActiveMiddleware;