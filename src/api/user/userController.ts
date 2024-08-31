import express, { Request, Response } from 'express';
import { createUser, deleteUserById, getUserByEmail, getUserBySessionToken, getUsers } from './userModel';
import { authentication, random } from '../../helpers';
import mongoose from 'mongoose';
import { createProfile, ProfileModel } from '../profile/profileModel';
const key = process.env.SECRETE || "SECRETE-KEY" ;

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users);

    }catch(error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const getUserByToken = async (req: Request, res: Response) => {
   try{
        let token = req.cookies[key]
        if(!token) { res.sendStatus(400).json({ msg: "token not found" }) }

        const user = await getUserBySessionToken(token)
        if(!user) { res.sendStatus(400).json({msg: "token non disponible"}) }

        return user
   }catch(error) {
        return res.status(500).json(' server error ')
   }
};

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
        res.cookie(key, authenticationData.sessionToken, { domain : 'localhost', path: '/', secure: false } )

        return res.status(200).json({ msg: "connexion reusite", user }).end();

    }catch(error) {
        console.log(error);
        return res.sendStatus(400)
        
    }
}

export const register = async (req: Request, res: Response) => {
    try{
        const { email, fullname, password, 
            userType, img_profile } = req.body;

        if(!email || !password || !fullname) {
            return res.status(400)
        }
        const existingUser = await getUserByEmail(email)
        if(existingUser) {
            return res.status(400).json({msg: "user exist deja"})
        } 

        const salt = random()
        const user = await createUser({
            email, 
            fullname,
            userType,
            authentication: {
                salt: salt,
                password: authentication(salt, password)
            },
        });
        
        const id = user?._id as mongoose.Types.ObjectId

        const profile = await createProfile({
            username: fullname.replace(' ', '_'),
            biographie: "",
            user: user,
            adress: {
                pays:"",
                ville:""
            }
        })
        
        const sessionToken = authentication( salt, id.toString() );
        let userToken = user.authentication as Authentication;
        userToken.sessionToken = sessionToken;

        res.cookie(key, sessionToken, { domain: 'localhost', path: '/' })
        return res.status(200).json({ msg: "user and profile created", user, profile })
        
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

