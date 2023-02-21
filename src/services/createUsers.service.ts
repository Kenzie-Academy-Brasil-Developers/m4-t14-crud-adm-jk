import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { AppError } from "../errors";
import { IUserRequest, IUserResult, IUserWithoutPassword } from "../interfaces/users.interfaces";
import { returnUserSchemaWithoutPassword } from '../schemas/users.schemas'

const createUserService = async (userData: IUserRequest): Promise<IUserWithoutPassword> => {

    const queryEmailExists: string = `
        SELECT 
            *
        FROM
            users
        WHERE
            email = $1;
    `

    const queryConfigEmailExists: QueryConfig = {
        text: queryEmailExists,
        values:[userData.email]
    };

    const queryResultEmailExists: QueryResult = await client.query(queryConfigEmailExists);

    if(queryResultEmailExists.rowCount > 0){
        throw new AppError('Email already registered!', 409)
    };

    const queryString: string = format(`
        INSERT INTO
            users(%I)
            VALUES(%L)
        RETURNING *;
    `,
        Object.keys(userData),
        Object.values(userData)
    );

    const queryResult: IUserResult = await client.query(queryString);

    const newUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0])
    
    return newUser
}

export default createUserService;
