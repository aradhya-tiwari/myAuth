import { Kysely } from "kysely";
import { DB } from "../../lib/db/db";
import { Context } from "hono";
import { manualSignup } from "../../lib/zod/registerZod";
import type { manualSignupType } from "../../lib/zod/registerZod";
import { sign } from "hono/jwt";



export const Login = async (c: Context, body: manualSignupType) => {
    console.log("Login function hit")
    let start = Date.now()

    const db = new DB(c.env.TURSO_URL, c.env.TURSO_TOKEN)

    let stmt = db.qry.selectFrom('users')
        .select(['id', 'email', 'other_data', 'username'])
        .where('username', '=', body.username)
        .where('password', '=', body.password).limit(100).compile()

    let op;
    try {
        op = await db.execute(stmt)
    } catch (e) { console.log("Problem with Getting user") }

    let end = Date.now()

    if (op?.rows[0]) {

        console.log(op?.rows)
        const jwt = await sign(body, c.env.JWT_KEY)

        console.log("Success")
        // TODO: REmove body from request body
        return <any>{ sucess: true, body: op.rows, jwt, response_time: end - start }
    }
    else {

        console.log("User Not Found");
        return <any>{ success: false, response_time: end - start }
    }
}       