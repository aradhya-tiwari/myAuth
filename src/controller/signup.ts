import { Kysely } from "kysely";
import { DB } from "../../lib/db/db";
import { Context } from "hono";
import { manualSignup } from "../../lib/zod/registerZod";
import type { manualSignupType } from "../../lib/zod/registerZod";


const insertUser = async (body: manualSignupType) => {

}

export const signup = async (c: Context, body: manualSignupType) => {
    console.log("Signup function hit")
    let start = Date.now()
    // Validating Request body
    let validation = manualSignup.safeParse(body)

    if (validation.success) console.log("User Validation success")
    else {
        console.log(validation.error);
        return validation.error
    }


    // Inserting Users

    console.log("Insertion user function hit")

    const db = new DB(c.env.TURSO_URL, c.env.TURSO_TOKEN)

    let stmt = db.qry.insertInto('users').values({
        username: body.username,
        email: body.email,
        password: body.password
    }).compile()

    let op = await db.execute(stmt)

    let end = Date.now()
    console.log("registration Done in " + (end - start))
}