import mongoose, {Document, Mongoose, Schema} from "mongoose";
import { UserModel } from "../user/userModel";

interface IProfile extends Document {
    _id  : string | undefined,
    biographie : string ,
    adress: {
        pays : string , ville : string ,
    },
    profession : string,
    img_profile: string,
    public_profile: boolean,
    user: mongoose.Schema.Types.ObjectId,
    username: string
}

const ProfileSchema: Schema<IProfile> = new mongoose.Schema({
    biographie: { type: String},
    username: { type: String},
    profession: {type: String},
    public_profile: {type: Boolean},
    img_profile: {type: String },
    user: { type: mongoose.Types.ObjectId , ref: 'users' },
    adress: {
        pays: {type: String}, ville: {type: String},
    },
}, {
    timestamps: true
})

export const ProfileModel = mongoose.model<IProfile>('profile', ProfileSchema)

export const createProfile = (value: Record<string, any>) => new ProfileModel(value)
        .save().then((user) => user.toObject());

export const getProfiles = () => ProfileModel.find();
export const getProfileId = (id: string) => ProfileModel.findById(id)
export const getUserProfile = (user: mongoose.Types.ObjectId ) => ProfileModel.findOne({ user })

export const updateProfile = ( id: string, value: Record<string, any> ) => UserModel.findByIdAndUpdate(id, value) 