// Types para o aplicativo de tatuagens com IA

export type TattooStyle = 
  | 'tribal' 
  | 'realista' 
  | 'minimalista' 
  | 'tradicional' 
  | 'aquarela' 
  | 'geometrico';

export interface TattooProject {
  id: string;
  name: string;
  style: TattooStyle;
  prompt: string;
  imageUrl?: string;
  bodyPart: string;
  createdAt: string;
  updatedAt: string;
}

export interface TattooArtist {
  id: string;
  name: string;
  specialty: TattooStyle[];
  rating: number;
  location: string;
  portfolio: string[];
  priceRange: string;
}

export interface TattooDesign {
  id: string;
  title: string;
  style: TattooStyle;
  artist: string;
  price: number;
  imageUrl: string;
  tags: string[];
}

export interface UserPreferences {
  favoriteStyles: TattooStyle[];
  savedProjects: string[];
  viewedArtists: string[];
  theme: 'light' | 'dark';
}
