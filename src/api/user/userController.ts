import express, { Request, Response } from 'express';
import { createUser, deleteUserById, getUserByEmail, getUserBySessionToken, getUsers } from './userModel';
import { authentication, random } from '../../helpers';
import mongoose from 'mongoose';
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

export const register = async (req: Request, res: Response) => {
    try{
        const { email, fullname
            } = req.body;

        if(!email || !fullname) {
            return res.status(400)
        }
        const existingUser = await getUserByEmail(email)
        if(existingUser) {
            return res.status(400).json({msg: "user exist deja"})
        } 

        const user = await createUser({
            email, 
            fullname,
        });
        
        return res.status(200).json({ msg: "user and profile created", user })
        
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

