import { Response } from "express"
import { Request } from "express-serve-static-core"
import { ProfileModel } from "./profileModel"
import { Profile, ProfileObjectDt } from "./createProfileDataTO"
import mongoose from "mongoose"
import { User } from "../user/createUserDataTO"

export const getProfiles = async (req: Request, res: Response) => {
    const profiles = await ProfileModel.find()

    res.status(200).send(profiles)
}
export const getProfileById = (req:Request<{id : string}>, res:Response<Profile | {message : string}>) => {
    const profileId = req.params.id;

    const profile = ProfileModel.findById(profileId).exec();
    if(!profile){return res.status(400).send({message : "profile not fount"})}

    res.status(200).send()
}

interface authUser extends User { _id: mongoose.Types.ObjectId }
export const createProfile = async (req:Request<{}, {}, ProfileObjectDt>, 
    res: Response<Profile>) => 
{
        const { biographie, pays } = req.body
        const userId = (req.user as authUser)._id

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log("not valid objectId");
        }   

    
        const newProfile = new ProfileModel({ biographie, pays, user: userId })
        await newProfile.save()
        
        res.status(201).json({biographie, pays}).send(newProfile)

}