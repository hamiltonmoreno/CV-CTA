
import React, { useState } from 'react';
import { MOCK_DOCS } from '../constants';
import { FileText, Download, Eye, X, ExternalLink, Printer } from 'lucide-react';
import { Document } from '../types';

const DocumentsPage: React.FC = () => {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  // In a real app, this would be the actual URL from the API/Database
  // We use a sample PDF for demonstration purposes
  const DEMO_PDF_URL = "https://pdfobject.com/pdf/sample.pdf";

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Biblioteca de Documentos</h1>
          <p className="text-gray-600">Manuais, procedimentos operacionais e legislação.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_DOCS.map((doc) => (
            <div key={doc.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-between hover:border-cv-blue transition duration-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-50 p-3 rounded-full">
                    <FileText className="w-6 h-6 text-cv-blue" />
                  </div>
                  <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {doc.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{doc.title}</h3>
                <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                   <span>v{doc.version}</span>
                   <span>•</span>
                   <span>{doc.updatedAt}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-4">
                <span className="text-xs text-gray-400">{doc.size}</span>
                <div className="flex gap-2">
                   <button 
                     onClick={() => setSelectedDoc(doc)}
                     className="flex items-center gap-1 text-cv-blue hover:text-blue-800 px-3 py-1 rounded-md hover:bg-blue-50 transition font-medium text-sm" 
                     title="Visualizar"
                   >
                      <Eye className="w-4 h-4" /> Visualizar
                   </button>
                   <button className="text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100" title="Download">
                      <Download className="w-4 h-4" />
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-6xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Viewer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3">
                 <div className="bg-red-100 p-2 rounded text-red-600">
                    <FileText className="w-5 h-5" />
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900 leading-tight">{selectedDoc.title}</h3>
                    <p className="text-xs text-gray-500">Versão {selectedDoc.version} • {selectedDoc.id}</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded hover:bg-gray-200 text-sm font-medium transition">
                   <Printer className="w-4 h-4" /> Imprimir
                </button>
                <a 
                   href={DEMO_PDF_URL} 
                   target="_blank" 
                   rel="noreferrer"
                   className="hidden md:flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded hover:bg-gray-200 text-sm font-medium transition"
                >
                   <ExternalLink className="w-4 h-4" /> Abrir Nova Aba
                </a>
                <div className="w-px h-6 bg-gray-300 mx-2 hidden md:block"></div>
                <button 
                  onClick={() => setSelectedDoc(null)}
                  className="p-2 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors"
                  title="Fechar"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Viewer Body */}
            <div className="flex-1 bg-gray-200 relative flex flex-col items-center justify-center">
               {/* Simulation Notice */}
               <div className="absolute top-4 z-10 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-yellow-200">
                 Modo de Pré-visualização (Simulação)
               </div>
               
               <iframe 
                 src={`${DEMO_PDF_URL}#toolbar=0`}
                 className="w-full h-full shadow-inner"
                 title="PDF Viewer"
               />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
    