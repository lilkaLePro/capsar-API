import express, { Request, Response } from 'express'
import userRouter from './api/user/userRouter'
import cors from 'cors'
import profileRouter from './api/profile/profileRouter'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser'

export function createApp() {
config()
    const app = express();
    app.use(cookieParser())
    app.use(cors({
        origin : "http://localhost:3000",
        methods : ["GET","POST","PUT","DELETE"],
        credentials : true
    }))
    app.use(express.json())

    app.use('/api/auth' , userRouter);
    app.use('/api/profiles', profileRouter)
  
    return app;
}