import { Router } from "express";
import { register } from "./userController";

const router = Router();

// api/user
// router.get('/' , getUsers);
// recuperer un user par son token
// router.get('/me')

// api/user/234
// router.get('/:id' , getUserById);


router.post('/create' , register )
// router.post('/connect', login )

export default router ;