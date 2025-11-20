import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

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

    // Real-time validation if the field has been touched
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
    
    // Validate all fields
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
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const getInputClass = (fieldName: keyof FormErrors) => {
    // Increased py-2 to py-3 for better touch targets on mobile
    const baseClass = "w-full px-4 py-3 border rounded-lg outline-none transition-all text-sm md:text-base";
    if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-300 bg-red-50 text-red-900 focus:ring-2 focus:ring-red-200`;
    }
    return `${baseClass} border-gray-300 focus:ring-2 focus:ring-cv-blue focus:border-transparent`;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Contactos & Reportes</h1>
          <p className="text-gray-600 text-sm md:text-base">Canais oficiais de comunicação com a CV-CTA.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Contact Form Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">Envie uma Mensagem</h2>
              <p className="text-sm text-gray-500 mt-1">Para assuntos gerais, imprensa ou dúvidas operacionais não-urgentes.</p>
            </div>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 md:p-8 text-center animate-in fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-green-800 mb-2">Mensagem Enviada!</h3>
                <p className="text-green-700 text-sm md:text-base">A sua mensagem foi registada com sucesso. A nossa equipa de relações públicas entrará em contacto em breve.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-medium text-green-800 hover:underline"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    <option value="" disabled>Selecione um assunto</option>
                    <option value="general">Informações Gerais</option>
                    <option value="press">Assessoria de Imprensa</option>
                    <option value="careers">Recrutamento & RH</option>
                    <option value="report">Reporte de Segurança (Confidencial)</option>
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
                    rows={5}
                    className={`${getInputClass('message')} resize-none`}
                    placeholder="Escreva sua mensagem aqui..."
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
                  className="w-full bg-cv-blue text-white font-bold py-3 md:py-4 px-6 rounded-lg hover:bg-blue-800 transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Enviando...
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

          {/* Info Section */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Informações Institucionais</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-cv-blue shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">Sede Operacional (ACC Sal)</h3>
                    <p className="text-gray-600 text-xs md:text-sm mt-1">
                      Aeroporto Internacional Amílcar Cabral<br />
                      Espargos, Ilha do Sal<br />
                      Cabo Verde
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-cv-blue shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">Telefones</h3>
                    <p className="text-gray-600 text-xs md:text-sm mt-1">
                      <span className="block"><span className="font-medium">Geral:</span> +238 241 1000</span>
                      <span className="block"><span className="font-medium">Supervisor ACC (H24):</span> +238 241 1234</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-cv-blue shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">Correio Eletrónico</h3>
                    <p className="text-gray-600 text-xs md:text-sm mt-1">
                      <span className="block"><span className="font-medium">Geral:</span> geral@cta.cv</span>
                      <span className="block"><span className="font-medium">Recrutamento:</span> rh@cta.cv</span>
                      <span className="block"><span className="font-medium">Segurança Operacional:</span> safety@cta.cv</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 text-white p-6 md:p-8 rounded-xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-lg md:text-xl mb-2">Emergência Aeronáutica?</h3>
                <p className="text-gray-300 text-xs md:text-sm mb-6">
                  Para reportes de incidentes graves ou acidentes, utilize a linha direta de emergência ou a frequência de socorro.
                </p>
                <div className="flex flex-col gap-3">
                   <a href="tel:+238112" className="bg-red-600 hover:bg-red-700 text-white text-center py-3 rounded font-bold transition text-sm md:text-base">
                      Ligar Linha de Emergência (112)
                   </a>
                   <div className="text-center text-xs text-gray-400">
                      Frequência de Socorro: 121.500 MHz
                   </div>
                </div>
              </div>
              {/* Decorative background element */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;