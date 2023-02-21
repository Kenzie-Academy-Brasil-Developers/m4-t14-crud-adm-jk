import { Request, Response } from "express";
import userLoginService from "../services/userLogin.service";

const userLoginController = async (req: Request, resp: Response): Promise<Response> =>{

    const token = await userLoginService(req.body)

    return resp.json({
        token:token
    })

};

export default userLoginController;
