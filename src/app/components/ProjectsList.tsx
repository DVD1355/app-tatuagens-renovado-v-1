'use client';

import { TattooProject } from '../types';
import { Trash2, Download, Calendar } from 'lucide-react';

interface ProjectsListProps {
  projects: TattooProject[];
  onDelete: (id: string) => void;
}

export function ProjectsList({ projects, onDelete }: ProjectsListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">Nenhum projeto salvo ainda</p>
        <p className="text-sm mt-2">Crie sua primeira tatuagem com IA!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 
                   bg-white dark:bg-gray-800 overflow-hidden hover:shadow-2xl 
                   transition-all duration-300 hover:scale-105"
        >
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.name}
              className="w-full h-48 object-cover"
            />
          )}
          
          <div className="p-4">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {project.name}
            </h4>
            
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <span className="px-2 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/30 
                             text-purple-700 dark:text-purple-300 font-medium">
                {project.style}
              </span>
              <span>•</span>
              <span>{project.bodyPart}</span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              {project.prompt}
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 mb-4">
              <Calendar className="w-3 h-3" />
              {new Date(project.createdAt).toLocaleDateString('pt-BR')}
            </div>

            <div className="flex gap-2">
              <button
                className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600
                         text-white font-semibold hover:shadow-lg transition-all duration-300
                         flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Baixar
              </button>
              
              <button
                onClick={() => onDelete(project.id)}
                className="p-2 rounded-xl bg-red-500 text-white hover:bg-red-600 
                         transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
