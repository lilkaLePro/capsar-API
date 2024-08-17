import express, { Request, Response } from 'express'
import userRouter from './api/user/userRouter'


export function createApp() {
    const app = express();

    app.use(express.json())

    app.use('/api/users' , userRouter);
  
    return app;
}