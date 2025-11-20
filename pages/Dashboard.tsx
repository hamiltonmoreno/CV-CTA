
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TRAFFIC_DATA } from '../constants';
import { Calendar, Clock, FileText, AlertCircle, Activity, Users, ShieldCheck, Check, Phone, Mail, X, Save, Loader2 } from 'lucide-react';
import { UserRole } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  userRole?: UserRole;
}

const Dashboard: React.FC<Props> = ({ userRole = UserRole.CONTROLLER }) => {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    email: 'user@cta.cv',
    phone: '+238 999 9999'
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API save
    setTimeout(() => {
      setIsSaving(false);
      setIsProfileModalOpen(false);
    }, 1000);
  };

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
            <p className="text-gray-500 text-sm">Bem-vindo, Controlador Nível 1 | Sector Sal Oceânico</p>
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
             <button 
               onClick={() => setIsProfileModalOpen(true)}
               className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors text-sm"
             >
               Meu Perfil
             </button>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Avisos Internos</h3>
            <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r">
                <h4 className="text-sm font-bold text-yellow-800">Briefing Obrigatório</h4>
                <p className="text-xs text-yellow-700 mt-1">Todos os turnos da manhã devem rever a circular 14/25 antes de assumir posição.</p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r">
                <h4 className="text-sm font-bold text-blue-800">Manutenção Radar</h4>
                <p className="text-xs text-blue-700 mt-1">Radar Secundário (SSR) em manutenção preventiva das 0200Z às 0400Z.</p>
              </div>
               <div className="p-3 bg-gray-50 border-l-4 border-gray-300 rounded-r">
                <h4 className="text-sm font-bold text-gray-800">Escala do Fim de Semana</h4>
                <p className="text-xs text-gray-600 mt-1">Publicada a revisão 2 da escala de Outubro.</p>
              </div>
            </div>
            <button className="mt-4 w-full py-2 text-sm text-cv-blue font-medium hover:underline text-center">
              Ver todo histórico
            </button>
          </div>
        </div>
      </div>

      {/* Profile Edit Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Editar Meu Perfil</h2>
              <button onClick={() => setIsProfileModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email de Contacto</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue focus:border-transparent outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telemóvel</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="tel" 
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                 <button 
                   type="button"
                   onClick={() => setIsProfileModalOpen(false)}
                   className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                 >
                   Cancelar
                 </button>
                 <button 
                   type="submit"
                   disabled={isSaving}
                   className="flex-1 py-2 bg-cv-blue text-white rounded-lg font-medium hover:bg-blue-800 flex items-center justify-center gap-2 disabled:opacity-70"
                 >
                   {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                   Salvar Alterações
                 </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
