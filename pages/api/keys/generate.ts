import { runRpcQuery, signJwtToken } from './../../../utils/api/runRpcQuery';
import { withAuth } from './../../../middleware/withAuth';
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

function handler (req: NextApiRequest, res: NextApiResponse){
    const { 
        user_id
    } = req.headers
    

    runRpcQuery("create_new_api_key", {
        u_id: user_id
    }).then((ref_id)=>{
        signJwtToken({
            sub: ref_id,
            status: "active"
        }).then((token)=>{
            runRpcQuery("add_key", {
                _id: ref_id,
                _key: token
            }).then(()=>{
                res.status(200).json({
                    message: "Key generated",
                    data: token,
                    status: 200
                })
            }).catch((e)=>{
                res.status(500).json({
                    message: e.message,
                    data: null,
                    status: 500
                })
            })
        }).catch((e)=>{
            res.status(500).json({
                message: e.message,
                data: null,
                status: 500
            })
        })
    }).catch((e)=>{
        res.status(500).json({
            message: e.message,
            data: null,
            status: 500
        })
    })

    
     

}

export default withAuth(handler)

export const config = {
    api: {
        externalResolver: true
    }
}