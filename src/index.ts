import { createApp } from "./app";
import mongoose from 'mongoose';
import pgconexion from "./config/db";

const app = createApp()

const PROT = 5000 ;

mongoose.connect('mongodb+srv://kaly100diallo:OwIAT5JrWodxRWQp@cluster0.meqcopi.mongodb.net/capsar?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    
    app.listen(PROT , () => {
        console.log('db connected');
        console.log('server running');        
    });

}).catch(() => console.log('error , conection failed')) ;

pgconexion.connect((error) => {
    if(error) {
        console.log('conexion failed', error.stack)
    }else{
        console.log('postgres db connected');
        
    }
})
