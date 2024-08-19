import { NextFunction, Request, Response } from "express-serve-static-core";
import jwt from 'jsonwebtoken'


export const verfifyToken = (req: Request, res: Response, next: NextFunction ) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, 'secret', (error , user ) => {
        if(error) {return res.status(403).json({ error: 'Unauthorized' });}
        
        req.user = user;
        
        next()
    })
}