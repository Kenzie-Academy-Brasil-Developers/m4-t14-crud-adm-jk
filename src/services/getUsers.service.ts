import { IAllUsers, IUserResult } from '../interfaces/users.interfaces'
import { client } from "../database";
import { returnAllUsers } from '../schemas/users.schemas';

const getAllUsersService = async (): Promise<IAllUsers> => {

    const queryString: string = `
        SELECT
            *
        FROM
            users;
    `

    const queryResult: IUserResult = await client.query(queryString);

    const newUser = returnAllUsers.parse(queryResult.rows);

    return newUser;

};


export default getAllUsersService;
