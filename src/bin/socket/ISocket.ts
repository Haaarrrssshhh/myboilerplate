import { Server, Socket } from "socket.io";
import Log from "../custom/Log";


export default class ISocket{
    socket:Socket | undefined;
    io:Server;

    constructor(socket:Socket,io:Server){
        this.socket = socket;
        this.io = io;
        this.listeners();
    }
    

    listeners(){
        if(this.socket){
            this.socket.on("join",()=>{
                Log.info(`User Connected in room`)
                this.io.to("room1").emit("new-user","New User Connected");
                this.socket?.join("room1");
            });

            this.socket.on("disconnect",()=>{
                Log.info(`User left the room`)
                const rooms = this.io.of("/").adapter.rooms;
                console.log(rooms)
            })
        }
    }
}
