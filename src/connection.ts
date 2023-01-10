import mongoose from "mongoose";
import Log from "./bin/custom/Log";

export default class Database{
    database: mongoose.Connection;
    constructor(){
        mongoose.set('strictQuery', true);
        mongoose.pluralize(null);
        const uri:string = `${process.env.DB_CONNECTION_URL}`;
        mongoose.connect(uri, {useNewUrlParser: true} as mongoose.ConnectOptions);
        this.database = mongoose.connection;
        
        this.checkConnection();
    }
    checkConnection(){
        if(this.database){
            this.database.on('error', (error)=>{Log.error(error)});
            this.database.once('open',()=>{
                Log.info('Database connected successfully');
            })
        }
    }
}