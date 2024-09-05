import { Request, Response } from "express";
import { getProfileId, getProfiles, ProfileModel, updateProfile } from "./profileModel";
import mongoose from "mongoose";
const key = process.env.SECRETE || "SECRETE-KEY" ;


export const getAllProfile = async (req: Request, res: Response) => {
    try{
        const profiles = await getProfiles();
        return res.status(200).json({ msg: "tous les profiles : ", profiles})
    }catch(error) {
        console.log(error);
        
    }
}
export const getProfileById =  async (req: Request, res: Response) => {
    try{
        const { id } = req.params
        if(!id) { return res.status(400).json({ msg: "user id missing" }) }

        const user = await getProfileId(id)
        return res.status(200).json({ msg: "this user is :", user })
    }catch(error) {
        console.log(error);
        return res.sendStatus(500)
    }
}
export const getProfileByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params

        const profile = await ProfileModel.findOne({ user: new mongoose.Types.ObjectId(userId) }).populate({
            path: 'user', select: "fullname"
        })

        return res.status(200).json({ msg: "the profile of this user", profile })
    }catch(error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export const updateUserProfile = async (req: Request<{id: string},{}>, res: Response) => {
    const { id } = req.params;
    try{
        const {proffession, biographie, pays, ville, username} = req.body

        const profile = await ProfileModel.findByIdAndUpdate(id);
        if(!profile) { return res.status(400).json('profile dosen t exist') };
            profile.username = username,
            profile.biographie = biographie,
            profile.proffession = proffession,
            profile.adress.ville = ville,
            profile.adress.pays = pays;
            if(!req.file) return res.sendStatus(400);
            profile.img_profile = req.file.filename;
            
            const data = await profile.save()


        return res.status(200).json({ msg: 'profile modifié', data });

    }catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

