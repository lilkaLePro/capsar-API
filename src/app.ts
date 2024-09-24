import express, { Request, Response } from 'express'
import userRouter from './api/user/userRouter'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import path from 'path'

export function createApp() {
const app = express();  
    app.use(cookieParser());
    app.use(session({
        secret: process.env.SECRETE || 'SECRETE-KEY',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
    }));
    app.use(cors({
        origin : "http://localhost:3000",
        methods : ["GET","POST","PUT","DELETE"],
        credentials : true
    }));
    app.use(express.json());
    app.use(express.static(path.join(__dirname, "public")))
    // app.use(helmet());
    // app.disable('x-powered-by');
    
    app.use('/api/auth' , userRouter);
  
    return app;
}