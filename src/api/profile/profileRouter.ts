import { Router } from "express";
import { addProfile, getAllProfile, 
    getProfileById, getProfileByUser, 
    updateUserProfile } 
from "./profileController";

const router = Router();

router.get('/' , getAllProfile);
router.get('/:id', getProfileById );
router.get('/user/:userId', getProfileByUser );

router.post('/create', addProfile);
router.put('/update/:id', updateUserProfile);


export default router;