import { Request, Response } from 'express';
import {
  getAllFishSpecies,
  createFishSpecies,
  editFishSpecies,
  removeFishSpecies
} from '../services/fish.service';
import { supabase } from '../config/supabaseClient';
import { uploadFishImage } from "../services/fish.service";




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



export const addFishSpecies = async (req: Request, res: Response) => {

  try {

    const payload = {
  ...req.body,
  admin_id: (req as any).adminId
};

const fish = await createFishSpecies(payload);

    res.status(201).json(fish);

  } catch (error: any) {

    res.status(500).json({
      message: "Failed to add fish",
      error: error.message
    });

  }

};



export const updateFishSpecies = async (req: Request, res: Response) => {

  try {

    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) {
      return res.status(400).json({ message: "Fish ID required" });
    }

    const payload = {
  ...req.body,
  admin_id: (req as any).adminId
};

    const fish = await editFishSpecies(id, payload);

    res.status(200).json(fish);

  } catch (error: any) {

    res.status(500).json({
      message: "Failed to update fish",
      error: error.message
    });

  }

};



export const deleteFishSpecies = async (req: Request, res: Response) => {

  try {

    const idParam = req.params.id;
    const id = Array.isArray(idParam) ? idParam[0] : idParam;

    if (!id) {
      return res.status(400).json({ message: "Fish ID required" });
    }

    await removeFishSpecies(id);

    res.status(200).json({
      message: "Fish deleted successfully"
    });

  } catch (error: any) {

    res.status(500).json({
      message: "Failed to delete fish",
      error: error.message
    });

  }

};

export const uploadFishImageController = async (req: Request, res: Response) => {

  try {

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "No image uploaded"
      });
    }

    const imageUrl = await uploadFishImage(file);

    res.status(200).json({
      imageUrl
    });

  } catch (error: any) {

    res.status(500).json({
      message: "Image upload failed",
      error: error.message
    });

  }

};