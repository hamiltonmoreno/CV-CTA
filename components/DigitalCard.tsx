
import React from 'react';
import { Plane, QrCode, Shield } from 'lucide-react';
import { MemberProfile } from '../types';

interface Props {
  member: MemberProfile;
}

const DigitalCard: React.FC<Props> = ({ member }) => {
  return (
    <div className="w-full max-w-sm mx-auto perspective-1000 group">
      <div className="relative w-full h-56 bg-gradient-to-br from-cv-blue to-blue-900 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-700 hover:rotate-y-3">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
        </div>

        {/* Card Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
           {/* Header */}
           <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                 <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                    <Plane className="w-5 h-5 transform -rotate-45" />
                 </div>
                 <div>
                    <h3 className="font-bold text-sm leading-none">CV-CTA</h3>
                    <p className="text-[8px] uppercase tracking-widest opacity-70">Associação Profissional</p>
                 </div>
              </div>
              <div className="text-right">
                 <p className="text-[10px] uppercase opacity-70">Status</p>
                 <span className="bg-green-500/20 border border-green-400/50 text-green-300 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                    {member.status}
                 </span>
              </div>
           </div>

           {/* Member Details */}
           <div className="flex items-end gap-4">
              <div className="w-16 h-20 bg-gray-300 rounded-lg border-2 border-white/30 overflow-hidden flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80)' }}>
              </div>
              <div className="flex-1">
                 <h2 className="font-bold text-lg leading-tight mb-1">{member.name}</h2>
                 <p className="text-xs text-blue-200 mb-2">{member.role} | {member.base}</p>
                 <div className="flex justify-between items-end border-t border-white/10 pt-2">
                    <div>
                       <p className="text-[8px] uppercase opacity-60">Licença Nº</p>
                       <p className="font-mono text-xs font-bold">{member.license}</p>
                    </div>
                    <div>
                       <p className="text-[8px] uppercase opacity-60">Desde</p>
                       <p className="font-mono text-xs">{new Date(member.admissionDate).getFullYear()}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Hologram Effect */}
        <div className="absolute top-4 right-4 opacity-20">
           <Shield className="w-24 h-24" />
        </div>
      </div>
      
      {/* Back side simulation / QR Code Access */}
      <div className="mt-4 flex justify-center">
         <button className="text-xs flex items-center gap-2 text-gray-500 hover:text-cv-blue transition">
            <QrCode className="w-4 h-4" /> Mostrar Código de Validação
         </button>
      </div>
    </div>
  );
};

export default DigitalCard;
