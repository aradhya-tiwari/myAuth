import { Hono } from 'hono'
import { app as api } from './routes/api'
import { validateRegister } from './middleware/validateRegister'
import { Login } from './controller/login'
import { InArgs } from '@libsql/client'
import { signup } from './controller/signup'
import { Jwt } from 'hono/utils/jwt'
import { AuthUser } from './middleware/auth'
import { setCookie } from 'hono/cookie'
import { getGoogleAccessToken, googleAuth } from './controller/googleOAuth'
// import * as dotenv from 'dotenv'
// dotenv.config()

type Bindings = {
  production: boolean
  DATABASE_URL: string,
  TURSO_TOKEN: string
}

const app = new Hono<{ Bindings: Bindings }, any>()

app.route('/api', api)


app.get('/', AuthUser, (c) => {
  console.log("/route")
  return c.text("/ route")
})


// Google Auth, For redirecting it to accounts.google and it will redirect to REDIRECT_URI
app.get('/googleAuth', async (c) => {
  // console.log(googleAuth(c))
  let uri = new URL(googleAuth(c))
  return c.redirect(uri.toString())
})


// for getting auth token and setting cookie 
app.get('/authToken', async (c) => {
  const { code } = c.req.query()
  // await getGoogleAccessToken(c, code)
  return c.json(await getGoogleAccessToken(c, code))
})


// Signup Route 
app.post('/register', async (c) => {
  // console.log("register Request hit")
  const body = await c.req.json()
  const register = await signup(c, body)
  console.log("Registration Everything Done")
  return c.text("done")
})


//Login Route
app.post('/login', async (c) => {
  const body = await c.req.json()
  const login = await Login(c, body)
  return c.json(login || { msg: "error" })
})



export default app
