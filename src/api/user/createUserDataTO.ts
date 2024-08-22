import mongoose from "mongoose"

export interface UserObjectDt {
    _id: mongoose.Types.ObjectId,
    email : string,
    password : string,
    fullname: string
}
export interface createUserQueryParams {
    loginAfterCreate ?: Boolean
}
export interface User {
    _id: mongoose.Types.ObjectId,
    fullname?: string ,
    email?: string,
    message?: string,
    token?: string  | undefined,

}