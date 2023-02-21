import { hashSync } from 'bcryptjs';
import { z } from 'zod'

const createUserSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().max(100).email(),
    password: z.string().max(120).transform((pass) =>{
        return hashSync(pass, 10)
    })
});

const editUserSchema = z.object({
    name: z.string().min(3).max(20).optional(),
    email: z.string().max(100).email().optional(),
    password: z.string().max(120).optional()
})

const returnUserSchema = createUserSchema.extend({
    id: z.number(),
    admin: z.boolean(),
    active: z.boolean()
});

const returnUserSchemaWithoutPassword = returnUserSchema.omit({password: true})

const returnAllUsers = z.array(returnUserSchemaWithoutPassword)

export { createUserSchema, returnUserSchema, returnUserSchemaWithoutPassword, returnAllUsers, editUserSchema };
