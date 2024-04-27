import { Hono } from 'hono'
import { app as api } from './routes/api'
import { validateRegister } from './middleware/validateRegister'
import type { Variables } from './types/honoVars'
// import { Conte }



const app = new Hono()

app.route('/api', api)

app.get('/', (c) => {
  console.log(typeof (c))

  return c.text('Hello Hono!')

})

// Signup Route 

app.post('/register', validateRegister, async (c) => {
  const body = await c.req.json()
  let resp = c.var.creden
  return c.json(resp)


})
export default app
