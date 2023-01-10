import e from "express";
import { Server, Socket } from "socket.io";
import DefinedErrors ,{ CustomError } from "../custom/Error";
import Log from "../custom/Log";
import { IUser } from "../interfaces/User";
import User from "../models/User";
import Rooms from "./Rooms";


export default class ISocket{
    socket:Socket | undefined;
    rooms:Rooms[] = [];
    io:Server;

    constructor(socket:Socket,io:Server,rooms:Rooms[]){
        this.socket = socket;
        this.io = io;
        this.rooms = rooms;
        this.listeners();
    }
    

    listeners(){
        if(this.socket){
            this.socket.on("join",(data)=>{
                this.checkResponse(data,this.joinOrCreateRoom);
            });

            this.socket.on("disconnect",()=>{
                Log.info(`User left the room`)
                const rooms = this.io.of("/").adapter.rooms;
                console.log(rooms)
            })
        }
    }

    async joinOrCreateRoom(data:any,self:this){
        if(!data?.userId) throw DefinedErrors.dataInvalid;
        let user:IUser | null = await User.findById(data.userId);
        if(!user) throw DefinedErrors.authFailed;
        let room:Rooms | undefined = self.rooms.find((_room:Rooms)=>_room.name == "room1");

        if(!room){
            room = new Rooms("room1");
            room.addUser(user);
        }
        else{
            room.addUser(user);
        }
        Log.info(`User Connected in room`)
        self.io.to("room1").emit("new-user","New User Connected");
        self.socket?.join("room1");
    }

    async checkResponse(body:any,controller:Function){
        try{
           await controller(body,this);
        }
        catch(error:CustomError|any){
            this.sendError(error);
        }
    }

    sendError(error:CustomError){
        Log.error(error.message);
        let res = {
            error:true,
            data:error
        }
        this.socket?.emit("error",res);
    }
}
