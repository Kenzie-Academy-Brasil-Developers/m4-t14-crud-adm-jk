import { QueryResult } from "pg";
import { z } from 'zod'
import { createUserSchema, returnAllUsers, returnUserSchema } from '../schemas/users.schemas'

type IUserRequest = z.infer<typeof createUserSchema>

type IUser = z.infer<typeof returnUserSchema>

type IUserWithoutPassword = Omit<IUser, 'password'>;
type IUserResult = QueryResult<IUserWithoutPassword>;
type IUserWithPassword = QueryResult<IUser>

type IAllUsers = z.infer<typeof returnAllUsers>;

export{
    IUserRequest,
    IUser,
    IUserWithoutPassword,
    IUserWithPassword,
    IUserResult,
    IAllUsers
};
