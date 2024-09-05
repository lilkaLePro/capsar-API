import mongoose, { Schema } from "mongoose";

export interface IProject {
    _id: string | undefined,
    creator : mongoose.Schema.Types.ObjectId,
    link: string,
    projectName : string,
    validation: "pending" | "validated" | "refused" | "checking",
    description: string,
    amountObjectif: number,
    thumnail_img?: string
}

const ProjectSchema: Schema<IProject> = new mongoose.Schema({
    creator: { type: mongoose.Types.ObjectId, ref: "profile", required: true},
    link: { type: String, required: true },
    projectName: { type: String, required: true },
    validation: { type: String, required: true },
    amountObjectif: { type: Number, required: true }
});

export const ProjectModel = mongoose.model<IProject>('project', ProjectSchema)

export const createProject = (value: Record<string, any>) => new ProjectModel(value)
    .save().then(project => project.toObject());