import { Request, Response } from "express";
import { createProfile, getProfileId, getProfiles, ProfileModel, updateProfile } from "./profileModel";
import mongoose from "mongoose";
import { getUserByToken, register } from "../user/userController";
import { getUserBySessionToken, UserModel } from "../user/userModel";
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

        const profile = await ProfileModel.findOne({ user: new mongoose.Types.ObjectId(userId) })

        return res.status(200).json({ msg: "the profile of this user", profile })
    }catch(error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export const updateUserProfile = async (req: Request, res: Response) => {
    let token = req.cookies[key]
    try{

        const user = await getUserBySessionToken(token)
        if(!user) { return res.status(400).json({ msg: "user not found" }) }
            // user.biographie = biographie
            // user.img_profile = `${req.}`

        // user.save()

        return res.status(200).json({ msg: 'profile modifié', user })
    }catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

