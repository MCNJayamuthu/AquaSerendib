import { fetchAllFish } from '../dao/fish.dao';

export const getAllFishSpecies = async () => {
  const fishList = await fetchAllFish();

  // Transform to frontend-friendly structure
  return fishList.map((fish) => ({
    id: fish.id,
    name: fish.english_name,
    scientificName: fish.scientific_name,
    sinhalaName: fish.sinhala_name,
    description: fish.habitat,
    location: fish.location,
    conservationStatus: fish.conservation_status,
    imageUrl: fish.image_url,
  }));
};  