import { Request, Response } from "express";
import { CustomError } from "./Error";
import Log from "./Log";

class IResponse{

    sendResponse(req:Request,res:Response,controller:Function){
        try {
            let data = controller(req,res);
            Log.info(`${req.method}: ${req.originalUrl}`)
            res.status(200).json({
                error: false,
                data:data,
            });
        } catch (error:CustomError | any) {
            Log.error(error.message)
            res.status(error.code || 500).json({
                error: true,
                data:error,
            });
        }
    }
}

export default new IResponse;