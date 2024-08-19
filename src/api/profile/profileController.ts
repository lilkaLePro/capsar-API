import { Response } from "express"
import { Request } from "express-serve-static-core"
import { ProfileModel } from "./profileModel"
import { Profile, ProfileObjectDt } from "./createProfileDataTO"
import { UserModel } from "../user/userModel"

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
    

export const createProfile = async (req:Request<{}, {}, ProfileObjectDt >, 
    res: Response<Profile | { message : string }>) => 
{
    try{
        const { biographie, pays, profession, public_profile, img_profile,  } = req.body
    
        const newProfile = new ProfileModel({ biographie, pays, profession, public_profile, img_profile })
        await newProfile.save()
        
        res.status(201).send({message: "user creer"})

 }catch(error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
 }
}