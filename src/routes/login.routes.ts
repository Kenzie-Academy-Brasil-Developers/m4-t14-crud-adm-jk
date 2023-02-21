import { Router } from "express";
import userLoginController  from '../controllers/login.controller'
import { dataValidationMiddleware } from "../middlewares/dataValidation";
import { userLoginSchema } from "../schemas/login.schema";

const loginRoutes: Router = Router();

loginRoutes.post('', dataValidationMiddleware(userLoginSchema), userLoginController);

export default loginRoutes;
