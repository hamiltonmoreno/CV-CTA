
import React from 'react';
import { MOCK_MEDIA } from '../constants';
import Breadcrumbs from '../components/Breadcrumbs';
import { PlayCircle, Image as ImageIcon } from 'lucide-react';

const Gallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 animate-in fade-in">
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumbs />
          <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-2">Galeria Multimédia</h1>
          <p className="text-gray-400 text-lg">Um olhar por dentro das torres e centros de controlo de Cabo Verde.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_MEDIA.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 group hover:shadow-lg transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full text-gray-800">
                   {item.type === 'video' ? <PlayCircle className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
           <p className="text-gray-500 text-sm">Mais conteúdos visuais disponíveis no nosso Instagram oficial.</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
