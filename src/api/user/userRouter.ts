import { Router } from "express";
import { authUser, createUser, getUserById, getUsers, login } from "./userController";
import { verfifyToken } from "../../midleware/verifyToken";

const router = Router();

// api/user
router.get('/' , getUsers);
// recuperer un user par son token
router.get('/user',verfifyToken, authUser)

// api/user/234
router.get('/:id' , getUserById);

router.post('/create' , createUser)
router.post('/connect' , login )

export default router ;