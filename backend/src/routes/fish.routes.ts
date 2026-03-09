// import express from 'express';
// import { getFishByName, getFishSpecies } from '../controllers/fish.controller';

// const router = express.Router();

// router.get('/', getFishSpecies);
// router.get('/search', getFishByName);

// export default router;

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

const router = express.Router();

router.get('/', getFishSpecies);

router.get('/search', getFishByName);

router.post('/', addFishSpecies);

router.put('/:id', updateFishSpecies);

router.delete('/:id', deleteFishSpecies);

router.post("/upload-image", upload.single("image"), uploadFishImageController);

export default router;