import { Router } from "express";
import { addProfile, getAllProfile } from "./profileController";

const router = Router();

router.get('/' , getAllProfile);
// router.get('/:id' , getProfileById)

router.post('/create', addProfile)

export default router;