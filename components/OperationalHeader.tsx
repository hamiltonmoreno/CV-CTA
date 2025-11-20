import React from 'react';
import { OperationalStatus } from '../types';
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface Props {
  status: OperationalStatus;
  date: string;
}

const OperationalHeader: React.FC<Props> = ({ status, date }) => {
  const getStatusConfig = () => {
    switch (status) {
      case OperationalStatus.NORMAL:
        return { color: 'bg-emerald-600', icon: <CheckCircle2 className="w-5 h-5" />, text: 'Estado Operacional: NORMAL' };
      case OperationalStatus.ATTENTION:
        return { color: 'bg-amber-500', icon: <AlertTriangle className="w-5 h-5" />, text: 'Estado Operacional: ATENÇÃO' };
      case OperationalStatus.CRITICAL:
        return { color: 'bg-red-600', icon: <AlertCircle className="w-5 h-5" />, text: 'Estado Operacional: CRÍTICO' };
      case OperationalStatus.MAINTENANCE:
        return { color: 'bg-blue-600', icon: <Info className="w-5 h-5" />, text: 'Estado Operacional: MANUTENÇÃO' };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`${config.color} text-white px-4 py-2 flex justify-between items-center text-sm font-medium shadow-md relative z-50`}>
      <div className="flex items-center gap-2">
        {config.icon}
        <span>{config.text}</span>
      </div>
      <div className="hidden md:block">
        <span>SISTEMA CV-CTA | {date}</span>
      </div>
    </div>
  );
};

export default OperationalHeader;