import { NextFunction, Request, Response } from "express-serve-static-core";
import jwt from 'jsonwebtoken'
import { UserObjectDt } from "../api/user/createUserDataTO";

interface CustumRequest extends Request {
    user?: UserObjectDt
}
interface JwtPayload { user: UserObjectDt }

export const verfifyToken = (req:CustumRequest , res: Response, next: NextFunction ) => {
    const token = req.header('x-auth-token');
    
    if(!token) {
        return res.status(401).json({mesage : "No token, authorization denied"});
    }

    try{
        const decoded = jwt.verify(token, "secret") as JwtPayload ;
        req.user = decoded.user ;
        next()
    }catch(err) {
        res.status(500).json({ msg: "Token is not valid" })
    }
}