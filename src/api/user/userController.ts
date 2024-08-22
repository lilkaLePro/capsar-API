import express, { Request, Response } from 'express';
import { createUser, getUserByEmail } from './userModel';
import crypto from 'crypto'
import { authentication, random } from '../../helpers';


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) res.sendStatus(400)
        
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user) res.sendStatus(400);

    }catch(error) {
        console.log(error);
        return res.sendStatus(400)
        
    }
}

export const register = async (req: Request, res: Response) => {
    try{
        const { email, fullname, password } = req.body;

        if(!email || !password || !fullname) {
            return res.sendStatus(400)
        }
        const existingUser = await getUserByEmail(email)
        if(existingUser) res.sendStatus(400)

        const salt = random()
        const user = await createUser({
            email, fullname,
            authentication: {
                salt: salt,
                password: authentication(salt, password)
            },
        });
        console.log("le password" , password, 'et le salt', salt);
        
        return res.status(200).json(user)

    }catch(error) {
        console.log(error);
        return res.sendStatus(500)
    }
}