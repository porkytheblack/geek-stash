import { runRpcQuery } from './../../../utils/api/runRpcQuery';
import { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuth } from '../../../middleware/withApiAuth';


const rpc_functions = {
    character: "api_get_characters",
    franchise: "api_get_franchises",
    gadget: "api_get_gadgets",
    place: "api_get_places",
    species: "api_get_species",
    fights: "api_get_fights",
}



function handler (req: NextApiRequest, res: NextApiResponse) {
    const api_key_id = req.headers.api_key_id as string
    const { type, id, start, size } = req.query as unknown as  {
        type: keyof typeof rpc_functions,
        id: string,
        start: string,
        size: string
    }

    runRpcQuery(rpc_functions[type], {
        _id: id || null,
        _start: start || 0,
        _size: size || 10,
    }).then(async (data)=>{
        runRpcQuery("log_api_usage", {
            _key: api_key_id,
            _status: "success",
        }).then(()=>{
            res.status(200).json({
                message: "Data fetched",
                data: data,
                status: 200
            })
        }).catch((e)=>{
            console.log(e)
            res.status(200).json({
                message: "Data fetched",
                data: {
                    error: "Failed to log api usage",
                },
                status: 400
            })
        })
        
    }).catch((e)=>{
        console.log(e)
        res.status(500).json({
            message: e.message,
            data: null,
            status: 500
        })
    })





}   

export default withApiAuth(handler)

export const config  = {
    api: {
        externalResolver: true
    }
}