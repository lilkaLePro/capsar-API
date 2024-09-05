import { Request, Response } from "express";
import { createProject } from "./projectModel";
import { UserModel } from "../user/userModel";
import { getProfileId } from "../profile/profileModel";

export const submitProject = async (req: Request<{id: string}>, res: Response) => {
    const { id } = req.params
    try {
        const { link, projectName, validation, description, amountObjectif, thumbnail_img } = req.body;
        if(!link || !projectName || validation || description || amountObjectif || !thumbnail_img) {
            return res.sendStatus(400).json("un chanps manque" )
        }

        const creator = await getProfileId(id)
        // if(!creator) { return res.sendStatus(400) }

        const project = await createProject({
            link, amountObjectif,
            projectName,
            validation,
            description,
            creator: creator?._id,
            thumbnail_img
        })

        return res.sendStatus(200).json({ msg: "project creation submited", project });
    }catch(error) {
        return res.sendStatus(500).json('server error lors de la soumision du du project')
    }
}