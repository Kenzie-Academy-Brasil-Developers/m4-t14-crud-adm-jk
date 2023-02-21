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

const userRoutes: Router = Router();

userRoutes.post('', dataValidationMiddleware(createUserSchema), createUserController);
userRoutes.get('', tokenValidationMiddleware, getAllUsersController);
userRoutes.get('/profile', tokenValidationMiddleware, getUserProfileController);
userRoutes.patch('/:id',tokenValidationMiddleware, dataValidationMiddleware(editUserSchema), userValidationMiddleware, editUserController);
userRoutes.put('/:id/recover', tokenValidationMiddleware, userValidationMiddleware, userRecoverController);
userRoutes.delete('/:id', tokenValidationMiddleware, userValidationMiddleware, deleteUserController)

export default userRoutes;
