import { Request, Response } from "express";
import { createProfile, getProfiles } from "./profileModel";

export const getAllProfile = async (req: Request, res: Response) => {
    try{
        const profiles = await getProfiles()
        return res.status(200).json({ msg: "tous les profiles : ", profiles })
    }catch(error) {
        console.log(error);
        
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