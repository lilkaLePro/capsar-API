import { Router } from "express";
import { createUser, getUserById, getUsers, login } from "./userController";

const router = Router();

// api/user
router.get('/' , getUsers);

// api/user/234
router.get('/:id' , getUserById);

router.post('/create' , createUser)
router.post('/connect' , login )

export default router ;