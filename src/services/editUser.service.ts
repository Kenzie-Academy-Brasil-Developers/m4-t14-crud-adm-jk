import { QueryConfig, QueryResult } from "pg"
import { IUserRequest, IUserWithoutPassword } from '../interfaces/users.interfaces'
import { client } from '../database'
import { returnUserSchemaWithoutPassword } from "../schemas/users.schemas";
import format from "pg-format";


const editUserService = async (userId: number, userData: IUserRequest): Promise<IUserWithoutPassword> =>{
    
    const queryString: string = format(`
        UPDATE
            users
        SET
            (%I) = ROW(%L)
        WHERE
            id = $1
        RETURNING*;
    `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    };

    const queryResult: QueryResult = await client.query(queryConfig)

    const newUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);

    return newUser

};

export default editUserService;
