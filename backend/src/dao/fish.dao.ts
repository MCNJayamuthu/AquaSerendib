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



export const insertFish = async (payload: FishSpeciesDTO) => {

  const { data, error } = await supabase
    .from('fish_species')
    .insert([payload]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};



export const updateFish = async (id: string, payload: Partial<FishSpeciesDTO>) => {

  const { data, error } = await supabase
    .from('fish_species')
    .update(payload)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};



export const deleteFish = async (id: string) => {

  const { data, error } = await supabase
    .from('fish_species')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const uploadFishImageToStorage = async (
  fileName: string,
  fileBuffer: Buffer
) => {

  const fileData = new Uint8Array(fileBuffer);

  const { error } = await supabase.storage
    .from("fish-images")
    .upload(fileName, fileData, {
      contentType: "image/jpeg"
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage
    .from("fish-images")
    .getPublicUrl(fileName);

  return data.publicUrl;

};