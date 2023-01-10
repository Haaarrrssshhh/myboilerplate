import { Request, Response } from "express";
import { IUser } from "../interfaces/User";
import DefinedErrors, { CustomError } from '../custom/Error'
import Log from "../custom/Log";
import User from "../models/User";


class Auth {
   
   constructor(){
   }

   public login(req:Request,res:Response):Object{
        let body = req.body;
        if(!body.username || !body.password) throw DefinedErrors.dataInvalid;
        return {
            message:"Logged In Successfully"
        }
   }

   public getUser(req:Request,res:Response):any{
        return null
   }

   public async createUser(req:Request,res:Response):Promise<any>{
    let body = req.body;
    if(!body.username || !body.email || !body.password) throw DefinedErrors.dataInvalid;
    
    let user:IUser = new User({
        username:body.username,
        email:body.email,
        password:body.password

    });
    await user.save()
    return user
   }
}
export default new Auth;