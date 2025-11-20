
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, User, Badge, MapPin, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { AIRPORTS } from '../constants';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    license: '',
    airport: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.license || !formData.airport) {
        setError('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    if (!formData.email.includes('@')) {
        setError('Por favor, insira um email válido.');
        return;
    }

    setStatus('submitting');
    
    // Simulating API call
    setTimeout(() => {
        setStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
         <img 
           src="https://images.unsplash.com/photo-1542296332-2e44a99cfef9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
           alt="Airport Tower" 
           className="w-full h-full object-cover opacity-20"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900/80"></div>
      </div>

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-cv-blue p-8 text-center relative">
          <Link 
            to="/login"
            className="absolute top-6 left-6 text-blue-200 hover:text-white transition bg-white/10 p-2 rounded-full"
            title="Voltar ao Login"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Solicitar Acesso</h1>
          <p className="text-blue-100 text-sm mt-1">Registo exclusivo para controladores licenciados</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-8">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-300">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
               </div>
               <h2 className="text-2xl font-bold text-gray-900 mb-3">Pedido Enviado!</h2>
               <p className="text-gray-600 mb-8 leading-relaxed">
                  O seu pedido de registo foi encaminhado para a administração da CV-CTA.
                  <br/><br/>
                  Iremos verificar o seu número de licença e entraremos em contacto através do email <strong>{formData.email}</strong> num prazo máximo de 24 horas.
               </p>
               <Link 
                 to="/login"
                 className="inline-block w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors"
               >
                 Voltar ao Login
               </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-start gap-3 animate-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue focus:border-transparent outline-none transition-all"
                    placeholder="Como consta na licença"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Institucional</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue focus:border-transparent outline-none transition-all"
                    placeholder="nome@asa.cv"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nº Licença CTA</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Badge className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={formData.license}
                      onChange={(e) => setFormData({...formData, license: e.target.value})}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue focus:border-transparent outline-none transition-all"
                      placeholder="CV-CTA-000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Aeroporto Base</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      value={formData.airport}
                      onChange={(e) => setFormData({...formData, airport: e.target.value})}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue focus:border-transparent outline-none transition-all bg-white appearance-none"
                    >
                      <option value="" disabled>Selecione...</option>
                      {AIRPORTS.map(apt => (
                        <option key={apt} value={apt}>{apt.split(' ')[0]}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-cv-blue text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Processando...
                  </>
                ) : (
                  <>
                    Enviar Pedido
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                Ao submeter este formulário, confirma que é um controlador de tráfego aéreo licenciado pela AAC. Falsas declarações podem ser reportadas.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
