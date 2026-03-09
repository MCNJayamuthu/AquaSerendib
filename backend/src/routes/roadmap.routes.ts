import { Router } from "express";

import {
  createRoadmapItemController,
  getRoadmapItemsController,
  updateRoadmapItemController,
  deleteRoadmapItemController
} from "../controllers/roadmap.controller";

const router = Router();

router.post("/", createRoadmapItemController);

router.get("/", getRoadmapItemsController);

router.put("/:id", updateRoadmapItemController);

router.delete("/:id", deleteRoadmapItemController);

export default router;