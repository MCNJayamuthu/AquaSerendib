import { Router } from 'express';
import { getFishSpecies } from '../controllers/fish.controller';

const router = Router();

router.get('/', getFishSpecies);

export default router;