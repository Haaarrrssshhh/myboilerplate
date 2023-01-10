import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/User";

const UserSchema:Schema = new Schema({
    email: {
    type: String,
    required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username:{
        type:String,
        required:true,
    }
},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const User = model<IUser>("User",UserSchema);

export default User;