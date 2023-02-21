import { z } from 'zod'

const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export { userLoginSchema };
