import { Request, Response } from "express";
import { createProject, getAllProject, ProjectModel } from "./projectModel";
import { UserModel } from "../user/userModel";
import { getProfileId } from "../profile/profileModel";

export const getAllProjects = async (req: Request, res: Response) => {
    try{
        const projects = await getAllProject();

        return res.status(400).json({msg: "touts les projects", projects})
    }catch(error) {
        return res.sendStatus(500)
    }
}

export const submitProject = async (req: Request<{id: string}>, res: Response) => {
    const { id } = req.params
    try {
        const { link, projectName, validation, description, amountObjectif, thumbnail_img } = req.body;
        if(!link || !projectName || !validation || !description || !amountObjectif || !thumbnail_img) {
            return res.status(400).json({msg: "un chanps manque"})
        }

        const creatorid = await getProfileId(id)
        if(!creatorid) { return res.status(400) }

        const project = await createProject({
            link, amountObjectif,
            projectName,
            validation,
            description,
            creator: creatorid?._id,
            thumbnail_img
        })

        return res.status(201).json({ msg: "project creation submited", project });
    }catch(error) {
        return res.status(500).json('server error lors de la soumision du du project')
    }
}

export const updateProjectByUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { link, projectName, description, amountObjectif, thumbnail_img } = req.body;

        const project = await ProjectModel.findByIdAndUpdate(id)
        if(!project) { return res.status(400).json(" project dosen't existe ") }
        project.link = link,
        project.projectName = projectName,
        project.description = description,
        project.amountObjectif = amountObjectif,
        project.thumnail_img = thumbnail_img

        const data = await project.save();
        
        return res.status(200).json({ msg: "project modified", data })

    }catch(error) {
        return res.sendStatus(500).json(error)
        
    }

}

// export const updateProjectByAdmin = ()
