'use client';

import { useState } from 'react';
import { TattooStyle } from '../types';
import { Wand2, Loader2 } from 'lucide-react';

interface AIGeneratorProps {
  style: TattooStyle;
  onGenerate: (prompt: string, imageUrl: string) => void;
}

export function AIGenerator({ style, onGenerate }: AIGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulação de geração de IA (em produção, conectar com API real)
    setTimeout(() => {
      const mockImageUrl = `https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=600&h=600&fit=crop`;
      onGenerate(prompt, mockImageUrl);
      setIsGenerating(false);
    }, 2000);
  };

  const stylePrompts: Record<TattooStyle, string> = {
    tribal: 'padrões tribais com linhas fortes e simétricas',
    realista: 'design hiper-realista com sombreamento detalhado',
    minimalista: 'linhas finas e design clean e simples',
    tradicional: 'estilo old school com cores vibrantes',
    aquarela: 'efeito de aquarela com cores fluidas',
    geometrico: 'formas geométricas precisas e simétricas',
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`Descreva sua tatuagem ${style}... Ex: ${stylePrompts[style]}`}
          className="w-full min-h-32 p-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none
                   resize-none transition-colors"
          disabled={isGenerating}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={!prompt.trim() || isGenerating}
        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600
                 text-white font-bold text-lg shadow-2xl
                 hover:shadow-purple-500/50 hover:scale-105
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                 transition-all duration-300 flex items-center justify-center gap-3"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Gerando sua tatuagem...
          </>
        ) : (
          <>
            <Wand2 className="w-6 h-6" />
            Gerar Tatuagem com IA
          </>
        )}
      </button>
    </div>
  );
}
