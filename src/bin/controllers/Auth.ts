import { Request, Response } from "express";
import User from "../interfaces/User";
import DefinedErrors, { CustomError } from '../custom/Error'
import Log from "../custom/Log";


class Auth {
   public user:User | undefined={name:"test",username:"test",password:"123"};
   constructor(){
   }

   public login(req:Request,res:Response):Object{
        let body = req.body;
        if(!body.username || !body.password) throw DefinedErrors.dataInvalid;

        if(!(body.username == this.user?.username) || !(body.password == this.user?.password)) throw DefinedErrors.authFailed;
        return {
            message:"Logged In Successfully"
        }
   }

   public getUser(req:Request,res:Response):any{
            if(!this.user) throw DefinedErrors.authFailed;

            return this.user;
   }
}
export default new Auth;