import { NextFunction, Request, Response } from "express-serve-static-core";
import jwt from 'jsonwebtoken'


export const verfifyToken = (req: Request, res: Response, next: NextFunction ) => {
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, 'secret', (error , decoded ) => {
        if(error) {return res.status(401).json({ error: 'Unauthorized' });}
        req.user = decoded;
        next()
    })
}