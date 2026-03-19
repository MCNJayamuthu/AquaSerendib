import { FishData } from '../types';

export const getFishData = async (): Promise<FishData[]> => {
  const response = await fetch('http://localhost:5000/api/fish');
  if (!response.ok) {
    throw new Error('Failed to fetch fish data');
  }

  return response.json();
};