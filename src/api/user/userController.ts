import { Request, Response } from "express-serve-static-core";
import { createUserQueryParams, User, UserObjectDt } from "./createUserDataTO";
import { UserModel } from "./userModel";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export async function getUsers(req: Request , res:Response) {
    const users = await UserModel.find()

    res.status(200).send(users)
}

export async function getUserById(req: Request<{id: string}> , res: Response<User | {message : string} >) {
    const userId = req.params.id

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
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const { email, fullname } = req.body ;
        const password = hashedPassword;
        

        if (!fullname || !email || !password) {
            return res.status(400).send({ message: 'fullname and Email and password are required' });
          }
          
        const newUser = new UserModel({ fullname, email, password })
        await newUser.save()
        
        res.status(201).send(newUser)
    }catch(error) {
        console.error(error);
        res.status(500).send({message : 'Internal Server Error'});
        
    }
}

export const login = async (req: Request, res: Response<User>) => {
    try{
        
        const {email , password} = req.body;
        let user = await UserModel.findOne({ email })
        if(!user){
            return res.status(400).send({ message : "user doesn't exist" })
        }
        
        // compare and validate
        const compare = bcrypt.compare(password, user.password)
        if(!compare){return res.status(400).json({ message : "invalid password" })}

        //  send success response
        const accessToken = jwt.sign({ email: user.email }, 'access_secret', { expiresIn: '1d' });
        const refreshToken = jwt.sign({ email: user.email }, 'refresh_secret', { expiresIn: '7d' });

        user.refreshToken = refreshToken
        await user.save();

        return res.status(200).json(user);

    }catch(error) {
        return res.status(500).json({message: "server error"})
    }
}

export const authUser = async (req: Request<{}, {}, User>, res: Response) => {
    try {
        const user = await UserModel.findOne({email : req.body.email });
        if(!user){return res.status(404).json({ error : "user not found"})};

        res.status(200).json({fullname: user?.fullname, email: user?.email});

    }catch(error) {
        res.status(500).json({error: "internal server error"})
    }
}