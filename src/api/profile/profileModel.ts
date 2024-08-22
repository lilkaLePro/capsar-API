import mongoose, {Document, Mongoose, Schema} from "mongoose";

interface IProfile extends Document {
    _id  : string | undefined,
    biographie : string ,
    pays : string , ville : string ,
    profession : string,
    img_profile: string,
    public_profile: boolean,
    user: mongoose.Schema.Types.ObjectId
}

const ProfileSchema: Schema<IProfile> = new mongoose.Schema({
    biographie: { type: String},
    pays: {type: String},
    profession: {type: String},
    public_profile: {type: Boolean},
    img_profile: {type: String},
    user: { type: mongoose.Types.ObjectId , ref: 'users' }
}, {
    timestamps: true
})

export const ProfileModel = mongoose.model<IProfile>('profile', ProfileSchema)