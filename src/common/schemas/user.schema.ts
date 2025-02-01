import { z } from "zod";

export const UserLoginSchema = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(3, 'Password minimal 3 karakter')
})

export type UserLoginDto = z.infer<typeof UserLoginSchema>