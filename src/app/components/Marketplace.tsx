'use client';

import { TattooArtist, TattooDesign } from '../types';
import { Star, MapPin, ExternalLink, ShoppingBag } from 'lucide-react';

const mockArtists: TattooArtist[] = [
  {
    id: '1',
    name: 'Ana Silva',
    specialty: ['realista', 'aquarela'],
    rating: 4.9,
    location: 'São Paulo, SP',
    portfolio: [
      'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=300&h=300&fit=crop',
    ],
    priceRange: 'R$ 300 - R$ 800',
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    specialty: ['tribal', 'geometrico'],
    rating: 4.8,
    location: 'Rio de Janeiro, RJ',
    portfolio: [
      'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1590246814883-57c511e5c58e?w=300&h=300&fit=crop',
    ],
    priceRange: 'R$ 250 - R$ 600',
  },
  {
    id: '3',
    name: 'Marina Costa',
    specialty: ['minimalista', 'tradicional'],
    rating: 5.0,
    location: 'Belo Horizonte, MG',
    portfolio: [
      'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=300&h=300&fit=crop',
    ],
    priceRange: 'R$ 200 - R$ 500',
  },
];

const mockDesigns: TattooDesign[] = [
  {
    id: '1',
    title: 'Leão Realista',
    style: 'realista',
    artist: 'Ana Silva',
    price: 450,
    imageUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?w=400&h=400&fit=crop',
    tags: ['animal', 'força', 'detalhado'],
  },
  {
    id: '2',
    title: 'Mandala Tribal',
    style: 'tribal',
    artist: 'Carlos Mendes',
    price: 350,
    imageUrl: 'https://images.unsplash.com/photo-1565058379802-bbe93b2f703a?w=400&h=400&fit=crop',
    tags: ['mandala', 'simetria', 'espiritual'],
  },
  {
    id: '3',
    title: 'Flor Minimalista',
    style: 'minimalista',
    artist: 'Marina Costa',
    price: 280,
    imageUrl: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400&h=400&fit=crop',
    tags: ['flor', 'delicado', 'simples'],
  },
];

export function Marketplace() {
  return (
    <div className="space-y-8">
      {/* Seção de Tatuadores */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Tatuadores em Destaque
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArtists.map((artist) => (
            <div
              key={artist.id}
              className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-800 p-6 hover:shadow-2xl 
                       transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    {artist.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {artist.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                <MapPin className="w-4 h-4" />
                {artist.location}
              </div>

              <div className="flex gap-2 mb-4">
                {artist.portfolio.slice(0, 2).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Portfolio ${idx + 1}`}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                ))}
              </div>

              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                {artist.priceRange}
              </div>

              <button className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600
                               text-white font-semibold hover:shadow-lg transition-all duration-300
                               flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Ver Perfil
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Designs */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Designs Exclusivos
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDesigns.map((design) => (
            <div
              key={design.id}
              className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 
                       bg-white dark:bg-gray-800 overflow-hidden hover:shadow-2xl 
                       transition-all duration-300 hover:scale-105"
            >
              <img
                src={design.imageUrl}
                alt={design.title}
                className="w-full h-64 object-cover"
              />
              
              <div className="p-4">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {design.title}
                </h4>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  por {design.artist}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {design.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 
                               text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    R$ {design.price}
                  </span>
                  <button className="p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600
                                   text-white hover:shadow-lg transition-all duration-300">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
