import { Request, Response, Router } from "express";
import Auth from "../controllers/Auth";
import IResponse from "../custom/IResponse";


class AuthRoutes{
    public routes:Router= Router();
    
    constructor(){
        this.routes.get("/get",(req:Request,res:Response)=>IResponse.sendResponse(req,res,(req:Request,res:Response)=>Auth.getUser(req,res)));
        this.routes.post("/login",(req:Request,res:Response)=>IResponse.sendResponse(req,res,(req:Request,res:Response)=>Auth.login(req,res)));
        this.routes.post("/createUser",(req:Request,res:Response)=>IResponse.sendResponse(req,res,(req:Request,res:Response)=>Auth.createUser(req,res)));
    }
}

export default new AuthRoutes;