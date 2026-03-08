import { fetchAllFish, insertFish, updateFish, deleteFish } from '../dao/fish.dao';
import { FishSpeciesDTO } from '../dto/FishSpeciesDTO';
import { uploadFishImageToStorage } from "../dao/fish.dao";


export const uploadFishImage = async (file: Express.Multer.File) => {

  const fileName = `${Date.now()}-${file.originalname}`;

  const imageUrl = await uploadFishImageToStorage(fileName, file.buffer);

  return imageUrl;

};

export const getAllFishSpecies = async () => {

  const fishList = await fetchAllFish();

  return fishList.map((fish) => ({
    id: fish.id,
    english_name: fish.english_name,
    scientific_name: fish.scientific_name,
    sinhala_name: fish.sinhala_name,
    habitat: fish.habitat,
    description: fish.description,
    location: fish.location,
    conservationStatus: fish.conservation_status,
    image_url: fish.image_url,
  }));

};



export const createFishSpecies = async (payload: FishSpeciesDTO) => {

  return await insertFish(payload);

};



export const editFishSpecies = async (
  id: string,
  payload: Partial<FishSpeciesDTO>
) => {

  return await updateFish(id, payload);

};



export const removeFishSpecies = async (id: string) => {

  return await deleteFish(id);

};