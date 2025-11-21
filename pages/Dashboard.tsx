
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TRAFFIC_DATA } from '../constants';
import { Calendar, Clock, AlertCircle, Activity, Users, ShieldCheck, BellRing } from 'lucide-react';
import { UserRole, MemberProfile } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  userRole?: UserRole;
  userProfile?: MemberProfile;
}

const Dashboard: React.FC<Props> = ({ userRole = UserRole.CONTROLLER, userProfile }) => {
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Painel de Controle (ACC)
              {userRole === UserRole.ADMIN && (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full border border-red-200 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> ADMIN
                </span>
              )}
            </h1>
            <p className="text-gray-500 text-sm">
               Bem-vindo, {userProfile?.name || 'Controlador'} | {userProfile?.base || 'Sector Indefinido'}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4 text-sm">
             <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                <Activity className="w-4 h-4" />
                <span className="font-semibold">Sistema Online</span>
             </div>
             <div className="text-right hidden sm:block">
                <div className="font-mono text-lg font-bold text-gray-900">14:32 UTC</div>
                <div className="text-xs text-gray-400">14 OUT 2025</div>
             </div>
             <Link 
               to="/profile"
               className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors text-sm"
             >
               Meu Perfil
             </Link>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
           <button className="p-4 bg-cv-blue text-white rounded-lg shadow-sm hover:bg-blue-800 transition flex flex-col items-center justify-center gap-2 group">
              <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Minha Escala</span>
           </button>
           
           {/* Botão de Associação destacado para ADMIN ou CONTROLADOR */}
           <Link to="/association" className="p-4 bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-lg shadow-sm hover:shadow-md transition flex flex-col items-center justify-center gap-2 group">
              <Users className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-center">Portal da Associação</span>
              <span className="text-[10px] bg-white/20 px-2 rounded">Votação & Cotas</span>
           </Link>

           <button className="p-4 bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition flex flex-col items-center justify-center gap-2 group">
              <Clock className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Trocar Turno</span>
           </button>
           <button className="p-4 bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition flex flex-col items-center justify-center gap-2 group">
              <AlertCircle className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Emergency SOP</span>
           </button>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Volume de Tráfego (Últimas 24h)</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TRAFFIC_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend />
                  <Bar dataKey="arrivals" name="Chegadas" fill="#003399" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="departures" name="Partidas" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Notifications / Status Side Panel */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BellRing className="w-5 h-5 text-cv-blue" /> Notificações Importantes
            </h3>
            <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
              
              {/* Example 1: Maintenance */}
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                <h4 className="text-sm font-bold text-blue-800">Manutenção do Sistema Agendada</h4>
                <p className="text-xs text-blue-700 mt-1">
                  O sistema FDPS passará por atualização no dia 20/Out das 02:00 às 04:00 UTC. Prevista indisponibilidade temporária.
                </p>
              </div>

              {/* Example 2: New Circular */}
              <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r">
                <h4 className="text-sm font-bold text-emerald-800">Nova Circular Publicada</h4>
                <p className="text-xs text-emerald-700 mt-1">
                  AIC 08/25: Atualização dos procedimentos de contingência para falha de comunicações satélite (CPDLC).
                </p>
              </div>

              {/* Existing Example preserved for context */}
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                <h4 className="text-sm font-bold text-yellow-800">Briefing Obrigatório</h4>
                <p className="text-xs text-yellow-700 mt-1">Todos os turnos da manhã devem rever a circular 14/25 antes de assumir posição.</p>
              </div>

            </div>
            <button className="mt-4 w-full py-2 text-sm text-cv-blue font-medium hover:underline text-center">
              Ver todo histórico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
