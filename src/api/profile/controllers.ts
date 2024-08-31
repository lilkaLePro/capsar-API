// import { Request, Response } from "express"
// import { Profile } from "./entity";
// import pgconexion from "../../config/db";
// import { Users } from "../user/entity";
// // import 

// export const createProfile = async (req: Request, res: Response) => {
//     let token = req.cookies["CAP-COOKIE"]
//     try{
//         const {username, profession, biographie, pays, ville, userId } = req.body;

//         const userRepository = pgconexion.getRepository(Users)
//         const user = await userRepository.findOneBy(token)
//         if(user) { return res.status(400).json({ msg: 'pas encore inscrit pour obtenir une profile', user }) }
        

//         const profiles = new Profile()
//         profiles.username = username,
//         profiles.biographie = biographie,
//         profiles.profession = profession,
//         profiles.pays = pays,
//         profiles.ville = ville,
//         profiles.user = user;

//         const repository = pgconexion.getRepository(Profile);
//         repository.save(profiles);

//         return res.status(201).json({ msg: "profile created", profiles });

//     }catch(error) {
//         return res.status(500).json({msg: "errreur a la cretion du profile", error });   
//     }
// }