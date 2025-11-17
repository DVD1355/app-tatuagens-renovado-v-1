'use client';

import { useState } from 'react';
import { TattooStyle, TattooProject } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { StyleSelector } from './components/StyleSelector';
import { AIGenerator } from './components/AIGenerator';
import { ARViewer } from './components/ARViewer';
import { Marketplace } from './components/Marketplace';
import { ProjectsList } from './components/ProjectsList';
import { Sparkles, Camera, ShoppingBag, BookOpen, Save, FolderOpen } from 'lucide-react';

type TabType = 'generator' | 'ar' | 'marketplace' | 'ebook' | 'projects';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('generator');
  const [selectedStyle, setSelectedStyle] = useState<TattooStyle>('tribal');
  const [currentImage, setCurrentImage] = useState<string>();
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  
  const [projects, setProjects] = useLocalStorage<TattooProject[]>('tattoo-projects', []);

  const handleGenerate = (prompt: string, imageUrl: string) => {
    setCurrentPrompt(prompt);
    setCurrentImage(imageUrl);
    setActiveTab('ar');
  };

  const handleSaveProject = () => {
    if (!currentImage || !currentPrompt) return;

    const newProject: TattooProject = {
      id: Date.now().toString(),
      name: `Tatuagem ${selectedStyle}`,
      style: selectedStyle,
      prompt: currentPrompt,
      imageUrl: currentImage,
      bodyPart: 'Braço',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProjects([newProject, ...projects]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const tabs = [
    { id: 'generator' as TabType, label: 'Gerador IA', icon: Sparkles, color: 'from-purple-500 to-pink-600' },
    { id: 'ar' as TabType, label: 'Visualizar AR', icon: Camera, color: 'from-cyan-500 to-blue-600' },
    { id: 'marketplace' as TabType, label: 'Marketplace', icon: ShoppingBag, color: 'from-emerald-500 to-teal-600' },
    { id: 'ebook' as TabType, label: 'eBook', icon: BookOpen, color: 'from-orange-500 to-red-600' },
    { id: 'projects' as TabType, label: 'Projetos', icon: FolderOpen, color: 'from-amber-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  TattooAI Studio
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Crie tatuagens únicas com Inteligência Artificial
                </p>
              </div>
            </div>

            {currentImage && activeTab === 'ar' && (
              <button
                onClick={handleSaveProject}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl 
                         bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold
                         hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Save className="w-5 h-5" />
                Salvar Projeto
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 py-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap
                    transition-all duration-300
                    ${isActive
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Generator Tab */}
        {activeTab === 'generator' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                Escolha o Estilo da sua Tatuagem
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Selecione um estilo e descreva sua tatuagem ideal
              </p>
            </div>

            <StyleSelector
              selectedStyle={selectedStyle}
              onStyleChange={setSelectedStyle}
            />

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Descreva sua Tatuagem
              </h3>
              <AIGenerator
                style={selectedStyle}
                onGenerate={handleGenerate}
              />
            </div>
          </div>
        )}

        {/* AR Viewer Tab */}
        {activeTab === 'ar' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                  Visualize em Realidade Aumentada
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Veja como sua tatuagem ficaria no corpo
                </p>
              </div>

              {currentImage && (
                <button
                  onClick={handleSaveProject}
                  className="sm:hidden flex items-center gap-2 px-4 py-2 rounded-xl 
                           bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold
                           hover:shadow-lg transition-all duration-300"
                >
                  <Save className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border-2 border-gray-200 dark:border-gray-700">
              <ARViewer imageUrl={currentImage} />
            </div>
          </div>
        )}

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                Marketplace de Tatuagens
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Encontre tatuadores profissionais e designs exclusivos
              </p>
            </div>

            <Marketplace />
          </div>
        )}

        {/* eBook Tab */}
        {activeTab === 'ebook' && (
          <div className="animate-fade-in">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 sm:p-12 text-white shadow-2xl">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <BookOpen className="w-20 h-20 mx-auto" />
                
                <h2 className="text-4xl font-bold">
                  Guia Completo de Tatuagens
                </h2>
                
                <p className="text-xl text-white/90">
                  Aprenda tudo sobre estilos, cuidados, escolha de tatuadores e muito mais
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-2">50+ Páginas</h3>
                    <p className="text-sm text-white/80">Conteúdo completo e ilustrado</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-2">10 Estilos</h3>
                    <p className="text-sm text-white/80">Guia detalhado de cada estilo</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-2">Dicas Pro</h3>
                    <p className="text-sm text-white/80">Insights de profissionais</p>
                  </div>
                </div>

                <button className="mt-8 px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold text-lg
                                 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  Baixar eBook Grátis
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                Meus Projetos
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Gerencie suas tatuagens salvas
              </p>
            </div>

            <ProjectsList
              projects={projects}
              onDelete={handleDeleteProject}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 TattooAI Studio - Criado com IA para revolucionar o mundo das tatuagens
          </p>
        </div>
      </footer>
    </div>
  );
}
