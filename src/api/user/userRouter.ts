import { Router } from "express";
import { deleteuser, getAllUsers, login, register } from "./userController";
import { isAuth, isOwner } from "../../midleware";

const router = Router();

// api/user
router.get('/users' ,isAuth, getAllUsers);
// recuperer un user par son token
// router.get('/')

// api/user/234
router.delete('/delete/:id' , deleteuser );


router.post('/create' , register )
router.post('/connect', login )

export default router ;