import { Hono } from 'hono'
import { app as api } from './routes/api'
import { validateRegister } from './middleware/validateRegister'
import type { Variables } from './types/honoVars'
// import * as dotenv from 'dotenv'
// dotenv.config()

type Bindings = {
  production: boolean
}


const app = new Hono<{ Bindings: Bindings }>()

app.route('/api', api)

app.get('/', (c) => {

  console.log("console.log(console.log())")
  if (c.env.production === true)
    return c.text('Hello Hono! Production Server')
  else
    return c.text("Hello Hono Dev Server " + c.env.production)

})

// Signup Route 

app.post('/register', validateRegister, async (c) => {
  const body = await c.req.json()
  let resp = c.var.creden
  return c.json(resp)


})
export default app
