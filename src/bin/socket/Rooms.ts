import mongoose from "mongoose";
import { IUser } from "../interfaces/User";



export default class Rooms{
    name:string;
    users:IUser[] = [];

    constructor(roomName:string){
        this.name = roomName;
    }
    
    addUser(user:IUser){
        this.users.push(user);
    }

    removeUser(userId:mongoose.ObjectId){
        this.users = this.users.filter((_user:IUser)=>_user._id != userId);
    }
}