'use client';

import { useState } from 'react';
import { Camera, X, RotateCcw } from 'lucide-react';

interface ARViewerProps {
  imageUrl?: string;
}

const bodyParts = [
  { id: 'arm', label: 'Braço', position: 'top-1/4 left-1/4' },
  { id: 'shoulder', label: 'Ombro', position: 'top-1/6 left-1/3' },
  { id: 'chest', label: 'Peito', position: 'top-1/3 left-1/2' },
  { id: 'back', label: 'Costas', position: 'top-1/2 left-1/2' },
  { id: 'leg', label: 'Perna', position: 'bottom-1/4 left-1/3' },
];

export function ARViewer({ imageUrl }: ARViewerProps) {
  const [selectedPart, setSelectedPart] = useState('arm');
  const [showOverlay, setShowOverlay] = useState(false);

  if (!imageUrl) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 
                    bg-gray-50 dark:bg-gray-800/50 p-12 text-center">
        <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Gere uma tatuagem para visualizar em AR
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Seletor de parte do corpo */}
      <div className="flex flex-wrap gap-2">
        {bodyParts.map((part) => (
          <button
            key={part.id}
            onClick={() => setSelectedPart(part.id)}
            className={`
              px-4 py-2 rounded-xl font-medium transition-all duration-300
              ${selectedPart === part.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
          >
            {part.label}
          </button>
        ))}
      </div>

      {/* Visualizador AR */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 aspect-[3/4] shadow-2xl">
        {/* Imagem de fundo simulando corpo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-96 bg-gradient-to-b from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 rounded-full opacity-50" />
        </div>

        {/* Overlay da tatuagem */}
        {showOverlay && (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <img
              src={imageUrl}
              alt="Tatuagem preview"
              className="w-48 h-48 object-contain opacity-80 animate-fade-in"
            />
          </div>
        )}

        {/* Controles */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
          <button
            onClick={() => setShowOverlay(!showOverlay)}
            className="px-6 py-3 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                     text-gray-900 dark:text-white font-semibold shadow-lg
                     hover:scale-105 transition-transform"
          >
            {showOverlay ? (
              <><X className="w-5 h-5 inline mr-2" />Ocultar</>
            ) : (
              <><Camera className="w-5 h-5 inline mr-2" />Visualizar</>
            )}
          </button>
          
          <button
            onClick={() => setShowOverlay(false)}
            className="p-3 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm
                     text-gray-900 dark:text-white shadow-lg
                     hover:scale-105 transition-transform"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
