import { Hono } from 'hono'
import { AuthUser } from '../middleware/auth'

const app = new Hono()

app.get('/', AuthUser, (c) => {
    return c.text('Hello API!')
})

export { app }