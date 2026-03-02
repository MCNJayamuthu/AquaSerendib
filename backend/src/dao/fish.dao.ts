import { supabase } from '../config/supabaseClient';
import { FishSpeciesDTO } from '../dto/FishSpeciesDTO';

export const fetchAllFish = async (): Promise<FishSpeciesDTO[]> => {
  const { data, error } = await supabase
    .from('fish_species')
    .select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data as FishSpeciesDTO[];
};