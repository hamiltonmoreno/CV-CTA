
import React, { useState } from 'react';
import { 
  ShieldCheck, Users, FileText, Settings, Check, X, 
  Search, AlertTriangle, Bell, Plus, Trash2, Edit, 
  Save, DollarSign, TrendingUp, TrendingDown, Calendar, Image as ImageIcon
} from 'lucide-react';
import { 
  MOCK_REGISTRATION_REQUESTS, MOCK_NEWS, MOCK_NOTAMS, 
  FINANCIAL_RECORDS, AIRPORTS, MOCK_MEMBER_PROFILE 
} from '../constants';
import { RegistrationRequest, NewsItem, Notam, FinancialRecord, UserRole, Member } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';

// Mock Initial Active Members (simulating database)
const INITIAL_MEMBERS: Member[] = [
  { id: '1', name: 'Carlos Delgado', license: 'CV-CTA-056', role: UserRole.CONTROLLER, status: 'Active', quotaStatus: 'Up-to-date' },
  { id: '2', name: 'Ana Silva', license: 'CV-CTA-088', role: UserRole.SUPERVISOR, status: 'Active', quotaStatus: 'Up-to-date' },
  { id: '3', name: 'João Mendes', license: 'CV-CTA-012', role: UserRole.ADMIN, status: 'Active', quotaStatus: 'Up-to-date' },
];

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'members' | 'content' | 'finance' | 'settings'>('members');
  
  // Local State for Data Management
  const [requests, setRequests] = useState<RegistrationRequest[]>(MOCK_REGISTRATION_REQUESTS);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [newsList, setNewsList] = useState<NewsItem[]>(MOCK_NEWS);
  const [notamList, setNotamList] = useState<Notam[]>(MOCK_NOTAMS);
  const [financials, setFinancials] = useState<FinancialRecord[]>(FINANCIAL_RECORDS);

  // UI States
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isNotamModalOpen, setIsNotamModalOpen] = useState(false);
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // --- MEMBER MANAGEMENT ---
  const handleApprove = (req: RegistrationRequest) => {
    setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: 'Approved' } : r));
    // Add to active members
    const newMember: Member = {
      id: Date.now().toString(),
      name: req.name,
      license: req.license,
      role: UserRole.CONTROLLER,
      status: 'Active',
      quotaStatus: 'Up-to-date'
    };
    setMembers(prev => [...prev, newMember]);
  };

  const handleReject = (id: string) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
  };

  const toggleRole = (memberId: string) => {
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return { ...m, role: m.role === UserRole.ADMIN ? UserRole.CONTROLLER : UserRole.ADMIN };
      }
      return m;
    }));
  };

  const toggleStatus = (memberId: string) => {
    setMembers(prev => prev.map(m => {
      if (m.id === memberId) {
        return { ...m, status: m.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return m;
    }));
  };

  // --- CONTENT MANAGEMENT ---
  const handleDeleteNews = (id: string) => {
    if(window.confirm('Tem certeza que deseja apagar esta notícia?')) {
      setNewsList(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleDeleteNotam = (id: string) => {
    if(window.confirm('Tem certeza que deseja revogar este NOTAM?')) {
      setNotamList(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleAddNews = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: NewsItem = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      summary: formData.get('summary') as string,
      category: formData.get('category') as any,
      date: new Date().toISOString().split('T')[0],
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80' // Default image
    };
    setNewsList(prev => [newItem, ...prev]);
    setIsNewsModalOpen(false);
  };

  const handleAddNotam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newItem: Notam = {
      id: `A${Math.floor(Math.random()*9000)+1000}/25`,
      airport: formData.get('airport') as string,
      code: formData.get('code') as string,
      type: formData.get('type') as any,
      description: formData.get('description') as string,
      validFrom: new Date().toISOString().replace('T', ' ').slice(0,16),
      validTo: 'PERM'
    };
    setNotamList(prev => [newItem, ...prev]);
    setIsNotamModalOpen(false);
  };

  // --- FINANCE MANAGEMENT ---
  const handleAddTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get('type') as 'Income' | 'Expense';
    const amount = parseFloat(formData.get('amount') as string);
    
    const newRecord: FinancialRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      amount: amount,
      type: type
    };
    setFinancials(prev => [newRecord, ...prev]);
    setIsFinanceModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-gray-900 text-white pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
          <div className="flex items-center gap-3 mb-2">
             <div className="bg-red-600 p-2 rounded-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
             </div>
             <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          </div>
          <p className="text-gray-400 max-w-2xl">
            Sistema de Gestão Integrada (ERP) • Membros • Conteúdo • Finanças
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 flex flex-wrap gap-2">
          {[
            { id: 'members', icon: Users, label: 'Membros & Registos' },
            { id: 'content', icon: FileText, label: 'Gestão de Conteúdo' },
            { id: 'finance', icon: DollarSign, label: 'Gestão Financeira' },
            { id: 'settings', icon: Settings, label: 'Sistema' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'hover:bg-gray-50 text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* --- TAB: MEMBERS --- */}
        {activeTab === 'members' && (
           <div className="space-y-8 animate-in fade-in">
              {/* Registration Requests Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                 <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">Pedidos de Registo Pendentes</h3>
                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-bold">{requests.filter(r => r.status === 'Pending').length} Pendentes</span>
                 </div>
                 
                 {requests.filter(r => r.status === 'Pending').length > 0 ? (
                   <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                         <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                            <tr>
                               <th className="px-6 py-3">Nome</th>
                               <th className="px-6 py-3">Licença</th>
                               <th className="px-6 py-3">Base</th>
                               <th className="px-6 py-3 text-right">Ações</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100">
                            {requests.filter(r => r.status === 'Pending').map((req) => (
                               <tr key={req.id} className="hover:bg-gray-50">
                                  <td className="px-6 py-4 font-medium text-gray-900">
                                     {req.name} <span className="block text-xs text-gray-500 font-normal">{req.email}</span>
                                  </td>
                                  <td className="px-6 py-4 font-mono text-gray-600">{req.license}</td>
                                  <td className="px-6 py-4">{req.airport.split(' ')[0]}</td>
                                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                                     <button onClick={() => handleApprove(req)} className="bg-green-100 text-green-700 hover:bg-green-200 p-2 rounded-lg transition" title="Aprovar"><Check className="w-4 h-4" /></button>
                                     <button onClick={() => handleReject(req.id)} className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded-lg transition" title="Rejeitar"><X className="w-4 h-4" /></button>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                 ) : (
                   <div className="p-8 text-center text-gray-500 text-sm">Não há novos pedidos.</div>
                 )}
              </div>

              {/* Active Members Management */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                 <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h3 className="font-bold text-gray-800">Membros Ativos</h3>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                       <input 
                          type="text" 
                          placeholder="Pesquisar membro..." 
                          className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cv-blue outline-none"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                       />
                    </div>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                       <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                          <tr>
                             <th className="px-6 py-3">Membro</th>
                             <th className="px-6 py-3">Função</th>
                             <th className="px-6 py-3">Status</th>
                             <th className="px-6 py-3 text-right">Gestão</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100">
                          {members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase())).map((member) => (
                             <tr key={member.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                   {member.name} <span className="block text-xs text-gray-500 font-mono font-normal">{member.license}</span>
                                </td>
                                <td className="px-6 py-4">
                                   <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${member.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                                      {member.role}
                                   </span>
                                </td>
                                <td className="px-6 py-4">
                                   <span className={`px-2 py-1 rounded text-xs font-bold ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                      {member.status}
                                   </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                   <div className="flex justify-end gap-2">
                                      <button 
                                        onClick={() => toggleRole(member.id)}
                                        className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded border border-gray-200"
                                      >
                                        {member.role === 'ADMIN' ? 'Despromover' : 'Tornar Admin'}
                                      </button>
                                      <button 
                                        onClick={() => toggleStatus(member.id)}
                                        className={`text-xs px-3 py-1 rounded border ${member.status === 'Active' ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' : 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'}`}
                                      >
                                        {member.status === 'Active' ? 'Suspender' : 'Ativar'}
                                      </button>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        )}

        {/* --- TAB: CONTENT --- */}
        {activeTab === 'content' && (
           <div className="space-y-8 animate-in fade-in">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* News Management */}
                 <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="font-bold text-gray-800 flex items-center gap-2">
                          <Bell className="w-5 h-5 text-blue-500" /> Notícias
                       </h3>
                       <button 
                         onClick={() => setIsNewsModalOpen(true)}
                         className="text-sm bg-cv-blue text-white px-3 py-1.5 rounded-lg hover:bg-blue-800 flex items-center gap-1"
                       >
                          <Plus className="w-4 h-4" /> Criar
                       </button>
                    </div>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                       {newsList.map(news => (
                          <div key={news.id} className="flex items-start justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 group">
                             <div className="truncate pr-4">
                                <p className="font-medium text-gray-900 truncate">{news.title}</p>
                                <p className="text-xs text-gray-500">{news.date} • {news.category}</p>
                             </div>
                             <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button className="text-gray-400 hover:text-blue-500 p-1"><Edit className="w-4 h-4" /></button>
                               <button onClick={() => handleDeleteNews(news.id)} className="text-gray-400 hover:text-red-500 p-1"><Trash2 className="w-4 h-4" /></button>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* NOTAMs Management */}
                 <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="font-bold text-gray-800 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5 text-amber-500" /> NOTAMs
                       </h3>
                       <button 
                         onClick={() => setIsNotamModalOpen(true)}
                         className="text-sm bg-cv-blue text-white px-3 py-1.5 rounded-lg hover:bg-blue-800 flex items-center gap-1"
                       >
                          <Plus className="w-4 h-4" /> Criar
                       </button>
                    </div>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                       {notamList.map(notam => (
                          <div key={notam.id} className="flex items-start justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 group">
                             <div>
                                <div className="flex items-center gap-2">
                                   <span className="font-mono font-bold text-xs bg-gray-200 px-1 rounded">{notam.id}</span>
                                   <span className="text-sm font-bold text-gray-700">{notam.airport.split(' ')[0]}</span>
                                   <span className={`text-[10px] px-1.5 rounded border ${notam.type === 'Alert' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>{notam.type}</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">{notam.description}</p>
                             </div>
                             <button onClick={() => handleDeleteNotam(notam.id)} className="text-gray-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        )}

        {/* --- TAB: FINANCE --- */}
        {activeTab === 'finance' && (
           <div className="space-y-8 animate-in fade-in">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                 <div className="flex justify-between items-center mb-6">
                    <div>
                       <h3 className="font-bold text-gray-800 flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" /> Gestão Financeira
                       </h3>
                       <p className="text-sm text-gray-500">Lançamento de receitas e despesas da associação.</p>
                    </div>
                    <button 
                      onClick={() => setIsFinanceModalOpen(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-green-700 shadow-sm"
                    >
                       <Plus className="w-4 h-4" /> Nova Transação
                    </button>
                 </div>
                 
                 <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                         <tr>
                            <th className="px-6 py-3">Data</th>
                            <th className="px-6 py-3">Descrição</th>
                            <th className="px-6 py-3">Categoria</th>
                            <th className="px-6 py-3">Tipo</th>
                            <th className="px-6 py-3 text-right">Valor</th>
                            <th className="px-6 py-3 text-right">Ações</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {financials.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50">
                               <td className="px-6 py-4 font-mono text-gray-500">{record.date}</td>
                               <td className="px-6 py-4 font-medium text-gray-900">{record.description}</td>
                               <td className="px-6 py-4"><span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{record.category}</span></td>
                               <td className="px-6 py-4">
                                  {record.type === 'Income' 
                                    ? <span className="flex items-center gap-1 text-green-600 text-xs font-bold"><TrendingUp className="w-3 h-3"/> Receita</span> 
                                    : <span className="flex items-center gap-1 text-red-600 text-xs font-bold"><TrendingDown className="w-3 h-3"/> Despesa</span>
                                  }
                               </td>
                               <td className="px-6 py-4 text-right font-bold">
                                  {record.amount.toLocaleString()} CVE
                               </td>
                               <td className="px-6 py-4 text-right">
                                  <button className="text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                 </div>
              </div>
           </div>
        )}

        {/* --- TAB: SETTINGS --- */}
        {activeTab === 'settings' && (
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 animate-in fade-in">
              <h3 className="font-bold text-gray-900 mb-6">Configuração Global do Sistema</h3>
              <div className="space-y-6 max-w-2xl">
                 <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                       <h4 className="font-bold text-gray-800">Estado Operacional</h4>
                       <p className="text-sm text-gray-500">Define a barra de status no topo.</p>
                    </div>
                    <select className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-cv-blue">
                       <option value="NORMAL">🟢 Normal</option>
                       <option value="ATTENTION">🟠 Atenção</option>
                       <option value="CRITICAL">🔴 Crítico</option>
                       <option value="MAINTENANCE">🔵 Manutenção</option>
                    </select>
                 </div>
                 <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                       <h4 className="font-bold text-gray-800">Modo de Manutenção</h4>
                       <p className="text-sm text-gray-500">Bloqueia o acesso público ao portal.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-cv-blue"></div>
                    </label>
                 </div>
              </div>
           </div>
        )}
      </div>

      {/* MODAL: CREATE NEWS */}
      {isNewsModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                 <h3 className="text-lg font-bold text-gray-900">Publicar Nova Notícia</h3>
                 <button onClick={() => setIsNewsModalOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
              </div>
              <form onSubmit={handleAddNews} className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                    <input required name="title" type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-cv-blue outline-none" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resumo</label>
                    <textarea required name="summary" rows={3} className="w-full p-2 border rounded focus:ring-2 focus:ring-cv-blue outline-none"></textarea>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select name="category" className="w-full p-2 border rounded bg-white">
                       <option value="Operacional">Operacional</option>
                       <option value="Formação">Formação</option>
                       <option value="Institucional">Institucional</option>
                    </select>
                 </div>
                 <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setIsNewsModalOpen(false)} className="flex-1 py-2 border rounded hover:bg-gray-50">Cancelar</button>
                    <button type="submit" className="flex-1 py-2 bg-cv-blue text-white rounded hover:bg-blue-800">Publicar</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* MODAL: CREATE NOTAM */}
      {isNotamModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                 <h3 className="text-lg font-bold text-gray-900">Emitir NOTAM (Simulação)</h3>
                 <button onClick={() => setIsNotamModalOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
              </div>
              <form onSubmit={handleAddNotam} className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Aeroporto</label>
                       <select name="airport" className="w-full p-2 border rounded bg-white text-sm">
                          {AIRPORTS.map(a => <option key={a} value={a}>{a}</option>)}
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Código Q</label>
                       <input required name="code" type="text" placeholder="QXXXX" className="w-full p-2 border rounded uppercase text-sm" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                    <select name="type" className="w-full p-2 border rounded bg-white">
                       <option value="Info">Info</option>
                       <option value="Warning">Warning</option>
                       <option value="Alert">Alert</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <textarea required name="description" rows={3} className="w-full p-2 border rounded font-mono text-sm uppercase" placeholder="TEXTO DO NOTAM..."></textarea>
                 </div>
                 <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setIsNotamModalOpen(false)} className="flex-1 py-2 border rounded hover:bg-gray-50">Cancelar</button>
                    <button type="submit" className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700">Emitir</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* MODAL: FINANCE TRANSACTION */}
      {isFinanceModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                 <h3 className="text-lg font-bold text-gray-900">Nova Transação Financeira</h3>
                 <button onClick={() => setIsFinanceModalOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
              </div>
              <form onSubmit={handleAddTransaction} className="space-y-4">
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                       <select name="type" className="w-full p-2 border rounded bg-white">
                          <option value="Income">Receita (+)</option>
                          <option value="Expense">Despesa (-)</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Valor (CVE)</label>
                       <input required name="amount" type="number" min="0" className="w-full p-2 border rounded" />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                    <input required name="description" type="text" className="w-full p-2 border rounded" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                    <select name="category" className="w-full p-2 border rounded bg-white">
                       <option value="Cotas">Cotas</option>
                       <option value="Eventos">Eventos</option>
                       <option value="Jurídico">Jurídico</option>
                       <option value="Tecnologia">Tecnologia</option>
                       <option value="Outros">Outros</option>
                    </select>
                 </div>
                 <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setIsFinanceModalOpen(false)} className="flex-1 py-2 border rounded hover:bg-gray-50">Cancelar</button>
                    <button type="submit" className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700">Salvar</button>
                 </div>
              </form>
           </div>
        </div>
      )}

    </div>
  );
};

export default AdminPanel;
