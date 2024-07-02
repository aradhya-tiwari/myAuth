import { Context } from "hono";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";

export function googleAuth(c: Context) {
    const url = `
    https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${c.env.REDIRECT_URI}&client_id=${c.env.GOOGLE_CLIENT_ID}&access_type=offline&response_type=code&prompt=consent&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email& flowName=GeneralOAuthFlow
    `
    return url
}




export async function getGoogleAccessToken(c: Context, code: String | undefined) {

    try {
        const AccessCodeUrl = "https://oauth2.googleapis.com/token";
        const AccessCodeProps: any = {
            code,
            client_id: c.env.GOOGLE_CLIENT_ID,
            client_secret: c.env.GOOGLE_CLIENT_SECRETE,
            redirect_uri: c.env.REDIRECT_URI,
            grant_type: "authorization_code"
        }


        let body = ''
        for (let i in AccessCodeProps) {
            body += `${i}=${AccessCodeProps[i]}&`
        }

        let access_token = '', id_token = ''

        let fetchh = await fetch(AccessCodeUrl, {
            method: "POST",
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json",
            },
            body: JSON.stringify(AccessCodeProps)
        })

        let fetchResp: any = await fetchh.json()

        access_token = fetchResp.access_token
        id_token = fetchResp.id_token
        console.log(access_token, id_token)


        const userInfoUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`

        fetchh = await fetch(userInfoUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${id_token}`
            }
        })
        fetchResp = await fetchh.json()

        let payload = {
            id: fetchResp.id,
            email: fetchResp.email,
            picture: fetchResp.picture,
            name: fetchResp.name
        }
        let jwt = await sign(payload, c.env.JWT_KEY)
        setCookie(c, 'authCookie', jwt)
        return (fetchResp)

    } catch (e) {
        console.error("problem getting access_token from oauth.google", e)
    }

}

/**
 * http://localhost:8787/authToken?
 * code=4%2F0ATx3LY69f4coAsV7IQI-w9MiZVFgkDp8HpWEcml0StfdzzmTqTu3YIOUe_xvpn0i-5x2-Q&
 * scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email
 * &authuser=0&prompt=consent
 */