
import React, { useState } from 'react';
import { X, Bell, Mail, Smartphone, Check } from 'lucide-react';
import { AIRPORTS } from '../constants';
import { AlertSubscription } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subscription: AlertSubscription) => void;
  initialData?: AlertSubscription | null;
}

const AlertSubscriptionModal: React.FC<Props> = ({ isOpen, onClose, onSave, initialData }) => {
  if (!isOpen) return null;

  const [selectedAirports, setSelectedAirports] = useState<string[]>(initialData?.airports || []);
  const [selectedTypes, setSelectedTypes] = useState<('Info' | 'Warning' | 'Alert')[]>(initialData?.types || ['Warning', 'Alert']);
  const [channels, setChannels] = useState(initialData?.channels || { email: true, sms: false });
  const [contactInfo, setContactInfo] = useState(initialData?.contactInfo || { email: '', phone: '' });

  const toggleAirport = (apt: string) => {
    const simpleApt = apt.split(' ')[0]; // Store code only
    setSelectedAirports(prev => 
      prev.includes(simpleApt) ? prev.filter(a => a !== simpleApt) : [...prev, simpleApt]
    );
  };

  const toggleType = (type: 'Info' | 'Warning' | 'Alert') => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSave = () => {
    onSave({
      airports: selectedAirports,
      types: selectedTypes,
      channels,
      contactInfo
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="bg-cv-blue/10 p-2 rounded-full text-cv-blue">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Configurar Alertas em Tempo Real</h2>
              <p className="text-sm text-gray-500">Receba notificações instantâneas de NOTAMs críticos.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Section 1: Airports */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">1. Aeroportos Monitorizados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AIRPORTS.map((apt) => {
                const code = apt.split(' ')[0];
                const isSelected = selectedAirports.includes(code);
                return (
                  <button
                    key={apt}
                    onClick={() => toggleAirport(apt)}
                    className={`flex items-center justify-between p-3 rounded-lg border text-sm font-medium transition-all ${
                      isSelected 
                        ? 'border-cv-blue bg-blue-50 text-cv-blue' 
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span>{apt}</span>
                    {isSelected && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Severity */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">2. Tipos de Notificação</h3>
            <div className="flex gap-4">
              {(['Info', 'Warning', 'Alert'] as const).map((type) => {
                 const isSelected = selectedTypes.includes(type);
                 return (
                  <button
                    key={type}
                    onClick={() => toggleType(type)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
                      isSelected
                        ? 'bg-gray-800 text-white border-gray-800'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                 );
              })}
            </div>
          </div>

          {/* Section 3: Channels */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">3. Canais de Contacto</h3>
            <div className="space-y-4">
              {/* Email Channel */}
              <div className={`p-4 rounded-lg border ${channels.email ? 'border-cv-blue bg-blue-50/30' : 'border-gray-200'}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Mail className={`w-5 h-5 ${channels.email ? 'text-cv-blue' : 'text-gray-400'}`} />
                    <span className="font-semibold text-gray-900">Notificação por E-mail</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={channels.email}
                      onChange={(e) => setChannels({...channels, email: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cv-blue"></div>
                  </label>
                </div>
                {channels.email && (
                  <input 
                    type="email" 
                    placeholder="seu.email@exemplo.cv" 
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-cv-blue focus:border-transparent outline-none"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  />
                )}
              </div>

              {/* SMS Channel */}
              <div className={`p-4 rounded-lg border ${channels.sms ? 'border-cv-blue bg-blue-50/30' : 'border-gray-200'}`}>
                 <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Smartphone className={`w-5 h-5 ${channels.sms ? 'text-cv-blue' : 'text-gray-400'}`} />
                    <span className="font-semibold text-gray-900">Notificação por SMS</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={channels.sms}
                      onChange={(e) => setChannels({...channels, sms: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cv-blue"></div>
                  </label>
                </div>
                {channels.sms && (
                  <input 
                    type="tel" 
                    placeholder="+238 999 99 99" 
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-cv-blue focus:border-transparent outline-none"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-200 rounded transition"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-cv-blue text-white font-medium rounded shadow-sm hover:bg-blue-800 transition flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Ativar Subscrição
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertSubscriptionModal;
