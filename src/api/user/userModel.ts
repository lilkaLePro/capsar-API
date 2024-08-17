import mongoose, { Document, Mongoose, Schema } from "mongoose";

interface IUser extends Document {
    _id: string | undefined,
    fullname: string ,
    username: string,
    email: string,
    password : string
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    username : {type : String , required : true, min : 2 , max : 30 },
    fullname : {type : String , required : true, min : 2 , max : 30 },
    email : {type : String , required : true , unique : true },
    password : { type : String , required : true}
})


export const UserModel = mongoose.model<IUser>('User' , UserSchema)