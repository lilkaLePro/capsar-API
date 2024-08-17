import { Request, Response } from "express-serve-static-core";
import { createUserQueryParams, User, UserObjectDt } from "./createUserDataTO";
import { UserModel } from "./userModel";
import mongoose from "mongoose";

export async function getUsers(req: Request , res:Response) {
    const users = await UserModel.find()

    res.status(200).send(users)
}

export async function getUserById(req: Request<{id: string}> , res: Response<User | {message : string} >) {
    const userId = req.params.id

    console.log(req.params.id);

    const user = await UserModel.findById(userId).exec()
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    
    res.status(200).json(user);
}

export async function createUser(
    req: Request<{}, {}, UserObjectDt>, 
    res: Response<User>) 
{
    try{
        const { username, email, password, fullname } = req.body ;

        if (!username || !email || !password) {
            return res.status(400).send({ message: 'Username and Email and password are required' });
          }
          
        const newUser = new UserModel({username, fullname, email, password })
        await newUser.save()
        
        res.status(201).send(newUser)
    }catch(error) {
        console.error(error);
        res.status(500).send({message : 'Internal Server Error'});
        
    }
}