import { Router } from "express";
import { getAllProjects, submitProject, updateProjectByUser } from "./projectController";

const router = Router();

router.get('/', getAllProjects)

router.post('/submit/:id', submitProject)

router.put('/update/:id', updateProjectByUser)

export default router;