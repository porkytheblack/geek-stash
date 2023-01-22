import { runRpcQuery } from './../../../utils/api/runRpcQuery';
import { isEmpty } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '../../../middleware/withAuth';



export function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query as unknown as { id: string }

    if(isEmpty(id)) return res.status(400).json({
        message: "Bad request",
        data: null,
        status: 400
    })


    runRpcQuery("update_key_status", {
        _id: id,
        _status: "deleted"
    }).then(()=>{
        res.status(200).json({
            message: "Key deactivated",
            data: null,
            status: 200
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