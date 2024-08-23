import express, { Request, Response } from 'express'
import userRouter from './api/user/userRouter'
import cors from 'cors'
import profileRouter from './api/profile/profileRouter'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import helmet from 'helmet'

export function createApp() {
config()
const app = express();

    app.use(session({
        secret: process.env.SECRETE || 'SECRETE-KEY',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
    }))
    app.use(cookieParser())
    app.use(cors({
        origin : "http://localhost:3000",
        methods : ["GET","POST","PUT","DELETE"],
        credentials : true
    }))
    app.use(express.json())
    app.use(helmet());
    app.disable('x-powered-by');
    
    app.use('/api/auth' , userRouter);
    app.use('/api/profiles', profileRouter)
  
    return app;
}