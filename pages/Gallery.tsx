
import React, { useState } from 'react';
import { MOCK_MEDIA } from '../constants';
import Breadcrumbs from '../components/Breadcrumbs';
import { PlayCircle, Image as ImageIcon, X, ZoomIn } from 'lucide-react';
import { MediaItem } from '../types';

const Gallery: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

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
            <div 
              key={item.id} 
              onClick={() => setSelectedMedia(item)}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 group hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={`${item.url}?w=600&q=80&fm=webp`} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                
                {/* Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                      <ZoomIn className="w-8 h-8 text-white" />
                   </div>
                </div>

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

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedMedia(null)}
        >
           <button 
             onClick={() => setSelectedMedia(null)}
             className="absolute top-6 right-6 text-white/70 hover:text-white p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
           >
             <X className="w-8 h-8" />
           </button>

           <div 
             className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
             onClick={(e) => e.stopPropagation()}
           >
              <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
                 <img 
                   src={`${selectedMedia.url}?w=1600&q=90&fm=webp`}
                   alt={selectedMedia.title}
                   className="w-full h-auto max-h-[80vh] object-contain bg-black"
                 />
              </div>
              <div className="mt-6 text-center text-white">
                 <h2 className="text-2xl font-bold mb-2">{selectedMedia.title}</h2>
                 <p className="text-gray-300">{selectedMedia.description}</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
