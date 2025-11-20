import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, MapPin, Clock, Briefcase, GraduationCap, Languages, Brain, HeartPulse, ArrowRight, Plane, Radio, Globe2, Eye } from 'lucide-react';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  deadline: string;
  isHot?: boolean;
}

const OPEN_POSITIONS: JobPosition[] = [
  {
    id: 'JOB-2025-01',
    title: 'Controlador de Tráfego Aéreo Estagiário (Ab-initio)',
    department: 'Operações - Formação',
    location: 'Ilha do Sal (GVAC)',
    type: 'Tempo Inteiro',
    deadline: '30 Out 2025',
    isHot: true
  },
  {
    id: 'JOB-2025-04',
    title: 'Técnico de Sistemas CNS (Com, Nav, Surv)',
    department: 'Engenharia & Manutenção',
    location: 'Praia (GVNP)',
    type: 'Tempo Inteiro',
    deadline: '15 Nov 2025'
  },
  {
    id: 'JOB-2025-07',
    title: 'Especialista em Segurança Operacional (Safety)',
    department: 'Gabinete de Segurança',
    location: 'Ilha do Sal (GVAC)',
    type: 'Consultoria',
    deadline: 'Aberto'
  }
];

const Careers: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 font-sans bg-gray-50 pb-20">
      
      {/* Hero Section */}
      <section className="relative h-[500px] bg-gray-900 flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1583070386038-5293b9476963?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="Controlador de Tráfego Aéreo Radar" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
              Junte-se à Elite
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              A Sua Voz Pode Guiar o Mundo.
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Ser Controlador de Tráfego Aéreo em Cabo Verde é gerir uma das encruzilhadas mais vitais do Atlântico. Uma carreira de precisão, responsabilidade e prestígio global.
            </p>
            <button 
              onClick={() => document.getElementById('vagas')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-cv-blue text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-blue-900/50"
            >
              Ver Vagas Abertas
            </button>
          </div>
        </div>
      </section>

      {/* What is CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">O que é CTA?</h2>
            <p className="text-cv-blue font-medium uppercase tracking-wider text-sm">Controlador de Tráfego Aéreo</p>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              A carreira de controlador divide-se em três especialidades fundamentais, cada uma garantindo a segurança em diferentes fases do voo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card TWR */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition duration-300 group relative">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform border border-gray-100">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Torre (Aeródromo)</h3>
              <div className="w-12 h-1 bg-blue-600 mb-4 rounded-full"></div>
              <p className="text-gray-600 text-sm leading-relaxed">
                <strong>O "olho" local.</strong> Gere aterragens, descolagens e a movimentação de aeronaves e veículos no solo. Trabalha no topo da torre com contacto visual direto (VCR).
              </p>
            </div>

            {/* Card APP */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition duration-300 group relative">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform border border-gray-100">
                <Radio className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aproximação (APP)</h3>
              <div className="w-12 h-1 bg-amber-600 mb-4 rounded-full"></div>
              <p className="text-gray-600 text-sm leading-relaxed">
                <strong>O organizador.</strong> Gere o tráfego num raio de 40-60 milhas (TMA) ao redor dos aeroportos. Utiliza radar para sequenciar chegadas e partidas, garantindo separação segura.
              </p>
            </div>

            {/* Card ACC */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition duration-300 group relative overflow-hidden">
              <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform border border-gray-100 relative z-10">
                <Globe2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Área (Oceânico)</h3>
              <div className="w-12 h-1 bg-emerald-600 mb-4 rounded-full relative z-10"></div>
              <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                <strong>O guardião do Atlântico.</strong> Gere aeronaves em altitude de cruzeiro (En-route) num vasto espaço aéreo oceânico. Utiliza satélite (CPDLC/ADS-C) para guiar voos intercontinentais.
              </p>
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full -mr-10 -mt-10 opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-600 rounded-full filter blur-[100px] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Perfil do Candidato</h2>
              <p className="text-gray-300 mb-8 text-lg">
                A profissão exige um perfil muito específico. Não procuramos apenas currículos académicos, procuramos aptidão cognitiva e estabilidade emocional.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg h-fit">
                    <GraduationCap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Habilitações Literárias</h4>
                    <p className="text-gray-400 text-sm">Mínimo 12º ano de escolaridade (Área de Ciências/Tecnologias preferencial). Licenciatura é valorizada.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg h-fit">
                    <Languages className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Proficiência Linguística</h4>
                    <p className="text-gray-400 text-sm">Domínio total do Português e Inglês (Nível B2 ou superior). O Inglês é a língua oficial da aviação.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg h-fit">
                    <Brain className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Aptidão Cognitiva</h4>
                    <p className="text-gray-400 text-sm">Excelente raciocínio espacial, memória de curto prazo, capacidade de multitarefa e tomada de decisão sob pressão.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg h-fit">
                    <HeartPulse className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Saúde Médica</h4>
                    <p className="text-gray-400 text-sm">Capacidade para obter o Certificado Médico Classe 3 (Visão, Audição e Estabilidade Psicológica).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Timeline */}
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold mb-8 text-center">Jornada de Admissão</h3>
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-gray-700">
                
                <div className="relative flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 z-10 ring-4 ring-gray-800 font-bold">1</div>
                  <div className="bg-gray-700/50 p-4 rounded-lg flex-1">
                    <h4 className="font-bold text-blue-300">Candidatura & Triagem</h4>
                    <p className="text-xs text-gray-400">Análise documental e curricular.</p>
                  </div>
                </div>

                <div className="relative flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0 z-10 ring-4 ring-gray-800 font-bold text-gray-400">2</div>
                  <div className="bg-gray-700/50 p-4 rounded-lg flex-1">
                    <h4 className="font-bold text-white">Testes Psicotécnicos (FEAST)</h4>
                    <p className="text-xs text-gray-400">Avaliação de QI, inglês e perfil psicológico.</p>
                  </div>
                </div>

                <div className="relative flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0 z-10 ring-4 ring-gray-800 font-bold text-gray-400">3</div>
                  <div className="bg-gray-700/50 p-4 rounded-lg flex-1">
                    <h4 className="font-bold text-white">Inspeção Médica</h4>
                    <p className="text-xs text-gray-400">Exames rigorosos de saúde aeronáutica.</p>
                  </div>
                </div>

                <div className="relative flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0 z-10 ring-4 ring-gray-800 font-bold text-gray-400">4</div>
                  <div className="bg-gray-700/50 p-4 rounded-lg flex-1">
                    <h4 className="font-bold text-white">Formação Ab-Initio</h4>
                    <p className="text-xs text-gray-400">12 a 18 meses de curso teórico e simulador.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Jobs Section */}
      <section id="vagas" className="py-20 max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Vagas Disponíveis</h2>
            <p className="text-gray-600 mt-2">Oportunidades ativas para integrar a equipa CV-CTA.</p>
          </div>
          <div className="flex gap-2">
             <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center gap-1">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               Recrutamento Ativo
             </span>
          </div>
        </div>

        <div className="space-y-4">
          {OPEN_POSITIONS.map((job) => (
            <div key={job.id} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:border-cv-blue hover:shadow-md transition duration-200 group">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                   <h3 className="text-lg font-bold text-gray-900 group-hover:text-cv-blue transition-colors">{job.title}</h3>
                   {job.isHot && (
                     <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Destaque</span>
                   )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.department}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.type}</span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-4 w-full md:w-auto">
                <div className="text-right hidden md:block mr-4">
                  <span className="block text-xs text-gray-400 uppercase font-bold">Prazo</span>
                  <span className="font-medium text-gray-900">{job.deadline}</span>
                </div>
                <Link 
                  to={`/contact?subject=careers&jobId=${job.id}`}
                  className="flex-1 md:flex-none bg-gray-900 hover:bg-cv-blue text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Candidatar <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-blue-50 rounded-xl border border-blue-100 flex items-start gap-4">
          <div className="bg-blue-100 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-cv-blue" />
          </div>
          <div>
            <h4 className="font-bold text-cv-blue mb-1">Programa de Estágios de Verão</h4>
            <p className="text-sm text-blue-800">
              És estudante universitário? A CV-CTA abre candidaturas para estágios de observação em Julho. Fica atento às notícias ou subscreve a nossa newsletter.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;