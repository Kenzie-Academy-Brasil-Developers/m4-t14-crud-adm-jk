import { Router } from "express";
import { 
    createUserController, 
    deleteUserController, 
    editUserController, 
    getAllUsersController, 
    getUserProfileController, 
    userRecoverController} from "../controllers/users.controllers";
import { createUserSchema, editUserSchema } from "../schemas/users.schemas";
import { dataValidationMiddleware } from '../middlewares/dataValidation'
import tokenValidationMiddleware  from '../middlewares/tokenValidation.middleware'
import userValidationMiddleware from '../middlewares/userValidation.middleware'
import isAdminMiddleware from '../middlewares/isAdmin.middleware'
import isUserActiveMiddleware from '../middlewares/isUserActive.middleware'

const userRoutes: Router = Router();

userRoutes.post('', dataValidationMiddleware(createUserSchema), createUserController);
userRoutes.get('', tokenValidationMiddleware, isAdminMiddleware, getAllUsersController);
userRoutes.get('/profile', tokenValidationMiddleware, getUserProfileController);
userRoutes.patch('/:id',tokenValidationMiddleware, dataValidationMiddleware(editUserSchema), userValidationMiddleware, editUserController);
userRoutes.put('/:id/recover', tokenValidationMiddleware, isAdminMiddleware, userValidationMiddleware, isUserActiveMiddleware, userRecoverController);
userRoutes.delete('/:id', tokenValidationMiddleware, userValidationMiddleware, deleteUserController)

export default userRoutes;
