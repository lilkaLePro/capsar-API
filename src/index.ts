import { createApp } from "./app";
import mongoose from 'mongoose';

const app = createApp()

const PROT = 5000 ;

mongoose.connect('mongodb+srv://kaly100diallo:OwIAT5JrWodxRWQp@cluster0.meqcopi.mongodb.net/capsar?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    
    app.listen(PROT , () => {
        console.log('db connected');
        console.log('server running');        
    });

}).catch(() => console.log('error , conection failed')) 