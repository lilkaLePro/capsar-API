import express, { Request, Response } from 'express';
import { createUser, deleteUserById, getUserByEmail, getUsers } from './userModel';
import { authentication, random } from '../../helpers';
import mongoose from 'mongoose';
const key = process.env.SECRET || 'SECRETE-KEY' ;

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users);

    }catch(error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

interface Authentication { salt: string, password: string, sessionToken: string }
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) res.sendStatus(400)
        
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user || !user.authentication) res.sendStatus(400);

        const authenticationData = user?.authentication as Authentication;
    
        const expectedHash = authentication(authenticationData.salt, password);
        if(authenticationData.password !== expectedHash) res.sendStatus(403);
    
        const salt = random();
        const id = user?._id as mongoose.Types.ObjectId ;
        authenticationData.sessionToken = authentication(salt, id.toString())

        await user?.save()
        res.cookie(key, authenticationData.sessionToken, { domain : 'localhost', path: '/' } )

        return res.status(200).json({ msg: "connexion reusite", user }).end();

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
        if(existingUser) res.sendStatus(400).json({msg: "user exist deja"})

        const salt = random()
        const user = await createUser({
            email, 
            fullname,
            authentication: {
                salt: salt,
                password: authentication(salt, password)
            },
        });
        
        return res.status(200).json(user)
        
    }catch(error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

export const deleteuser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const deleteUser = await deleteUserById(id)
        return res.json({msg: 'user deleted', deleteUser})
    }catch(error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

