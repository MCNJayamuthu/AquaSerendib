import { Router } from "express";

import {
  createRoadmapItemController,
  getRoadmapItemsController,
  updateRoadmapItemController,
  deleteRoadmapItemController
} from "../controllers/roadmap.controller";

import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

router.get("/", getRoadmapItemsController);

router.post("/", authenticateAdmin, createRoadmapItemController);

router.put("/:id", authenticateAdmin, updateRoadmapItemController);

router.delete("/:id", authenticateAdmin, deleteRoadmapItemController);

export default router;