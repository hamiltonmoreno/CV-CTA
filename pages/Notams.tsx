
import React, { useState } from 'react';
import { MOCK_NOTAMS, AIRPORTS } from '../constants';
import { Search, Download, AlertCircle, Bell, RefreshCw, Mail, Smartphone, X } from 'lucide-react';
import { Notam, AlertSubscription } from '../types';
import AlertSubscriptionModal from '../components/AlertSubscriptionModal';

// Helper to generate random NOTAM for simulation
const generateRandomNotam = (): Notam => {
  const randomAirport = AIRPORTS[Math.floor(Math.random() * AIRPORTS.length)];
  const airportCode = randomAirport.split(' ')[0];
  const types: ('Info' | 'Warning' | 'Alert')[] = ['Info', 'Warning', 'Alert'];
  const type = types[Math.floor(Math.random() * types.length)];
  const id = `A${Math.floor(Math.random() * 9000) + 1000}/25`;
  
  const descriptions = [
    'RWY LIGHTS U/S DUE TO PWR FAILURE.',
    'BIRD CONCENTRATION INVOF RWY 01.',
    'TWY A CLOSED FOR MAINTENANCE.',
    'VOR/DME UNSERVICEABLE.',
    'FIREWORKS ACTIVITY WI 2NM OF ARP.',
    'FUEL NOT AVAILABLE.'
  ];

  return {
    id,
    airport: randomAirport,
    code: 'QXXXX',
    validFrom: new Date().toISOString().slice(0, 16).replace('T', ' '),
    validTo: 'PERM',
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    type
  };
};

interface ToastProps {
  message: string;
  details: string;
  type: 'email' | 'sms';
  onClose: () => void;
}

const NotificationToast: React.FC<ToastProps> = ({ message, details, type, onClose }) => (
  <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-2xl flex items-start gap-3 z-50 animate-in slide-in-from-right fade-in duration-300 max-w-sm border-l-4 border-green-500">
    <div className="bg-gray-800 p-2 rounded-full">
      {type === 'email' ? <Mail className="w-5 h-5 text-green-400" /> : <Smartphone className="w-5 h-5 text-blue-400" />}
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-sm mb-1">{message}</h4>
      <p className="text-xs text-gray-300">{details}</p>
    </div>
    <button onClick={onClose} className="text-gray-400 hover:text-white">
      <X className="w-4 h-4" />
    </button>
  </div>
);

const NotamsPage: React.FC = () => {
  const [notams, setNotams] = useState<Notam[]>(MOCK_NOTAMS);
  const [filter, setFilter] = useState('');
  const [airportFilter, setAirportFilter] = useState('ALL');
  
  // Subscription State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscription, setSubscription] = useState<AlertSubscription | null>(null);
  const [toasts, setToasts] = useState<{id: number, message: string, details: string, type: 'email' | 'sms'}[]>([]);

  const filteredNotams = notams.filter(notam => {
     const matchesText = notam.description.toLowerCase().includes(filter.toLowerCase()) || notam.id.toLowerCase().includes(filter.toLowerCase());
     const matchesAirport = airportFilter === 'ALL' || notam.airport.includes(airportFilter);
     return matchesText && matchesAirport;
  });

  const handleSubscriptionSave = (sub: AlertSubscription) => {
    setSubscription(sub);
    // Show a system toast for configuration saved
    addToast("Configuração Salva", `Alertas ativos para ${sub.airports.length} aeroportos.`, 'email');
  };

  const addToast = (message: string, details: string, type: 'email' | 'sms') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, details, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const handleSimulateLiveEvent = () => {
    const newNotam = generateRandomNotam();
    setNotams(prev => [newNotam, ...prev]);

    // Check Alert Rules
    if (subscription) {
      const aptCode = newNotam.airport.split(' ')[0];
      const airportMatch = subscription.airports.length === 0 || subscription.airports.includes(aptCode);
      const typeMatch = subscription.types.includes(newNotam.type);

      if (airportMatch && typeMatch) {
        if (subscription.channels.sms) {
          addToast("SMS Enviado", `Alerta: ${newNotam.id} (${newNotam.type}) em ${aptCode}`, 'sms');
        }
        if (subscription.channels.email) {
          setTimeout(() => {
             addToast("E-mail Enviado", `Detalhes do NOTAM ${newNotam.id} enviados para ${subscription.contactInfo.email}`, 'email');
          }, 1000); // Stagger slightly
        }
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 relative">
      <div className="bg-white border-b border-gray-200 py-8">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">NOTAMs & Avisos Operacionais</h1>
              <p className="text-gray-600">Consulta em tempo real e gestão de alertas.</p>
            </div>
            <div className="flex gap-3">
               <button 
                 onClick={handleSimulateLiveEvent}
                 className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition shadow-sm text-sm"
               >
                 <RefreshCw className="w-4 h-4" /> Simular Evento Live
               </button>
               <button 
                 onClick={() => setIsModalOpen(true)}
                 className={`flex items-center gap-2 px-4 py-2 rounded-md transition shadow-sm text-sm font-medium ${
                   subscription 
                   ? 'bg-green-100 text-green-800 border border-green-200' 
                   : 'bg-cv-blue text-white hover:bg-blue-800'
                 }`}
               >
                 <Bell className={`w-4 h-4 ${subscription ? 'fill-current' : ''}`} /> 
                 {subscription ? 'Alertas Ativos' : 'Subscrever Alertas'}
               </button>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
         {/* Filters */}
         <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full md:w-auto flex-1">
               <div className="relative flex-1 md:max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Pesquisar por código, ID ou texto..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cv-blue focus:border-transparent outline-none"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
               </div>
               <select 
                 className="border border-gray-300 rounded-md py-2 px-4 outline-none focus:ring-2 focus:ring-cv-blue"
                 value={airportFilter}
                 onChange={(e) => setAirportFilter(e.target.value)}
               >
                  <option value="ALL">Todos os Aeroportos</option>
                  {AIRPORTS.map(apt => <option key={apt} value={apt.split(' ')[0]}>{apt}</option>)}
               </select>
            </div>
            <button className="flex items-center gap-2 text-gray-600 font-medium hover:bg-gray-100 px-4 py-2 rounded transition border border-transparent hover:border-gray-200">
               <Download className="w-4 h-4" /> Exportar PDF
            </button>
         </div>

         {/* Subscription Banner (if active) */}
         {subscription && (
           <div className="bg-blue-50 border border-blue-100 text-blue-800 px-4 py-3 rounded-lg mb-6 flex items-center justify-between text-sm">
             <div className="flex items-center gap-2">
               <Bell className="w-4 h-4" />
               <span>
                 Recebendo alertas via 
                 <span className="font-bold"> {subscription.channels.email && 'Email'} {subscription.channels.sms && subscription.channels.email && '&'} {subscription.channels.sms && 'SMS'} </span>
                 para {subscription.airports.length > 0 ? subscription.airports.join(', ') : 'todos os aeroportos'}.
               </span>
             </div>
             <button onClick={() => setIsModalOpen(true)} className="text-blue-600 hover:underline">Editar</button>
           </div>
         )}

         {/* List */}
         <div className="space-y-4">
            {filteredNotams.map((notam, index) => (
               <div key={notam.id + index} className={`bg-white border-l-4 ${notam.type === 'Alert' ? 'border-l-red-500' : notam.type === 'Warning' ? 'border-l-amber-500' : 'border-l-cv-blue'} rounded-r-lg shadow-sm p-6 hover:shadow-md transition duration-200 animate-in fade-in slide-in-from-top-4`}>
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex items-center gap-3">
                        <span className="font-mono font-bold bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">{notam.id}</span>
                        <span className="font-semibold text-gray-700">{notam.airport}</span>
                        {notam.type === 'Warning' && <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Warning</span>}
                        {notam.type === 'Alert' && <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Critical</span>}
                     </div>
                     <div className="text-right text-sm text-gray-500">
                        <div>From: <span className="font-mono text-gray-900">{notam.validFrom}</span></div>
                        <div>To: <span className="font-mono text-gray-900">{notam.validTo}</span></div>
                     </div>
                  </div>
                  <div className="mb-2">
                     <span className="text-xs font-mono text-gray-400 block mb-1">{notam.code}</span>
                     <p className="font-mono text-sm text-gray-800 whitespace-pre-wrap">{notam.description}</p>
                  </div>
                  {/* New label for newly added simulated notams */}
                  {index === 0 && notams.length > MOCK_NOTAMS.length && (
                     <span className="inline-block mt-2 text-[10px] uppercase tracking-wider font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Live Update</span>
                  )}
               </div>
            ))}
            
            {filteredNotams.length === 0 && (
               <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed border-gray-300">
                  Nenhum NOTAM encontrado para os filtros selecionados.
               </div>
            )}
         </div>
      </div>

      <AlertSubscriptionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSubscriptionSave}
        initialData={subscription}
      />

      {/* Toast Container */}
      <div className="fixed bottom-0 right-0 p-4 space-y-4 z-50 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto">
            <NotificationToast 
              message={toast.message} 
              details={toast.details} 
              type={toast.type} 
              onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotamsPage;
