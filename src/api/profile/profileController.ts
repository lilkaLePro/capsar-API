import { Request, Response } from "express";
import { createProfile, getProfileId, getProfiles, ProfileModel } from "./profileModel";
import { ObjectId } from "mongoose";
import { UserModel } from "../user/userModel";

export const getAllProfile = async (req: Request, res: Response) => {
    try{
        const profiles = await getProfiles()
        return res.status(200).json({ msg: "tous les profiles : ", profiles })
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

        const profile = await ProfileModel.find({ user: userId })

        return res.status(404).json({ msg: "the profile of this user", profile })
    }catch(error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export const addProfile = async (req: Request, res: Response) => {
    try {
        const { biographie, img_profile, user, pays, ville } = req.body;
        
        if(!user) { return res.sendStatus(400) }
        const profile = await createProfile({
            biographie,
            img_profile,
            user,
            adress: {
                pays,
                ville
            }
        })
        return res.status(200).json({msg: 'profile crée', profile})

    }catch(error) {
        console.log(error);
        return res.sendStatus(500)
    }
}