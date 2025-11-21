import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_NEWS } from '../constants';
import { ArrowRight, ShieldCheck, Globe2, Users, Lock, MapPin, History, BarChart3, Target, Award, PlayCircle, Plane } from 'lucide-react';

const Home: React.FC = () => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-in fade-in duration-500 font-sans">
      {/* Hero Section - Institutional Focus */}
      <section className="relative bg-gray-900 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Torre de Controlo e Pista" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
          <div className="md:w-2/3 lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-md">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              Serviço Público de Excelência
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              Céus Seguros,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Destinos Conectados.</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              A autoridade responsável pela gestão, ordenamento e segurança de um dos espaços aéreos mais estratégicos do Atlântico: a <span className="text-white font-semibold">Sal Oceanic FIR</span>.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('quem-somos')}
                className="bg-cv-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/50 flex items-center gap-2 group"
              >
                Conheça a Nossa Missão <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('association-area')?.scrollIntoView({behavior: 'smooth'})} 
                className="bg-transparent text-white border border-gray-600 px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                Área do Associado
              </button>
            </div>
          </div>
        </div>

        {/* Floating Stats Strip */}
        <div className="absolute bottom-0 w-full bg-white/5 backdrop-blur-md border-t border-white/10 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-4 divide-x divide-white/10 py-6">
             <div className="px-6 text-center">
                <p className="text-3xl font-bold text-white">3.0M+</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Km² de Espaço Aéreo</p>
             </div>
             <div className="px-6 text-center">
                <p className="text-3xl font-bold text-white">50k+</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Movimentos Anuais</p>
             </div>
             <div className="px-6 text-center">
                <p className="text-3xl font-bold text-white">4</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Aeroportos Internacionais</p>
             </div>
             <div className="px-6 text-center">
                <p className="text-3xl font-bold text-emerald-400">100%</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Compromisso Segurança</p>
             </div>
          </div>
        </div>
      </section>

      {/* Institutional Values Section */}
      <section id="quem-somos" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-cv-blue uppercase tracking-widest mb-3">Quem Somos</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Pilares da Navegação Aérea</h3>
            <p className="text-gray-600 text-lg">
              Para além de controlar aviões, garantimos a soberania nacional e facilitamos o comércio e turismo global através de três princípios fundamentais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Target className="w-32 h-32 text-cv-blue" />
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 text-cv-blue group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Missão</h4>
              <p className="text-gray-600 leading-relaxed">
                Prover serviços de navegação aérea seguros, eficientes e sustentáveis na FIR do Sal, cumprindo rigorosamente as normas da ICAO e da regulamentação nacional.
              </p>
            </div>

            <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Globe2 className="w-32 h-32 text-emerald-600" />
              </div>
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-8 text-emerald-600 group-hover:scale-110 transition-transform">
                <Globe2 className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Visão</h4>
              <p className="text-gray-600 leading-relaxed">
                Ser um prestador de serviços de referência no Atlântico Médio, reconhecido pela inovação tecnológica e pela excelência do seu capital humano.
              </p>
            </div>

            <div className="bg-gray-50 p-10 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Award className="w-32 h-32 text-amber-600" />
              </div>
              <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-8 text-amber-600 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Valores</h4>
              <p className="text-gray-600 leading-relaxed">
                Rigor técnico, Integridade profissional, Trabalho em equipa e Resiliência operacional. O fator humano é o nosso ativo mais valioso.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Map Simulation Section */}
      <section className="py-20 bg-gray-100 relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
               <div className="lg:w-1/2">
                  <h2 className="text-sm font-bold text-cv-blue uppercase tracking-widest mb-3">Ao Vivo</h2>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Tráfego em Tempo Real</h3>
                  <p className="text-gray-600 mb-6 text-lg">
                     Observe o fluxo contínuo de aeronaves que cruzam a FIR do Sal neste momento. Mais de 150 voos são geridos diariamente pelos nossos controladores.
                  </p>
                  <div className="flex items-center gap-3 mb-8">
                     <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                     </span>
                     <span className="text-sm font-medium text-gray-700">Sinal Radar Ativo</span>
                  </div>
                  <Link to="/gallery" className="inline-flex items-center gap-2 bg-white text-gray-900 border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition shadow-sm group">
                     <PlayCircle className="w-5 h-5 text-cv-blue" />
                     Ver Galeria Multimédia
                  </Link>
               </div>
               
               {/* Map Container */}
               <div className="lg:w-1/2 w-full h-[400px] bg-blue-900 rounded-2xl shadow-2xl overflow-hidden relative border border-gray-300 group">
                  {/* Static Map Simulation */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                  
                  {/* Grid overlay */}
                  <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                  {/* Animated Planes */}
                  <div className="absolute top-1/4 left-1/4 animate-[pulse_4s_infinite]">
                     <Plane className="w-6 h-6 text-yellow-400 transform rotate-45 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                     <span className="absolute -top-4 left-6 text-[10px] text-yellow-400 font-mono bg-black/50 px-1 rounded">TP218 FL360</span>
                  </div>
                  
                  <div className="absolute bottom-1/3 right-1/3 animate-[pulse_5s_infinite]">
                     <Plane className="w-6 h-6 text-yellow-400 transform -rotate-12 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]" />
                     <span className="absolute -top-4 left-6 text-[10px] text-yellow-400 font-mono bg-black/50 px-1 rounded">AF459 FL380</span>
                  </div>

                  <div className="absolute top-1/2 right-10 animate-[pulse_6s_infinite]">
                     <Plane className="w-6 h-6 text-green-400 transform rotate-90 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                     <span className="absolute -top-4 left-6 text-[10px] text-green-400 font-mono bg-black/50 px-1 rounded">VR602 FL120</span>
                  </div>

                  {/* Radar Sweep Effect */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="w-[600px] h-[600px] border border-green-500/20 rounded-full relative animate-[spin_4s_linear_infinite]">
                        <div className="absolute top-1/2 left-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent to-green-500/30 origin-left transform -translate-y-1/2"></div>
                     </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur px-3 py-1 rounded text-xs text-green-400 font-mono">
                     RADAR FEED: SIMULATION MODE
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* The "Sal Oceanic FIR" Feature Section */}
      <section id="contexto" className="py-20 bg-gray-900 text-white overflow-hidden relative scroll-mt-20">
         <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600 rounded-full mix-blend-overlay filter blur-[100px] opacity-20"></div>
         </div>
         
         <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
               <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-4">Contexto Geoestratégico</h2>
               <h3 className="text-4xl font-bold mb-6">A Encruzilhada do Atlântico</h3>
               <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  A Região de Informação de Voo (FIR) do Sal é um vasto polígono no oceano que conecta a Europa à América do Sul e a África Ocidental à América do Norte.
               </p>
               <p className="text-gray-400 mb-8">
                  A partir do Centro de Controlo Oceânico (ACC) na Ilha do Sal, os nossos controladores utilizam tecnologias ADS-B e comunicações por satélite (CPDLC) para monitorizar aeronaves a milhares de quilómetros de distância, onde o radar convencional não alcança.
               </p>
               
               <div className="grid grid-cols-2 gap-6">
                  <div className="border-l-2 border-blue-500 pl-4">
                     <span className="block text-2xl font-bold text-white">Classe A</span>
                     <span className="text-sm text-gray-400">Espaço Aéreo Superior</span>
                  </div>
                  <div className="border-l-2 border-emerald-500 pl-4">
                     <span className="block text-2xl font-bold text-white">RVSM</span>
                     <span className="text-sm text-gray-400">Separação Vertical Reduzida</span>
                  </div>
               </div>
            </div>
            <div className="lg:w-1/2">
               <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl bg-gray-800">
                  <img 
                    src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                    alt="Vista de Satélite Ilha do Sal" 
                    className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6">
                     <p className="text-white font-mono text-sm">CENTRO DE CONTROLO OCEÂNICO - SAL (GVAC)</p>
                     <p className="text-blue-300 text-xs">16° 44′ 13″ N, 22° 57′ 9″ W</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Timeline / History Section */}
      <section id="historia" className="py-20 bg-gray-50 scroll-mt-20">
         <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-gray-900">Uma História de Evolução</h2>
               <p className="text-gray-600 mt-4">A evolução do controlo de tráfego aéreo acompanha a própria história de Cabo Verde.</p>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
               
               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-200 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                     <History className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                     <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-gray-900">Independência & ASA</div>
                        <time className="font-mono text-xs font-medium text-gray-500">1975-1984</time>
                     </div>
                     <div className="text-gray-600 text-sm">Nascimento da nação e criação da Empresa Nacional de Aeroportos e Segurança Aérea, assumindo a gestão plena dos aeródromos.</div>
                  </div>
               </div>

               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                     <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                     <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-gray-900">Modernização do Sal</div>
                        <time className="font-mono text-xs font-medium text-gray-500">Anos 90</time>
                     </div>
                     <div className="text-gray-600 text-sm">Consolidação do Aeroporto Amílcar Cabral como hub internacional e implementação de novos sistemas de rádio e radar primário.</div>
                  </div>
               </div>

               <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-emerald-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                     <Globe2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                     <div className="flex items-center justify-between space-x-2 mb-1">
                        <div className="font-bold text-gray-900">Era Digital & Satélite</div>
                        <time className="font-mono text-xs font-medium text-gray-500">Presente</time>
                     </div>
                     <div className="text-gray-600 text-sm">Implementação total de vigilância ADS-B, comunicações de dados CPDLC e gestão de fluxo (ATFM) para otimizar rotas atlânticas.</div>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* Latest News Section - Condensed */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-cv-blue font-bold tracking-wider uppercase text-sm mb-2 block">Atualidade</span>
              <h2 className="text-3xl font-bold text-gray-900">Notícias Institucionais</h2>
            </div>
            <Link to="/news" className="hidden md:flex text-gray-600 font-medium hover:text-cv-blue items-center gap-1">
              Ver todas as notícias <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_NEWS.slice(0, 3).map((news) => (
              <article key={news.id} className="group cursor-pointer flex flex-col h-full">
                <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                  <img 
                    src={news.imageUrl} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-3 left-3">
                     <span className="bg-white/90 backdrop-blur text-gray-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide shadow-sm">
                       {news.category}
                     </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="text-xs text-gray-400 mb-2">{news.date}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-cv-blue transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {news.summary}
                  </p>
                  <span className="text-cv-blue font-medium text-sm flex items-center gap-1 mt-auto group-hover:underline">
                    Ler mais
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Association / Member Area - Distinct from Public Info */}
      <section id="association-area" className="py-20 bg-gray-900 text-white relative overflow-hidden border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold">Área Reservada</h2>
            </div>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Portal exclusivo para controladores ativos e membros da Associação. Acesso seguro a escalas, reportes operacionais e documentação técnica interna.
            </p>
            <div className="flex gap-4">
                <Link to="/login" className="bg-white text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
                    Aceder à Intranet
                </Link>
                <Link to="/contact" className="border border-gray-600 text-gray-300 font-medium py-3 px-6 rounded-lg hover:bg-white/5 transition-colors">
                    Solicitar Acesso
                </Link>
            </div>
          </div>
          
          {/* Quick Public Links grid */}
          <div className="md:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/notams" className="bg-gray-800 hover:bg-gray-750 border border-gray-700 p-6 rounded-xl transition group">
                 <MapPin className="text-blue-400 w-8 h-8 mb-4" />
                 <h3 className="font-bold text-white mb-1">NOTAMs Públicos</h3>
                 <p className="text-sm text-gray-400 group-hover:text-gray-300">Consulta de avisos aeronáuticos.</p>
              </Link>
              <Link to="/careers" className="bg-gray-800 hover:bg-gray-750 border border-gray-700 p-6 rounded-xl transition group">
                 <Users className="text-emerald-400 w-8 h-8 mb-4" />
                 <h3 className="font-bold text-white mb-1">Recrutamento</h3>
                 <p className="text-sm text-gray-400 group-hover:text-gray-300">Junte-se à nossa equipa.</p>
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;