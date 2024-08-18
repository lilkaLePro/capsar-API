import express, { Request, Response } from 'express'
import userRouter from './api/user/userRouter'
import cors from 'cors'

export function createApp() {
    const app = express();
    app.use(cors({
        origin : "http://localhost:3000",
        methods : ["GET","POST","PUT","DELETE"],
        credentials : true
    }))
    app.use(express.json())

    app.use('/api/users' , userRouter);
  
    return app;
}