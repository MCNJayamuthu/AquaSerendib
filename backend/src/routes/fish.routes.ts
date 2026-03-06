import express from 'express';
import { getFishByName, getFishSpecies } from '../controllers/fish.controller';

const router = express.Router();

router.get('/', getFishSpecies);
router.get('/search', getFishByName);

export default router;