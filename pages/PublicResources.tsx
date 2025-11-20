
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, FileText, CloudSun, ArrowRight, BookOpen, Search, Wind, Info } from 'lucide-react';

const PublicResources: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in duration-500 pb-20">
      {/* Hero Header */}
      <div className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img 
             src="https://images.unsplash.com/photo-1559297434-fae8a1916a79?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
             alt="Aeronautical Charts" 
             className="w-full h-full object-cover"
           />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
             <h1 className="text-4xl md:text-5xl font-bold mb-6">Centro de Recursos Públicos</h1>
             <p className="text-xl text-gray-300 leading-relaxed">
               Acesso livre a informações aeronáuticas essenciais (AIS), documentação para pesquisa e ferramentas de planeamento de voo na FIR Sal.
             </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: NOTAMs (Existing) */}
          <Link to="/notams" className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-cv-blue hover:shadow-xl transition-all duration-300">
             <div className="flex items-start justify-between mb-6">
                <div className="bg-red-100 p-4 rounded-xl group-hover:bg-red-600 transition-colors duration-300">
                   <MapPin className="w-8 h-8 text-red-600 group-hover:text-white" />
                </div>
                <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-cv-blue group-hover:translate-x-1 transition-transform" />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">NOTAMs & Alertas</h2>
             <p className="text-gray-600 mb-4">
               Consulte avisos aos aeronavegantes em tempo real, verifique o estado operacional dos aeroportos e subscreva a alertas por SMS/Email.
             </p>
             <span className="text-sm font-bold text-cv-blue uppercase tracking-wide">Aceder Sistema Operacional</span>
          </Link>

          {/* Card 2: Documents (Requested Feature) */}
          <Link to="/documents" className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-cv-blue hover:shadow-xl transition-all duration-300">
             <div className="flex items-start justify-between mb-6">
                <div className="bg-blue-100 p-4 rounded-xl group-hover:bg-cv-blue transition-colors duration-300">
                   <BookOpen className="w-8 h-8 text-cv-blue group-hover:text-white" />
                </div>
                <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-cv-blue group-hover:translate-x-1 transition-transform" />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-3">Biblioteca & Pesquisa</h2>
             <p className="text-gray-600 mb-4">
               Repositório público de manuais técnicos, regulamentação aérea (CV-CAR), cartas aeronáuticas e material de estudo para pilotos e controladores.
             </p>
             <span className="text-sm font-bold text-cv-blue uppercase tracking-wide">Consultar Documentação</span>
          </Link>

        </div>
      </div>

      {/* Additional Info Section (Weather & Tools) */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
         <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <Info className="w-6 h-6 text-gray-400" />
            Informação de Apoio ao Voo
         </h2>
         
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Simulated Weather Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                     <CloudSun className="w-5 h-5 text-amber-500" />
                     Meteorologia Aeronáutica (METAR)
                  </h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-bold">Live</span>
               </div>
               
               <div className="space-y-4 font-mono text-sm">
                  <div className="p-3 bg-gray-50 rounded border-l-4 border-green-500">
                     <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>GVAC (Sal)</span>
                        <span>141530Z</span>
                     </div>
                     <p className="text-gray-800">GVAC 141530Z 04012KT 9999 FEW020 28/20 Q1012 NOSIG</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded border-l-4 border-blue-500">
                     <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>GVNP (Praia)</span>
                        <span>141530Z</span>
                     </div>
                     <p className="text-gray-800">GVNP 141530Z 02018KT 8000 HZ SKC 29/21 Q1011 TEMPO 02025G35KT</p>
                  </div>
               </div>
            </div>

            {/* Quick Tools Links */}
            <div className="bg-blue-50 rounded-xl border border-blue-100 p-6">
               <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Wind className="w-5 h-5" />
                  Links Úteis
               </h3>
               <ul className="space-y-3">
                  <li>
                     <a href="#" className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-700 bg-white p-3 rounded border border-transparent hover:border-blue-200 transition">
                        <span>Submeter Plano de Voo (FPL)</span>
                        <ArrowRight className="w-4 h-4" />
                     </a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-700 bg-white p-3 rounded border border-transparent hover:border-blue-200 transition">
                        <span>Calculadora de Performance</span>
                        <ArrowRight className="w-4 h-4" />
                     </a>
                  </li>
                  <li>
                     <a href="#" className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-700 bg-white p-3 rounded border border-transparent hover:border-blue-200 transition">
                        <span>Publicações AIP (eAIP)</span>
                        <ArrowRight className="w-4 h-4" />
                     </a>
                  </li>
               </ul>
            </div>

         </div>
      </div>
    </div>
  );
};

export default PublicResources;
