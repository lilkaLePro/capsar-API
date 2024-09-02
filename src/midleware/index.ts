import {get, merge} from 'lodash'

import { getUserBySessionToken } from '../api/user/userModel'
import { NextFunction, Request, Response } from 'express'
import multer from 'multer';

const key = process.env.SECRET || 'SECRETE-KEY' ;


export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const sessionToken = req.cookies['SECRETE-KEY'];
        if(!sessionToken) { return res.sendStatus(403) };

        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser) { return res.sendStatus(403) } ;
 
        merge(req, {identity: existingUser});

        return res.status(200).json(existingUser)
        next()

    }catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

interface IdTypes extends Request {
    _id: string
}
export const isOwner = async (req: IdTypes, res: Response, next: NextFunction) => {
    try{
        const { id } = req.params
        const currentUserId = get(req, 'identity._id');
        if(!currentUserId) return res.status(403);
        if(currentUserId !== id) return res.status(403)
        
            next()
    }catch(error) {
        console.log(error);
        return res.sendStatus(403)
        
    }
}   

export const storage = multer.diskStorage({
    destination: (req, file, cb ) => {
        cb(null, 'public/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})