export type PageView = 'home' | 'about' | 'knowledge' | 'support' | 'plans';

export interface FishData {
  id: string;
  name: string;
  scientificName: string;
  sinhalaName: string;
  description: string;
  location: string;
  conservationStatus: string;
  imageUrl: string;
}

export interface IdentificationResult {
  isEndemic: boolean;
  name?: string;
  scientificName?: string;
  confidence?: string;
  description?: string;
  error?: string;
}
