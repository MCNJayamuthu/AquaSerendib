import express from 'express';
import {
  getFishByName,
  getFishSpecies,
  addFishSpecies,
  updateFishSpecies,
  deleteFishSpecies,
  uploadFishImageController
} from '../controllers/fish.controller';
import { upload } from '../middleware/upload.middleware';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', getFishSpecies);

router.get('/search', getFishByName);

router.post('/', authenticateAdmin, addFishSpecies);

router.put('/:id', authenticateAdmin, updateFishSpecies);

router.delete('/:id', authenticateAdmin, deleteFishSpecies);

router.post("/upload-image", upload.single("image"), uploadFishImageController);

export default router;