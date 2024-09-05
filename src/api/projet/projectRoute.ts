import { Router } from "express";
import { submitProject } from "./projectController";

const router = Router();

router.post('/submit', submitProject)

export default router;