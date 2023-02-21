import { client } from '../database/index';
import { IUserResult, IUserWithoutPassword } from '../interfaces/users.interfaces'

const getUserService = async (userId: number): Promise<IUserWithoutPassword> =>{
    
    const queryString: string = `
        SELECT
            id, name, email, active, admin
        FROM
            users
        WHERE
            id = $1;
    `

    const queryResult: IUserResult = await client.query(queryString, [userId]);

    return queryResult.rows[0];
    
};

export default getUserService;