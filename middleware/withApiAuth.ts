import { verifyJwtToken } from './../utils/api/runRpcQuery';
import { NextApiHandler, NextApiResponse, NextApiRequest } from 'next';


export function withApiAuth( handler: NextApiHandler ) : NextApiHandler  {
    return (req: NextApiRequest, res: NextApiResponse) => {

        const { authorization } = req.headers

        if( !authorization ) return res.status(401).json({
            message: "Unauthorized",
            data: null,
            status: 401
        })

        const token = authorization.split(" ")[1]

        verifyJwtToken(token).then((payload)=>{
            const  api_key_id = payload.sub
            req.headers.api_key_id = api_key_id as string
            handler(req, res)
        }).catch((e)=>{
            res.status(401).json({
                message: "Unauthorized",
                data: e,
                status: 401
            })
        })

        
    }
}