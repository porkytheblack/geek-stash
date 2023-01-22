import { isUndefined } from 'lodash';


/**
 * @name withAuth
 * @description wrapper for next handler that checks if the user is authenticated
 * @param {NextApiHandler} handler
 * @returns {NextApiHandler}
 */

import { isEmpty } from "lodash";
import { NextApiHandler } from "next";
import { getPayloadFromToken } from "../utils/api/runRpcQuery";

export const withAuth = (handler: NextApiHandler): NextApiHandler => {
    return async (req, res) => {
        const { authorization, Authorization } = req.headers

        authorization && getPayloadFromToken(authorization.split(" ")[1]).then((payload)=> {
            console.log("payload::", payload)
            const { role, sub: user_id } = payload as { role: string, sub: string }
            if( role !== "authenticated" || isEmpty(user_id) || isUndefined(user_id)  ) return res.status(401).json({
                message: "Unauthorized",
                data: null,
                status: 401
            })


            req.headers.user_id = user_id

            return handler(req, res)

        })

        isUndefined(authorization) && res.status(401).json({
            message: "Unauthorized",
            data: null,
            status: 401
        })

    }
}