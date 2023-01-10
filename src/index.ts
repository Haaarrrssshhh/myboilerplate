import * as dotenv from 'dotenv'
dotenv.config()
import app from './app';
import { createServer } from "http";
import { Server } from "socket.io";
import Log from './bin/custom/Log';
import ISocket from './bin/socket/ISocket';
import Database from './connection';
import Rooms from './bin/socket/Rooms';

const port = process.env.PORT;
console.log("Server has started");

// app.listen(port, () => {
//   Log.info('App started')
//   console.log(`App Started on ${port}`);
// });

const httpServer = createServer(app);
const io = new Server(httpServer,);
const allRooms:Rooms[] = [];

io.on("connection", (socket) => {
  Log.info(`New user connected with socket Id: ${socket.id}`)
  new ISocket(socket,io,allRooms);
  const rooms = io.of("/").adapter.rooms;
  console.log(rooms)
});

io.of("/").adapter.on("create-room", (room) => {
  console.log(`room ${room} was created`);
});

io.of("/").adapter.on("join-room", (room, id) => {
  console.log(`socket ${id} has joined room ${room}`);
});


httpServer.listen(port,0,()=>{
    Log.info(`App started on ${port}`)
    new Database();
});