// import { Request, Response } from "express";
// import { authentication, generateToken, random } from "../../helpers";
// import { Users } from "./entity";
// import pgconexion from "../../config/db";
// import jwt from "jsonwebtoken"

// export const getUsers = async (req: Request, res: Response) => {
//     const users = await pgconexion.manager.find(Users);
    
//     return res.status(200).json({ msg: "all users", users })
// }
// export const getUserByToken = async (req: Request, res: Response) => {
    // const token = req.cookies["CAP-COOKIE"]
    // if(!token) {  res.sendStatus(400).json({ msg: "token n'existe pas" }) }

    // const decoded = jwt.verify(token, "CAP-COOKIE") as { id: number };
    // if(!decoded || decoded.id) { return res.status(400).json({ msg: "invlid token" })}

    // const repository = pgconexion.getRepository(Users);
    // const user = await repository.findOneBy({ id: decoded.id })

    // return res.status(200).json({msg: "connected user", user})
// }

// export const login = () => {
//     try{

//     }catch(error) {

//     }
// }

// export const register = async (req: Request, res: Response) => {
//     try{
//         const { email, fullname, password, usertype } = req.body;
//         if(!email || !password || !fullname) {
//             return res.status(400)
//         }

        
//         const salt = random()
        
//         const users = new Users()
//         users.fullname = fullname, users.email = email, 
//         users.password = authentication(salt, password) ,
//         users.salt = salt, users.usertype = usertype
        
//         const repository = pgconexion.getRepository(Users);
//         const existingUser = await repository.findOneBy({ email: users.email })
//         if(existingUser) { return res.status(400).json({ msg: "l'utilisateur existe deja" })}

//         const savedUser = repository.save(users);
        
//         const userToken = generateToken(users)
        
//             res.cookie("CAP-COOKIE", userToken, { domain: 'localhost', path: '/' })
            
//         return res.status(200).json({msg: "user created", users, userToken });

//     }catch(error) {
//         console.log(error);
//         return res.sendStatus(500)  
//     }
// }


