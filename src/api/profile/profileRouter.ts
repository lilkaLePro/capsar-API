import { Router } from "express";
import { getAllProfile, 
    getProfileById, getProfileByUser, 
    updateUserProfile } 
from "./profileController";
import multer from "multer";
import { storage } from "../../midleware";

const router = Router();

router.get('/' , getAllProfile);
router.get('/:id', getProfileById );
router.get('/user/:userId', getProfileByUser );

const upload = multer({storage})

router.put('/update/:id', updateUserProfile);


export default router;