import { Router } from "express";
import { deleteuser, getAllUsers, getUserByToken, register } from "./userController";
import { isAuth } from "../../midleware";

const router = Router();

// api/user
router.get('/users', getAllUsers);
// recuperer un user par son token
router.get('/me', isAuth, getUserByToken )

// api/user/234
router.delete('/delete/:id' , deleteuser );

router.post('/create' , register )
router.post('/connect' )

export default router ;