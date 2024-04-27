import { z } from 'zod'
import { MiddlewareHandler } from 'hono'


const registerSchema = z.object({
    name: z.string(),
    class: z.string()
})

type UserSignup = z.infer<typeof registerSchema>

type validateType = {
    Variables: {
        creden: Object
    }
}

export const validateRegister: MiddlewareHandler<validateType> = async (c, next) => {
    const usrObj = await c.req.json()
    console.log(usrObj)
    const regUser = registerSchema.safeParse(usrObj)
    c.set("creden", regUser)
    c.get("creden")

    await next()
}