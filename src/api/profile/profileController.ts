import { Request, Response } from "express";
import { createProfile, getProfileId, getProfiles, ProfileModel, updateProfile } from "./profileModel";

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

        const profile = await ProfileModel.findOne({ user: userId })

        return res.status(200).json({ msg: "the profile of this user", profile })
    }catch(error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export const addProfile = async (req: Request, res: Response) => {
    try {
        const { biographie, img_profile, user, pays, ville, username } = req.body;
        
        if(!user) { return res.sendStatus(400) }
        const profile = await createProfile({
            username,
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

export const updateUserProfile = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const { biographie } = req.body;
        if(!biographie) { return res.status(400).json({ msg: "biographie non dispo" }) }

        const user = await getProfileId(id);
        if(!user) { return res.status(400).json({ msg: "user not found" }) }
         user.biographie = biographie;

        user.save()

        return res.status(200).json({ msg: 'profile modifié', user })
    }catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

