import {get, merge} from 'lodash'

import { getUserBySessionToken } from '../api/user/userModel'
import { NextFunction, Request, Response } from 'express'

const key = process.env.SECRET || 'SECRETE-KEY' ;


export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const sessionToken = req.cookies['SECRETE-KEY'];
        if(!sessionToken) res.sendStatus(403);

        const existingUser = await getUserBySessionToken(sessionToken);
        if(!existingUser) res.sendStatus(403).json({msg: "user doesn't exist"});

        merge(req, {identity: existingUser});

        return next()

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

