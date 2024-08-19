import { Router } from "express";
import { createProfile, getProfileById, getProfiles } from "./profileController";
import { verfifyToken } from "../../midleware/verifyToken";

const router = Router();

router.get('/' , verfifyToken , getProfiles);
router.get('/:id' , getProfileById)

router.post('/create', createProfile)

export default router;