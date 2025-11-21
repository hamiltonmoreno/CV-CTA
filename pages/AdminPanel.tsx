
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  ShieldCheck, Users, FileText, Settings, Check, X, 
  Search, AlertTriangle, Bell, Plus, Trash2, Edit, 
  Save, DollarSign, TrendingUp, TrendingDown, BrainCircuit, Database, Upload, File, Loader2,
  ToggleLeft, ToggleRight, MessageSquare, CreditCard, Lock, Globe
} from 'lucide-react';
import { 
  MOCK_REGISTRATION_REQUESTS, MOCK_NEWS, MOCK_NOTAMS, 
  FINANCIAL_RECORDS, AIRPORTS 
} from '../constants';
import { RegistrationRequest, NewsItem, Notam, FinancialRecord, UserRole, Member, KnowledgeItem } from '../types';
import Breadcrumbs from '../components/Breadcrumbs';

// Mock Initial Active Members (simulating database)
const INITIAL_MEMBERS: Member[] = [
  { id: '1', name: 'Carlos Delgado', license: 'CV-CTA-056', role: UserRole.CONTROLLER, status: 'Active', quotaStatus: 'Up-to-date' },
  { id: '2', name: 'Ana Silva', license: 'CV-CTA-088', role: UserRole.SUPERVISOR, status: 'Active', quotaStatus: 'Up-to-date' },
  { id: '3', name: 'João Mendes', license: 'CV-CTA-012', role: UserRole.ADMIN, status: 'Active', quotaStatus: 'Up-to-date' },
];

interface Props {
  knowledgeBase?: KnowledgeItem[];
  onUpdateKnowledgeBase?: (kb: KnowledgeItem[]) => void;
}

type TabType = 'members' | 'content' | 'finance' | 'ai' | 'settings';

const AdminPanel: React.FC<Props> = ({ knowledgeBase = [], onUpdateKnowledgeBase }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabType) || 'members';

  const setActiveTab = (tab: TabType) => {
    setSearchParams({ tab });
  };
  
  // Local State for Data Management
  const [requests, setRequests] = useState<RegistrationRequest[]>(MOCK_REGISTRATION_REQUESTS);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [newsList, setNewsList] = useState<NewsItem[]>(MOCK_NEWS);
  const [notamList, setNotamList] = useState<Notam[]>(MOCK_NOTAMS);
  const [financials, setFinancials] = useState<FinancialRecord[]>(FINANCIAL_RECORDS);

  // Settings State
  const [systemConfig, setSystemConfig] = useState({
    operationalStatus: 'NORMAL',
    maintenanceMode: false,
    allowRegistrations: true,
    globalBanner: '',
    quotaValue: 2000,
    modules: {
      forum: true,
      chatbot: true,
      gallery: true
    }
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // UI States
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isNotamModalOpen, setIsNotamModalOpen] = useState(false);
  const [isFinanceModalOpen, setIsFinanceModalOpen] = useState(false);
  const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
  const [editingKnowledgeItem, setEditingKnowledgeItem] = useState<KnowledgeItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // File Upload State
  const [selectedFile, setSelectedFile] = useState<{name: string, data: string, type: string} | null>(null);
  const [isExtractingText, setIsExtractingText] = useState(false);
  const [extractedContent, setExtractedContent] = useState('');

  // --- PDF EXTRACTION LOGIC ---
  const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      // @ts-ignore - pdfjsLib is loaded via CDN in index.html
      const pdf = await window.pdfjsLib.getDocument(arrayBuffer).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += `--- PÁGINA ${i} ---\n${pageText}\n\n`;
      }
      return fullText;
    } catch (error) {
      console.error("Erro ao extrair PDF:", error);
      return "Erro ao extrair texto do PDF. Por favor, adicione uma descrição manual.";
    }
  };

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

  // --- SETTINGS MANAGEMENT ---
  const handleSaveSettings = () => {
    setIsSavingSettings(true);
    // Simulate API call
    setTimeout(() => {
      setIsSavingSettings(false);
      alert('Configurações salvas com sucesso!');
    }, 800);
  };

  const toggleModule = (module: 'forum' | 'chatbot' | 'gallery') => {
    setSystemConfig(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [module]: !prev.modules[module]
      }
    }));
  };

  // --- AI KNOWLEDGE BASE MANAGEMENT ---
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // 1. Prepare Base64 for AI Attachment
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const result = event.target.result as string;
          const base64Data = result.split(',')[1];
          
          setSelectedFile({
            name: file.name,
            type: file.type,
            data: base64Data
          });
        }
      };
      reader.readAsDataURL(file);

      // 2. Extract Text content for RAG search (Simulate or use PDF.js)
      if (file.type === 'application/pdf') {
        setIsExtractingText(true);
        const text = await extractTextFromPDF(file);
        setExtractedContent(text);
        setIsExtractingText(false);
      } else {
        // For images, we can't extract text easily client-side without OCR API
        setExtractedContent('[Imagem anexada: Forneça uma descrição manual do conteúdo desta imagem para ajudar na busca.]');
      }
    }
  };

  const handleSaveKnowledge = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onUpdateKnowledgeBase) return;

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const category = formData.get('category') as any;
    const content = formData.get('content') as string;

    const baseItem = {
        title, 
        category, 
        content, 
        lastUpdated: new Date().toISOString().split('T')[0]
    };

    if (editingKnowledgeItem) {
      // Update existing
      const updatedList = knowledgeBase.map(item => 
        item.id === editingKnowledgeItem.id 
          ? { 
              ...item, 
              ...baseItem,
              mediaData: selectedFile ? selectedFile.data : item.mediaData,
              mimeType: selectedFile ? selectedFile.type : item.mimeType,
              fileName: selectedFile ? selectedFile.name : item.fileName
            }
          : item
      );
      onUpdateKnowledgeBase(updatedList);
    } else {
      // Create new
      const newItem: KnowledgeItem = {
        id: `KB-${Date.now()}`,
        ...baseItem,
        mediaData: selectedFile?.data,
        mimeType: selectedFile?.type,
        fileName: selectedFile?.name
      };
      onUpdateKnowledgeBase([...knowledgeBase, newItem]);
    }
    setIsKnowledgeModalOpen(false);
    setEditingKnowledgeItem(null);
    setSelectedFile(null);
    setExtractedContent('');
  };

  const handleDeleteKnowledge = (id: string) => {
    if (onUpdateKnowledgeBase && window.confirm('Apagar este documento da base de conhecimento?')) {
      onUpdateKnowledgeBase(knowledgeBase.filter(k => k.id !== id));
    }
  };

  const openEditKnowledge = (item: KnowledgeItem) => {
    setEditingKnowledgeItem(item);
    setSelectedFile(null);
    setExtractedContent(item.content);
    setIsKnowledgeModalOpen(true);
  };

  const openNewKnowledge = () => {
    setEditingKnowledgeItem(null);
    setSelectedFile(null);
    setExtractedContent('');
    setIsKnowledgeModalOpen(true);
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
            { id: 'ai', icon: BrainCircuit, label: 'Inteligência Artificial' },
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

        {/* --- TAB: AI TRAINING (NEW) --- */}
        {activeTab === 'ai' && (
           <div className="space-y-8 animate-in fade-in">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                 <div className="flex justify-between items-center mb-6">
                    <div>
                       <h3 className="font-bold text-gray-800 flex items-center gap-2">
                          <BrainCircuit className="w-5 h-5 text-purple-600" /> Base de Conhecimento (RAG)
                       </h3>
                       <p className="text-sm text-gray-500">Gerir os documentos e textos que alimentam o assistente virtual.</p>
                    </div>
                    <button 
                      onClick={openNewKnowledge}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-purple-700 shadow-sm"
                    >
                       <Plus className="w-4 h-4" /> Novo Documento
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {knowledgeBase.map((item) => (
                       <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition shadow-sm group">
                          <div className="flex justify-between items-start mb-2">
                             <h4 className="font-bold text-gray-900 truncate pr-2">{item.title}</h4>
                             <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEditKnowledge(item)} className="text-blue-500 hover:bg-blue-50 p-1 rounded"><Edit className="w-4 h-4" /></button>
                                <button onClick={() => handleDeleteKnowledge(item.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
                             </div>
                          </div>
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                             <span className="text-[10px] uppercase bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-bold">{item.category}</span>
                             <span className="text-xs text-gray-400">{item.lastUpdated}</span>
                             {item.mediaData && (
                                <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-100 flex items-center gap-1">
                                   <File className="w-3 h-3" /> Anexo
                                </span>
                             )}
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 font-mono h-24 overflow-hidden relative">
                             {item.content || (item.mediaData ? '[Conteúdo do Arquivo Anexado]' : '[Sem conteúdo]')}
                             <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-gray-50 to-transparent"></div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {/* --- TAB: SETTINGS --- */}
        {activeTab === 'settings' && (
           <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 animate-in fade-in space-y-8">
              
              <div className="flex justify-between items-center">
                 <h3 className="font-bold text-gray-900 text-xl">Configuração Global do Sistema</h3>
                 <button 
                   onClick={handleSaveSettings}
                   className="bg-cv-blue text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-800 shadow-sm disabled:opacity-70"
                   disabled={isSavingSettings}
                 >
                   {isSavingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                   Salvar Alterações
                 </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 
                 {/* System Status */}
                 <div className="space-y-6">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Estado do Portal</h4>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
                       <div>
                          <h4 className="font-bold text-gray-800">Nível Operacional</h4>
                          <p className="text-sm text-gray-500">Define a barra de alerta no topo.</p>
                       </div>
                       <select 
                         value={systemConfig.operationalStatus}
                         onChange={(e) => setSystemConfig({...systemConfig, operationalStatus: e.target.value})}
                         className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-cv-blue"
                       >
                          <option value="NORMAL">🟢 Normal</option>
                          <option value="ATTENTION">🟠 Atenção</option>
                          <option value="CRITICAL">🔴 Crítico</option>
                          <option value="MAINTENANCE">🔵 Manutenção</option>
                       </select>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
                       <div>
                          <h4 className="font-bold text-gray-800">Modo de Manutenção</h4>
                          <p className="text-sm text-gray-500">Bloqueia o acesso público.</p>
                       </div>
                       <button 
                         onClick={() => setSystemConfig({...systemConfig, maintenanceMode: !systemConfig.maintenanceMode})}
                         className={`w-12 h-6 rounded-full relative transition-colors ${systemConfig.maintenanceMode ? 'bg-cv-blue' : 'bg-gray-200'}`}
                       >
                          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${systemConfig.maintenanceMode ? 'translate-x-6' : ''}`}></div>
                       </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
                       <div>
                          <h4 className="font-bold text-gray-800">Permitir Novos Registos</h4>
                          <p className="text-sm text-gray-500">Aceitar novos pedidos de acesso.</p>
                       </div>
                       <button 
                         onClick={() => setSystemConfig({...systemConfig, allowRegistrations: !systemConfig.allowRegistrations})}
                         className={`w-12 h-6 rounded-full relative transition-colors ${systemConfig.allowRegistrations ? 'bg-green-500' : 'bg-gray-200'}`}
                       >
                          <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${systemConfig.allowRegistrations ? 'translate-x-6' : ''}`}></div>
                       </button>
                    </div>
                 </div>

                 {/* Association Parameters */}
                 <div className="space-y-6">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Parâmetros da Associação</h4>
                    
                    <div className="p-4 border border-gray-200 rounded-lg bg-white">
                       <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-gray-800 flex items-center gap-2">
                             <CreditCard className="w-4 h-4 text-gray-500" /> Valor da Cota Mensal
                          </h4>
                       </div>
                       <div className="relative">
                          <input 
                            type="number" 
                            value={systemConfig.quotaValue}
                            onChange={(e) => setSystemConfig({...systemConfig, quotaValue: Number(e.target.value)})}
                            className="w-full pl-3 pr-12 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cv-blue outline-none"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-bold">CVE</span>
                       </div>
                       <p className="text-xs text-gray-500 mt-2">Este valor será aplicado automaticamente aos novos descontos em folha.</p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg bg-white">
                       <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                          <Lock className="w-4 h-4 text-gray-500" /> Segurança
                       </h4>
                       <button className="w-full border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium py-2 rounded-lg transition">
                          Forçar Reset de Senhas (Todos)
                       </button>
                    </div>
                 </div>

                 {/* Communication */}
                 <div className="lg:col-span-2 space-y-6">
                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Comunicação & Módulos</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="p-4 border border-gray-200 rounded-lg bg-white">
                          <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                             <Globe className="w-4 h-4 text-blue-500" /> Banner Global
                          </h4>
                          <textarea 
                            rows={3}
                            value={systemConfig.globalBanner}
                            onChange={(e) => setSystemConfig({...systemConfig, globalBanner: e.target.value})}
                            placeholder="Escreva um alerta para aparecer em todas as páginas (opcional)..."
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-cv-blue outline-none resize-none"
                          ></textarea>
                       </div>

                       <div className="p-4 border border-gray-200 rounded-lg bg-white">
                          <h4 className="font-bold text-gray-800 mb-4">Gestão de Módulos</h4>
                          <div className="space-y-3">
                             <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-gray-400"/> Fórum Interno</span>
                                <button onClick={() => toggleModule('forum')} className={`w-10 h-5 rounded-full relative transition-colors ${systemConfig.modules.forum ? 'bg-blue-500' : 'bg-gray-200'}`}>
                                   <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${systemConfig.modules.forum ? 'translate-x-5' : ''}`}></div>
                                </button>
                             </div>
                             <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 flex items-center gap-2"><BrainCircuit className="w-4 h-4 text-gray-400"/> Chatbot IA</span>
                                <button onClick={() => toggleModule('chatbot')} className={`w-10 h-5 rounded-full relative transition-colors ${systemConfig.modules.chatbot ? 'bg-blue-500' : 'bg-gray-200'}`}>
                                   <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${systemConfig.modules.chatbot ? 'translate-x-5' : ''}`}></div>
                                </button>
                             </div>
                             <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 flex items-center gap-2"><FileText className="w-4 h-4 text-gray-400"/> Galeria Multimédia</span>
                                <button onClick={() => toggleModule('gallery')} className={`w-10 h-5 rounded-full relative transition-colors ${systemConfig.modules.gallery ? 'bg-blue-500' : 'bg-gray-200'}`}>
                                   <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform ${systemConfig.modules.gallery ? 'translate-x-5' : ''}`}></div>
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>
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

      {/* MODAL: KNOWLEDGE BASE ITEM */}
      {isKnowledgeModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                 <h3 className="text-lg font-bold text-gray-900">
                    {editingKnowledgeItem ? 'Editar Documento IA' : 'Adicionar Conhecimento IA'}
                 </h3>
                 <button onClick={() => setIsKnowledgeModalOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
              </div>
              <form onSubmit={handleSaveKnowledge} className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Título do Documento</label>
                       <input 
                         required 
                         name="title" 
                         type="text" 
                         defaultValue={editingKnowledgeItem?.title}
                         className="w-full p-2 border rounded focus:ring-2 focus:ring-cv-blue outline-none" 
                         placeholder="Ex: Manual de Torre"
                       />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                       <select 
                         name="category" 
                         className="w-full p-2 border rounded bg-white"
                         defaultValue={editingKnowledgeItem?.category || 'Manual'}
                       >
                          <option value="Manual">Manual</option>
                          <option value="Regulamento">Regulamento</option>
                          <option value="Procedimento">Procedimento</option>
                          <option value="Outro">Outro</option>
                       </select>
                    </div>
                 </div>
                 
                 {/* File Upload Field */}
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Anexar Arquivo (PDF ou Imagem)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative">
                       <input 
                         type="file" 
                         accept=".pdf, image/*" 
                         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                         onChange={handleFileChange}
                       />
                       <div className="flex flex-col items-center gap-1 text-gray-500">
                          {selectedFile || editingKnowledgeItem?.mediaData ? (
                             <div className="text-cv-blue font-medium flex items-center gap-2">
                                <Check className="w-4 h-4" /> 
                                {selectedFile ? selectedFile.name : 'Arquivo Existente'}
                             </div>
                          ) : (
                             <>
                                <Upload className="w-6 h-6 mb-1" />
                                <span className="text-xs">Clique para selecionar PDF ou Imagem</span>
                             </>
                          )}
                          {isExtractingText && (
                             <div className="flex items-center gap-2 text-blue-600 text-xs font-bold mt-1">
                                <Loader2 className="w-3 h-3 animate-spin" /> Extraindo texto do PDF...
                             </div>
                          )}
                       </div>
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo do Texto / Descrição</label>
                    <p className="text-xs text-gray-500 mb-2">Este conteúdo é usado para a busca do assistente. Se anexar um PDF, o texto será extraído automaticamente abaixo.</p>
                    <textarea 
                      required 
                      name="content" 
                      rows={8} 
                      value={extractedContent || editingKnowledgeItem?.content}
                      onChange={(e) => setExtractedContent(e.target.value)}
                      className="w-full p-3 border rounded focus:ring-2 focus:ring-cv-blue outline-none font-mono text-sm" 
                      placeholder="Cole o conteúdo ou aguarde a extração automática..."
                    ></textarea>
                 </div>
                 <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setIsKnowledgeModalOpen(false)} className="flex-1 py-2 border rounded hover:bg-gray-50">Cancelar</button>
                    <button type="submit" className="flex-1 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                       {editingKnowledgeItem ? 'Atualizar' : 'Adicionar à Base'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

    </div>
  );
};

export default AdminPanel;
