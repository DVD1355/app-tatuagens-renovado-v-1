'use client';

import { TattooStyle } from '../types';
import { Flame, Heart, Sparkles, Grid3x3, Droplet, Hexagon } from 'lucide-react';

interface StyleSelectorProps {
  selectedStyle: TattooStyle;
  onStyleChange: (style: TattooStyle) => void;
}

const styles: { value: TattooStyle; label: string; icon: any; color: string }[] = [
  { value: 'tribal', label: 'Tribal', icon: Flame, color: 'from-orange-500 to-red-600' },
  { value: 'realista', label: 'Realista', icon: Heart, color: 'from-pink-500 to-rose-600' },
  { value: 'minimalista', label: 'Minimalista', icon: Sparkles, color: 'from-cyan-500 to-blue-600' },
  { value: 'tradicional', label: 'Tradicional', icon: Grid3x3, color: 'from-amber-500 to-orange-600' },
  { value: 'aquarela', label: 'Aquarela', icon: Droplet, color: 'from-purple-500 to-pink-600' },
  { value: 'geometrico', label: 'Geométrico', icon: Hexagon, color: 'from-emerald-500 to-teal-600' },
];

export function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {styles.map((style) => {
        const Icon = style.icon;
        const isSelected = selectedStyle === style.value;
        
        return (
          <button
            key={style.value}
            onClick={() => onStyleChange(style.value)}
            className={`
              relative p-4 rounded-2xl border-2 transition-all duration-300
              ${isSelected 
                ? 'border-transparent shadow-2xl scale-105' 
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:scale-102'
              }
            `}
          >
            <div className={`
              absolute inset-0 rounded-2xl bg-gradient-to-br ${style.color} 
              ${isSelected ? 'opacity-100' : 'opacity-0 hover:opacity-10'}
              transition-opacity duration-300
            `} />
            
            <div className="relative flex flex-col items-center gap-2">
              <div className={`
                p-3 rounded-xl bg-gradient-to-br ${style.color}
                ${isSelected ? 'text-white' : 'text-white/90'}
              `}>
                <Icon className="w-6 h-6" />
              </div>
              <span className={`
                text-sm font-semibold
                ${isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}
              `}>
                {style.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
