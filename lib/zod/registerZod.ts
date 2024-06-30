import { z } from 'zod'

export const manualSignup = z.object(
    {
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    }
)
export const manualLogin = z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string()
})
export type manualSignupType = z.infer<typeof manualSignup>
