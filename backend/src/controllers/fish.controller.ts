import { Request, Response } from 'express';
import { getAllFishSpecies } from '../services/fish.service';
import { supabase } from '../config/supabaseClient';

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

export const getFishByName = async (req: Request, res: Response) => {

  const name = req.query.name as string;

  const { data, error } = await supabase
    .from('fish_species')
    .select('*')
    .ilike('english_name', `%${name}%`);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

    if (!data || data.length === 0) {
    return res.status(404).json({ message: "Fish not found" });
  }

  res.json(data[0]);
};