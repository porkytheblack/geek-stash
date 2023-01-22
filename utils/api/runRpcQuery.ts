import jwt from "jsonwebtoken"

/**
 * @name runRpcQuery 
 * @param {string} queryName
 * @param {object} queryData
 * 
 */

import axios from "axios"

export const runRpcQuery = async (queryName: string, queryData: object): Promise<any> => {
    return new Promise((res, rej)=>{
        axios.post(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/${queryName}`, queryData, {
            headers: {
                "apikey": `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
            }
        }).then(({data})=>{
            res(data)
        }).catch((e)=>{
            rej(e)
        })
    })
    
}

/**
 * @name signJwtToken 
 * @param {object} payload
 * @description Signs a jwt token
 * @returns {Promise<string>} token
 */

export const signJwtToken = async (payload: object): Promise<string> => new Promise((res, rej)=>{
    jwt.sign(payload, `${process.env.signing_secret}`, {
        
    }, (err, token) => {
        err && rej(err)
        token && res(token)
    })
})

/**
 * @name verifyJwtToken
 * @param {string} token
 * @description Verifies a jwt token
 * @returns {Promise<object>} payload
 */

export const verifyJwtToken = async (token: string): Promise<jwt.JwtPayload | string> => new Promise((res, rej)=>{
    jwt.verify(token, `${process.env.signing_secret}`, (err, payload)=>{
        err && rej(err)
        payload && res(payload)
    })
})

/**
 * @name getPayloadFromToken
 * @param {string} token
 * @description Gets the payload from a jwt token
 * @returns {Promise<object>} payload
 */

export const getPayloadFromToken = async (token: string): Promise<jwt.JwtPayload | string> => new Promise((res, rej)=>{
    const payload = jwt.decode(token, {
        complete: true
    })
    payload && res(payload.payload)
    !payload && rej("No payload found")
})

