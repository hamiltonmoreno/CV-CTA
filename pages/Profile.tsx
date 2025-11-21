
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Save, Camera, Lock, Shield, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { MemberProfile } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';
import DigitalCard from '../components/DigitalCard';

interface Props {
  userProfile: MemberProfile;
  onUpdateProfile: (data: Partial<MemberProfile>) => void;
}

const Profile: React.FC<Props> = ({ userProfile, onUpdateProfile }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'security' | 'card'>('details');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    bio: userProfile.bio,
    base: userProfile.base, // Assuming base might be editable or just viewable
  });

  // Password State
  const [passData, setPassData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API Call
    setTimeout(() => {
      onUpdateProfile(formData);
      setIsSaving(false);
      setIsEditing(false);
      showSuccess('Perfil atualizado com sucesso!');
    }, 800);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passData.new !== passData.confirm) {
      alert('As senhas não coincidem.');
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setPassData({ current: '', new: '', confirm: '' });
      showSuccess('Senha alterada com sucesso!');
    }, 1000);
  };

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-gray-900 text-white pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
          <div className="flex items-center gap-4 mt-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full border-4 border-white/20 overflow-hidden relative group cursor-pointer">
                {/* Placeholder Avatar */}
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-400">
                    <User className="w-10 h-10" />
                </div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                </div>
            </div>
            <div>
                <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                <p className="text-blue-200 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> {userProfile.role} | {userProfile.license}
                </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64 shrink-0">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <nav className="flex flex-col">
                        <button 
                            onClick={() => setActiveTab('details')}
                            className={`p-4 text-left flex items-center gap-3 hover:bg-gray-50 transition ${activeTab === 'details' ? 'border-l-4 border-cv-blue bg-blue-50 text-cv-blue font-medium' : 'text-gray-600'}`}
                        >
                            <User className="w-5 h-5" /> Dados Pessoais
                        </button>
                        <button 
                            onClick={() => setActiveTab('security')}
                            className={`p-4 text-left flex items-center gap-3 hover:bg-gray-50 transition ${activeTab === 'security' ? 'border-l-4 border-cv-blue bg-blue-50 text-cv-blue font-medium' : 'text-gray-600'}`}
                        >
                            <Shield className="w-5 h-5" /> Segurança
                        </button>
                        <button 
                            onClick={() => setActiveTab('card')}
                            className={`p-4 text-left flex items-center gap-3 hover:bg-gray-50 transition ${activeTab === 'card' ? 'border-l-4 border-cv-blue bg-blue-50 text-cv-blue font-medium' : 'text-gray-600'}`}
                        >
                            <Briefcase className="w-5 h-5" /> Cartão Digital
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <CheckCircle2 className="w-5 h-5" /> {successMessage}
                    </div>
                )}

                {/* TAB: PERSONAL DETAILS */}
                {activeTab === 'details' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-in fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Informações do Perfil</h2>
                            {!isEditing && (
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="text-sm text-cv-blue hover:underline font-medium"
                                >
                                    Editar Dados
                                </button>
                            )}
                        </div>

                        <form onSubmit={handleSave}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={formData.name} 
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue outline-none disabled:bg-gray-50 disabled:text-gray-500 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Licença (Não editável)</label>
                                    <input 
                                        type="text" 
                                        value={userProfile.license} 
                                        disabled
                                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input 
                                            type="email"
                                            name="email" 
                                            value={formData.email} 
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue outline-none disabled:bg-gray-50 disabled:text-gray-500 transition"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={formData.phone} 
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue outline-none disabled:bg-gray-50 disabled:text-gray-500 transition"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Base Operacional</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <select 
                                            name="base"
                                            value={formData.base}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue outline-none disabled:bg-gray-50 disabled:text-gray-500 transition appearance-none bg-white"
                                        >
                                            <option value="GVAC (Sal)">GVAC (Sal)</option>
                                            <option value="GVNP (Praia)">GVNP (Praia)</option>
                                            <option value="GVSV (São Vicente)">GVSV (São Vicente)</option>
                                            <option value="GVBA (Boa Vista)">GVBA (Boa Vista)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Biografia / Notas</label>
                                <textarea 
                                    name="bio"
                                    rows={4}
                                    value={formData.bio}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue outline-none disabled:bg-gray-50 disabled:text-gray-500 transition resize-none"
                                ></textarea>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="submit" 
                                        disabled={isSaving}
                                        className="px-6 py-2 bg-cv-blue text-white rounded-lg font-medium hover:bg-blue-800 flex items-center gap-2 disabled:opacity-70"
                                    >
                                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        Salvar Alterações
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {/* TAB: SECURITY */}
                {activeTab === 'security' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-in fade-in">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Segurança da Conta</h2>
                        
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8 rounded-r">
                            <div className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-amber-800 text-sm">Recomendação de Segurança</h4>
                                    <p className="text-xs text-amber-700 mt-1">Recomendamos a alteração da sua palavra-passe a cada 90 dias. Utilize uma combinação de letras, números e símbolos.</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handlePasswordUpdate} className="max-w-md">
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Senha Atual</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input 
                                            type="password" 
                                            value={passData.current}
                                            onChange={(e) => setPassData({...passData, current: e.target.value})}
                                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nova Senha</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input 
                                            type="password" 
                                            value={passData.new}
                                            onChange={(e) => setPassData({...passData, new: e.target.value})}
                                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Nova Senha</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input 
                                            type="password" 
                                            value={passData.confirm}
                                            onChange={(e) => setPassData({...passData, confirm: e.target.value})}
                                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cv-blue outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSaving || !passData.current || !passData.new}
                                className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                                Atualizar Senha
                            </button>
                        </form>
                    </div>
                )}

                {/* TAB: DIGITAL CARD */}
                {activeTab === 'card' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-in fade-in flex flex-col items-center">
                        <h2 className="text-xl font-bold text-gray-900 mb-8">Cartão de Associado Digital</h2>
                        <DigitalCard member={userProfile} />
                        <p className="text-center text-gray-500 text-sm mt-8 max-w-md">
                            Este cartão é pessoal e intransmissível. Utilize o código QR para validar a sua situação de associado junto de parceiros e eventos.
                        </p>
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
