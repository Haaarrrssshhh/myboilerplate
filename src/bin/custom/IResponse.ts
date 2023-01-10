import { Request, Response } from "express";
import { CustomError } from "./Error";
import Log from "./Log";

class IResponse{

    async sendResponse(req:Request,res:Response,controller:Function){
        try {
            let data = await controller(req,res);
            Log.info(`${req.method}: ${req.originalUrl}`)
            res.status(200).json({
                error: false,
                data:data,
            });
        } catch (error:CustomError | any) {
            console.log("here",typeof error);
            
            Log.error(error.message)
            res.status(error.code || 500).json({
                error: true,
                data:error,
            });
            
        }
    }
}

export default new IResponse;