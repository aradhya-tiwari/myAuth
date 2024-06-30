import { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
export async function AuthUser(c: Context, next: any) {

    let authCookie = getCookie(c, "auth")

    if (authCookie) {
        console.log("Cookie: " + authCookie)
        await next()
    }
    else {
        return c.redirect('/losgin', 301)
    }

}