import { FishData } from '../types';

/**
 * In a real-world scenario, this data would be fetched from Supabase.
 * e.g., const { data, error } = await supabase.from('fish').select('*');
 */
export const fishDatabase: FishData[] = [
  {
    id: '1',
    name: 'Black Ruby Barb',
    scientificName: 'Pethia nigrofasciata',
    sinhalaName: 'Bulath Hapaya',
    description: 'A popular aquarium fish, the male becomes deep red during the breeding season. Found in shaded, slow-moving streams.',
    location: 'Wet Zone: Kelani to Nilwala basins',
    conservationStatus: 'Vulnerable',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Pethia_nigrofasciata.jpg/640px-Pethia_nigrofasciata.jpg'
  },
  {
    id: '2',
    name: 'Cherry Barb',
    scientificName: 'Puntius titteya',
    sinhalaName: 'Lay Titteya',
    description: 'Small, attractive fish. Males are bright red. They inhabit shallow, slow-flowing streams with leaf litter.',
    location: 'Wet Zone: Kelani to Nilwala basins',
    conservationStatus: 'Vulnerable',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Puntius_titteya.jpg/640px-Puntius_titteya.jpg'
  },
  {
    id: '3',
    name: 'Bandula Barb',
    scientificName: 'Pethia bandula',
    sinhalaName: 'Bandula Pethiya',
    description: 'Critically endangered species found only in a very restricted area. Requires clean, cool water.',
    location: 'Galapitamada, Kegalle District',
    conservationStatus: 'Critically Endangered',
    imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/63143526/medium.jpg'
  },
  {
    id: '4',
    name: 'Sri Lanka Stone Sucker',
    scientificName: 'Garra ceylonensis',
    sinhalaName: 'Gal Pandiya',
    description: 'Adapts to fast-flowing water by clinging to rocks using its specialized mouth. Feeds on algae.',
    location: 'Widespread in flowing streams across Wet & Intermediate zones',
    conservationStatus: 'Near Threatened',
    imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/15748281/medium.jpg'
  },
  {
    id: '5',
    name: 'Wilpita Rasbora',
    scientificName: 'Rasboroides wilpita',
    sinhalaName: 'Wilpita Dandiya',
    description: 'A stunning golden-hued fish found in shaded forest streams. Requires pristine water quality.',
    location: 'Southern Wet Zone (Kalu & Nilwala basins)',
    conservationStatus: 'Endangered',
    imageUrl: 'https://inaturalist-open-data.s3.amazonaws.com/photos/112678122/medium.jpg'
  },
  {
    id: '6',
    name: 'Cuming\'s Barb',
    scientificName: 'Pethia cumingii',
    sinhalaName: 'Pothaya',
    description: 'Distinguished by two black bars on the side. Found in flowing streams with rocky substrates.',
    location: 'Kelani, Kalu, and Bentota river basins',
    conservationStatus: 'Endangered',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Pethia_cumingii_Prague_2011_2.jpg'
  }
];

export const getFishData = async (): Promise<FishData[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fishDatabase);
    }, 800);
  });
};