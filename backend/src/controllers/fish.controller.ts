import { Request, Response } from 'express';
import { getAllFishSpecies } from '../services/fish.service';

export const getFishSpecies = async (req: Request, res: Response) => {
  try {
    const fish = await getAllFishSpecies();
    res.status(200).json(fish);
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to retrieve fish species',
      error: error.message,
    });
  }
};