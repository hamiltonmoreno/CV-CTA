import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TRAFFIC_DATA } from '../constants';
import { Calendar, Clock, FileText, AlertCircle, Activity } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel de Controle (ACC)</h1>
            <p className="text-gray-500 text-sm">Bem-vindo, Controlador Nível 1 | Sector Sal Oceânico</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4 text-sm">
             <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                <Activity className="w-4 h-4" />
                <span className="font-semibold">Sistema Online</span>
             </div>
             <div className="text-right">
                <div className="font-mono text-lg font-bold text-gray-900">14:32 UTC</div>
                <div className="text-xs text-gray-400">14 OUT 2025</div>
             </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <button className="p-4 bg-cv-blue text-white rounded-lg shadow-sm hover:bg-blue-800 transition flex flex-col items-center justify-center gap-2">
              <Calendar className="w-6 h-6" />
              <span className="font-medium">Minha Escala</span>
           </button>
           <button className="p-4 bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition flex flex-col items-center justify-center gap-2">
              <FileText className="w-6 h-6 text-cv-blue" />
              <span className="font-medium">Reportar Ocorrência</span>
           </button>
           <button className="p-4 bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition flex flex-col items-center justify-center gap-2">
              <Clock className="w-6 h-6 text-amber-500" />
              <span className="font-medium">Trocar Turno</span>
           </button>
           <button className="p-4 bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition flex flex-col items-center justify-center gap-2">
              <AlertCircle className="w-6 h-6 text-red-500" />
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
            <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] pr-2">
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
    </div>
  );
};

export default Dashboard;