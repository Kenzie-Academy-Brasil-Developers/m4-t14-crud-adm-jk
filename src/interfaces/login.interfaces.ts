import { userLoginSchema } from "../schemas/login.schema";
import { z } from 'zod'

type ILoginRequest = z.infer<typeof userLoginSchema>;

export { ILoginRequest };
