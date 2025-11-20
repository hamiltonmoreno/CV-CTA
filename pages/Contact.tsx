
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle, Building, Globe2, Clock } from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'O nome é obrigatório.';
        if (value.trim().length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
        return undefined;
      case 'email':
        if (!value.trim()) return 'O email é obrigatório.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Por favor, insira um email válido.';
        return undefined;
      case 'subject':
        if (!value) return 'Por favor, selecione um assunto.';
        return undefined;
      case 'message':
        if (!value.trim()) return 'A mensagem é obrigatória.';
        if (value.trim().length < 10) return 'A mensagem deve ter pelo menos 10 caracteres.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof typeof formData>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    if (!isValid) return;

    setStatus('submitting');
    
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const getInputClass = (fieldName: keyof FormErrors) => {
    const baseClass = "w-full px-4 py-3 border rounded-lg outline-none transition-all text-sm md:text-base";
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-300 bg-red-50 text-red-900 focus:ring-2 focus:ring-red-200`;
    }
    return `${baseClass} border-gray-300 focus:ring-2 focus:ring-cv-blue focus:border-transparent`;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Fale Conosco</h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Canais oficiais de comunicação da Associação e dos serviços de controlo de tráfego aéreo. Para assuntos operacionais urgentes, contacte diretamente a supervisão.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Envie uma Mensagem</h2>
                <p className="text-gray-500 mt-2">Utilize este formulário para questões administrativas, imprensa, recrutamento ou parcerias.</p>
              </div>

              {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in fade-in">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Mensagem Enviada!</h3>
                  <p className="text-green-700">Agradecemos o seu contacto. A nossa equipa administrativa responderá num prazo de 48 horas úteis.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-2 bg-white border border-green-200 text-green-700 font-medium rounded-lg hover:bg-green-50 transition"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className={getInputClass('name')}
                        placeholder="Seu nome"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.name && errors.name && (
                        <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Corporativo *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={getInputClass('email')}
                        placeholder="nome@empresa.cv"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.email && errors.email && (
                        <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Assunto *</label>
                    <select
                      id="subject"
                      name="subject"
                      className={`${getInputClass('subject')} bg-white`}
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled>Selecione o departamento...</option>
                      <option value="general">Secretariado Geral</option>
                      <option value="partnerships">Parcerias & Protocolos</option>
                      <option value="press">Comunicação & Imprensa</option>
                      <option value="recruitment">Recrutamento & Formação</option>
                      <option value="events">Eventos & Conferências</option>
                    </select>
                    {touched.subject && errors.subject && (
                      <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.subject}
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className={`${getInputClass('message')} resize-none`}
                      placeholder="Escreva sua mensagem detalhada aqui..."
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    {touched.message && errors.message && (
                      <div className="flex items-center gap-1 text-red-500 text-xs mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-cv-blue text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> A processar...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Visual Map Placeholder */}
            <div className="mt-8 bg-gray-200 rounded-xl h-64 w-full relative overflow-hidden border border-gray-300 flex items-center justify-center group cursor-pointer">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center opacity-60 group-hover:opacity-70 transition-opacity"></div>
               <div className="relative z-10 bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cv-blue" />
                  <span className="font-bold text-gray-800">Ver Localização no Mapa</span>
               </div>
            </div>
          </div>

          {/* Right Column: Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Headquarters Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Building className="w-5 h-5 text-cv-blue" />
                Sede Nacional
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-cv-blue">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">CV-CTA Headquarters</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Aeroporto Internacional Amílcar Cabral<br/>
                      Edifício Administrativo ASA, 2º Piso<br/>
                      Espargos, Ilha do Sal
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-cv-blue">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Horário de Secretaria</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Segunda a Sexta: 08:00 - 16:00<br/>
                      Sábados e Domingos: Fechado
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-50 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-cv-blue">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Emails Diretos</p>
                    <div className="text-sm text-gray-500 mt-1 space-y-1">
                      <p><span className="font-medium text-gray-700">Geral:</span> geral@cta.cv</p>
                      <p><span className="font-medium text-gray-700">Financeiro:</span> tesouraria@cta.cv</p>
                      <p><span className="font-medium text-gray-700">Formação:</span> instrucao@cta.cv</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Towers Section */}
            <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-blue-400" />
                  Delegações Regionais
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <div>
                      <p className="font-bold text-sm">Torre do Sal (GVAC)</p>
                      <p className="text-xs text-gray-400">Ilha do Sal</p>
                    </div>
                    <span className="text-xs font-mono bg-gray-800 px-2 py-1 rounded text-blue-300">+238 241 1234</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <div>
                      <p className="font-bold text-sm">Torre da Praia (GVNP)</p>
                      <p className="text-xs text-gray-400">Ilha de Santiago</p>
                    </div>
                    <span className="text-xs font-mono bg-gray-800 px-2 py-1 rounded text-blue-300">+238 260 5050</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                    <div>
                      <p className="font-bold text-sm">Torre S. Vicente (GVSV)</p>
                      <p className="text-xs text-gray-400">Ilha de São Vicente</p>
                    </div>
                    <span className="text-xs font-mono bg-gray-800 px-2 py-1 rounded text-blue-300">+238 231 4040</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm">Torre Boa Vista (GVBA)</p>
                      <p className="text-xs text-gray-400">Ilha da Boa Vista</p>
                    </div>
                    <span className="text-xs font-mono bg-gray-800 px-2 py-1 rounded text-blue-300">+238 251 2222</span>
                  </div>
                </div>
              </div>
              
              {/* Decoration */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600 rounded-full filter blur-[60px] opacity-20"></div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Redes Sociais</h3>
               <div className="flex gap-4">
                  <a href="#" className="flex-1 py-2 text-center border border-gray-200 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition text-sm font-medium">
                    LinkedIn
                  </a>
                  <a href="#" className="flex-1 py-2 text-center border border-gray-200 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition text-sm font-medium">
                    Facebook
                  </a>
                  <a href="#" className="flex-1 py-2 text-center border border-gray-200 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition text-sm font-medium">
                    Twitter
                  </a>
               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
