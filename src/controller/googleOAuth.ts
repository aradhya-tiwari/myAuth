import { Context } from "hono";



export function googleAuth(c: Context) {
    const url = `
    https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${c.env.REDIRECT_URI}&client_id=${c.env.GOOGLE_CLIENT_ID}&access_type=offline&response_type=code&prompt=consent&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email& flowName=GeneralOAuthFlow
    `
    return url
}

export async function getGoogleAccessToken(c: Context, code: String | undefined) {
    const AccessTokenUrl = "https://oauth2.googleapis.com/token";
    const AccessTokenProps: any = {
        code,
        client_id: c.env.GOOGLE_CLIENT_ID,
        client_secret: c.env.GOOGLE_CLIENT_SECRETE,
        redirect_uri: c.env.REDIRECT_URI,
        grant_type: "authorization_code"
    }

    let url = AccessTokenUrl

    for (let i in AccessTokenProps) {
        url += `${i}=${AccessTokenProps[i]}&`
    }
    // console.log(url)
    let fetchh = await fetch(url, {
        method: "POST",
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    })
}

/**
 * http://localhost:8787/authToken?
 * code=4%2F0ATx3LY69f4coAsV7IQI-w9MiZVFgkDp8HpWEcml0StfdzzmTqTu3YIOUe_xvpn0i-5x2-Q&
 * scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email
 * &authuser=0&prompt=consent
 */