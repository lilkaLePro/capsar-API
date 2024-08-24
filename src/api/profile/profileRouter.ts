import { Router } from "express";
import { addProfile, getAllProfile, getProfileById, getProfileByUser } from "./profileController";

const router = Router();

router.get('/' , getAllProfile);
router.get('/:id', getProfileById );
router.get('/user/:userId', getProfileByUser );

router.post('/create', addProfile);

export default router;