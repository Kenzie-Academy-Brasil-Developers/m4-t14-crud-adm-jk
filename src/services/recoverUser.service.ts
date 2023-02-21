import { QueryConfig } from "pg";
import { client } from '../database'
import { AppError } from "../errors";
import { IUserResult, IUserWithoutPassword } from "../interfaces/users.interfaces";
import { returnUserSchemaWithoutPassword } from "../schemas/users.schemas";

const recoverUserService = async (userId: number): Promise<IUserWithoutPassword> =>{
    
    const queryString: string = `
        UPDATE
            users
        SET
            active = true
        WHERE
            id = $1
        RETURNING*;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    };

    const queryResult: IUserResult = await client.query(queryConfig);

    const newUser = returnUserSchemaWithoutPassword.parse(queryResult.rows[0]);

    if(newUser.active === true){
        throw new AppError('User already active', 400)
    }

    return newUser
};

export default recoverUserService;
