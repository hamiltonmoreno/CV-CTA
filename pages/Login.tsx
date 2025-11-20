
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowLeft, Plane, AlertCircle, ShieldCheck } from 'lucide-react';
import { UserRole } from '../types';

interface Props {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulação de autenticação
    setTimeout(() => {
      if (email === 'admin@cta.cv' && password === 'admin123') {
        // Credenciais de Desenvolvedor/Admin
        onLogin(UserRole.ADMIN);
        navigate('/dashboard');
      } else if (email && password) {
        // Qualquer outra credencial entra como Controlador Padrão (Demo)
        onLogin(UserRole.CONTROLLER);
        navigate('/dashboard');
      } else {
        setError('Por favor, preencha todos os campos.');
        setIsLoading(false);
      }
    }, 1000);
  };

  // Auto-fill for development convenience (Optional - remove in production)
  const fillAdminCreds = () => {
    setEmail('admin@cta.cv');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
         <img 
           src="https://images.unsplash.com/photo-1468183654773-77e2e09d0501?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
           alt="Cockpit View" 
           className="w-full h-full object-cover opacity-20"
         />
         <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/90 to-gray-900/80"></div>
      </div>

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-cv-blue p-8 text-center relative">
          <button 
            onClick={() => navigate('/')}
            className="absolute top-4 left-4 text-blue-200 hover:text-white transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/20">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Área do Associado</h1>
          <p className="text-blue-100 text-sm mt-1">Acesso restrito a controladores ativos</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nº de Licença ou Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue focus:border-transparent outline-none transition-all"
                  placeholder="ex: 1234-CTA ou nome@cta.cv"
                  autoFocus
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Palavra-passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
               <label className="flex items-center gap-2 cursor-pointer">
                 <input type="checkbox" className="rounded border-gray-300 text-cv-blue focus:ring-cv-blue" />
                 <span className="text-gray-600">Lembrar-me</span>
               </label>
               <a href="#" className="text-cv-blue hover:underline font-medium">Esqueceu a senha?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cv-blue text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Plane className="w-5 h-5 transform -rotate-45 mt-1" /> Entrar no Portal
                </>
              )}
            </button>
          </form>

          {/* Developer Shortcut */}
          <div className="mt-6 text-center">
             <button onClick={fillAdminCreds} className="text-xs text-gray-400 hover:text-cv-blue flex items-center justify-center gap-1 mx-auto border border-dashed border-gray-300 px-2 py-1 rounded hover:border-cv-blue transition-colors">
                <ShieldCheck className="w-3 h-3" /> Auto-fill Admin (Dev Only)
             </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Ainda não tem acesso? <Link to="/register" className="text-cv-blue font-bold hover:underline">Solicitar registo</Link>
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 text-center">
           <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
             Sistema Integrado CV-CTA v2.5
           </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
