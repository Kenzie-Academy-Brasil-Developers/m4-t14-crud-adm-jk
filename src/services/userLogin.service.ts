import { QueryConfig } from "pg";
import { client } from "../database";
import { ILoginRequest } from "../interfaces/login.interfaces";
import { IUserWithPassword } from '../interfaces/users.interfaces'
import { AppError } from '../errors';
import  jwt  from "jsonwebtoken";
import { compare } from "bcryptjs";
import 'dotenv/config'

const userLoginService = async (loginData: ILoginRequest): Promise<string> => {
    
    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            email = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [loginData.email]
    };

    const queryResult: IUserWithPassword = await client.query(queryConfig)

    
    if(queryResult.rowCount == 0){
        throw new AppError('Wrong email or password', 401)
    };

   
    const verifyPassword: boolean = await compare(loginData.password, queryResult.rows[0].password) 

    if(!verifyPassword){
        throw new AppError('Wrong email or password', 401)
    }

    const token: string = jwt.sign(
        {
            admin: queryResult.rows[0].admin
        },
            process.env.SECRET_KEY!,
        {
            expiresIn: '24h',
            subject: queryResult.rows[0].id.toString()
        }
    );

    return token
};

export default userLoginService;