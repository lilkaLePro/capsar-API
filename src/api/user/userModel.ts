import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
    _id: string | undefined,
    fullname: string ,
    email: string,
    password : string,
    refreshToken: string
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    fullname : {type : String , required : true, min : 2 , max : 30 },
    email : {type : String , required : true , unique : true },
    password : { type : String , required : true},
    refreshToken: {type: String}
}, {
    timestamps: true
})


export const UserModel = mongoose.model<IUser>('User' , UserSchema)