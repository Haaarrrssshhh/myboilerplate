import { Document } from "mongoose";


interface User{
    name:string,
    username:string,
    password:string
}

export type TUser = {
    email:string,
    username:string,
    password:string,
}

export interface IUser extends TUser, Document {}

export default User;