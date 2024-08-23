import mongoose from "mongoose";

export interface ProfileObjectDt {
    _id: string ,
    biographie : string ,
    pays : string , ville : string ,
    profession : string,
    img_profile: string,
    public_profile: boolean,
}

export interface Profile {
    id?: string,
    biographie ?: string ,
    pays ?: string , ville ?: string ,
    profession ?: string,
    img_profile?: string,
    public_profile?: boolean,
    // user_id: mongoose.Types.ObjectId,
    message ?: string
}