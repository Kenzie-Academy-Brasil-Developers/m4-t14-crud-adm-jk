import { Response, Request } from "express";
import { IUserRequest } from "../interfaces/users.interfaces"
import createUserService from "../services/createUsers.service";
import getUserService from "../services/getUser.service";
import getAllUsersService from '../services/getUsers.service'
import deleteUserService from '../services/deleteUser.service'
import editUserService from '../services/editUser.service'
import recoverUserService from '../services/recoverUser.service'

const createUserController = async (req: Request, resp: Response): Promise<Response> =>{
    const userData: IUserRequest = req.body;

    const newUser = await createUserService(userData);

    return resp.status(201).json(newUser);
};

const getAllUsersController = async (req: Request, resp: Response): Promise<Response> =>{
    const users = await getAllUsersService();

    return resp.json(users);
};

const getUserProfileController = async (req: Request, resp: Response): Promise<Response> => {
    const userId = Number(req.user.id);
    
    const userData = await getUserService(userId);

    return resp.status(200).json(userData);
}

const deleteUserController = async (req: Request, resp: Response): Promise<Response> =>{
    const userId: number = parseInt(req.params.id);

    await deleteUserService(userId);

    return resp.status(204).send();
};

const editUserController = async (req: Request, resp: Response): Promise<Response> =>{
    const userId: number = parseInt(req.params.id);

    const newUser = await editUserService(userId, req.body);

    return resp.status(200).json(newUser);
};

const userRecoverController = async (req: Request, resp: Response): Promise<Response> =>{
    const userId: number = parseInt(req.params.id);

    const activatedUser = await recoverUserService(userId);

    return resp.status(200).json(activatedUser);
};

export {
    createUserController,
    getAllUsersController,
    getUserProfileController,
    deleteUserController,
    editUserController,
    userRecoverController
}
