
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Users, Vote, DollarSign, Calendar, FileText, 
  Plus, CheckCircle2, AlertCircle, 
  TrendingUp, Download, Video, Shield, ChevronRight, Clock,
  History, CreditCard, Briefcase, User, Award, Star, Zap, Mail, Phone, MessageSquare, Tag
} from 'lucide-react';
import { 
  ASSOCIATION_PROJECTS, VOTING_PROPOSALS, MEETINGS, 
  FINANCIAL_RECORDS, USER_QUOTAS, MOCK_MEMBER_HISTORY, MOCK_FORUM_THREADS 
} from '../constants';
import { UserRole, VoteProposal, FinancialRecord, MemberProfile } from '../types';
import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Breadcrumbs from '../components/Breadcrumbs';
import DigitalCard from '../components/DigitalCard';

interface Props {
  userRole?: UserRole;
  userProfile?: MemberProfile;
}

type TabType = 'overview' | 'profile' | 'voting' | 'finance' | 'projects' | 'meetings' | 'forum';

const Association: React.FC<Props> = ({ userRole = UserRole.CONTROLLER, userProfile }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get('tab') as TabType) || 'overview';

  const [votes, setVotes] = useState<VoteProposal[]>(VOTING_PROPOSALS);
  const [expenses, setExpenses] = useState<FinancialRecord[]>(FINANCIAL_RECORDS);

  const setActiveTab = (tab: TabType) => {
    setSearchParams({ tab });
  };

  // Mock Vote Action
  const handleVote = (proposalId: string, optionLabel: string) => {
    setVotes(prev => prev.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          userVoted: true,
          votedOption: optionLabel,
          votedDate: new Date().toISOString().split('T')[0],
          options: p.options.map(o => o.label === optionLabel ? { ...o, count: o.count + 1 } : o)
        };
      }
      return p;
    }));
  };

  // Mock Receipt Download
  const handleDownloadReceipt = (month: string) => {
    alert(`A descarregar recibo de pagamento de ${month}...`);
  };

  // Financial Chart Data
  const income = expenses.filter(e => e.type === 'Income').reduce((acc, curr) => acc + curr.amount, 0);
  const expense = expenses.filter(e => e.type === 'Expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expense;

  const pieData = [
    { name: 'Receitas', value: income, color: '#10B981' },
    { name: 'Despesas', value: expense, color: '#EF4444' }
  ];

  const isAdmin = userRole === UserRole.ADMIN;

  const pendingQuota = USER_QUOTAS.find(q => q.status === 'Pending');
  // Use the passed userProfile prop, fallback only if necessary (though prop is expected)
  const profile = userProfile; 

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header Section */}
      <div className="bg-gray-900 text-white pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                 <div className="bg-white/10 p-2 rounded-lg">
                    <Users className="w-8 h-8 text-blue-300" />
                 </div>
                 <h1 className="text-3xl font-bold">Associação Profissional</h1>
              </div>
              <p className="text-gray-400 max-w-2xl">
                Plataforma de gestão democrática, transparência financeira e luta pela classe dos Controladores de Tráfego Aéreo de Cabo Verde.
              </p>
            </div>
            
            {isAdmin && (
              <div className="bg-blue-600 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
                <Shield className="w-4 h-4" /> Painel Administrativo Ativo
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs (Overlapping Header) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2 flex flex-wrap gap-2 overflow-x-auto">
          {[
            { id: 'overview', icon: TrendingUp, label: 'Visão Geral' },
            { id: 'profile', icon: User, label: 'Meu Perfil' },
            { id: 'finance', icon: DollarSign, label: 'Tesouraria' },
            { id: 'voting', icon: Vote, label: 'Votação' },
            { id: 'forum', icon: MessageSquare, label: 'Fórum' },
            { id: 'projects', icon: FileText, label: 'Projetos' },
            { id: 'meetings', icon: Video, label: 'Reuniões' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
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

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quick Stats */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                   <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-4">Estado Financeiro</h3>
                   <div className="flex items-end gap-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">{balance.toLocaleString()} CVE</span>
                      <span className="text-green-500 text-sm font-medium mb-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1"/> +12%</span>
                   </div>
                   <p className="text-xs text-gray-400">Saldo atual em caixa</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                   <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-4">Votações Ativas</h3>
                   <div className="flex items-end gap-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">{votes.filter(v => !v.userVoted).length}</span>
                      <span className="text-gray-400 text-sm font-medium mb-1">Pendentes</span>
                   </div>
                   <p className="text-xs text-gray-400">Exerça o seu direito de voto</p>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                   <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide mb-4">Status da Cota</h3>
                   <div className="flex items-end gap-2 mb-2">
                      {pendingQuota ? (
                         <span className="text-xl font-bold text-gray-700">Agendada</span>
                      ) : (
                         <span className="text-xl font-bold text-green-600">Regularizada</span>
                      )}
                      <span className="text-gray-400 text-sm font-medium mb-1 ml-auto">Out 2025</span>
                   </div>
                   <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                      <CreditCard className="w-3 h-3" />
                      Desconto automático em folha
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity Feed */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                   <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                     <h3 className="font-bold text-gray-800">Últimas Atividades da Associação</h3>
                   </div>
                   <div className="divide-y divide-gray-100">
                      {ASSOCIATION_PROJECTS.slice(0,2).map(proj => (
                        <div key={proj.id} className="p-4 hover:bg-gray-50 flex gap-4">
                           <div className="mt-1">
                             <FileText className="w-5 h-5 text-blue-500" />
                           </div>
                           <div>
                             <p className="font-medium text-gray-900">{proj.title}</p>
                             <p className="text-sm text-gray-500">Projeto atualizado para: <span className="text-blue-600 font-medium">{proj.status}</span></p>
                           </div>
                        </div>
                      ))}
                      {MEETINGS.slice(0,1).map(mtg => (
                        <div key={mtg.id} className="p-4 hover:bg-gray-50 flex gap-4">
                           <div className="mt-1">
                             <Calendar className="w-5 h-5 text-green-500" />
                           </div>
                           <div>
                             <p className="font-medium text-gray-900">Nova Reunião Agendada: {mtg.title}</p>
                             <p className="text-sm text-gray-500">{mtg.date} às {mtg.time}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                
                {/* Member History Log */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                   <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                     <h3 className="font-bold text-gray-800 flex items-center gap-2">
                       <History className="w-4 h-4 text-gray-500" /> Histórico do Associado
                     </h3>
                   </div>
                   <div className="max-h-[300px] overflow-y-auto">
                      {MOCK_MEMBER_HISTORY.map((log) => (
                         <div key={log.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 text-sm">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                               <span>{log.date}</span>
                               <span>{log.performedBy}</span>
                            </div>
                            <p className="font-bold text-gray-800">{log.action}</p>
                            <p className="text-gray-600">{log.details}</p>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* TAB: PROFILE (PERFORMANCE & DETAILS) */}
        {activeTab === 'profile' && profile && (
           <div className="space-y-6 animate-in fade-in">
              
              {/* Profile Header Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-8 items-center md:items-start">
                 <div className="shrink-0 text-center">
                    <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                       <User className="w-16 h-16 text-gray-400" />
                       {/* In real app: <img src={profile.avatar} /> */}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${profile.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                       {profile.status === 'Active' ? 'Associado Ativo' : 'Inativo'}
                    </span>
                 </div>
                 
                 <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                       <div>
                          <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                          <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
                             <Briefcase className="w-4 h-4" /> {profile.role} | {profile.base}
                          </p>
                       </div>
                       <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 text-center">
                          <p className="text-xs text-blue-600 font-bold uppercase">Nº Licença</p>
                          <p className="font-mono font-bold text-gray-900">{profile.license}</p>
                       </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 max-w-3xl">{profile.bio}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                       <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400" /> {profile.email}
                       </div>
                       <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" /> {profile.phone}
                       </div>
                       <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-gray-400" /> Desde {new Date(profile.admissionDate).getFullYear()}
                       </div>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 
                 {/* NEW: DIGITAL CARD SECTION */}
                 <div className="lg:col-span-1">
                    <DigitalCard member={profile} />
                 </div>

                 {/* Performance Metrics */}
                 <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                       <TrendingUp className="w-5 h-5 text-cv-blue" /> Desempenho & Participação
                    </h3>
                    
                    <div className="space-y-6">
                       {/* Voting Rate */}
                       <div>
                          <div className="flex justify-between mb-2">
                             <span className="text-sm font-medium text-gray-700">Participação em Votações</span>
                             <span className="text-sm font-bold text-blue-600">{profile.stats.votingParticipation}%</span>
                          </div>
                          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                             <div 
                               className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000"
                               style={{ width: `${profile.stats.votingParticipation}%` }}
                             ></div>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">Baseado nas últimas 10 assembleias deliberativas.</p>
                       </div>

                       {/* Attendance Rate */}
                       <div>
                          <div className="flex justify-between mb-2">
                             <span className="text-sm font-medium text-gray-700">Presença em Reuniões</span>
                             <span className="text-sm font-bold text-purple-600">{profile.stats.meetingAttendance}%</span>
                          </div>
                          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                             <div 
                               className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-1000"
                               style={{ width: `${profile.stats.meetingAttendance}%` }}
                             ></div>
                          </div>
                       </div>

                       {/* Quota Streak */}
                       <div className="grid grid-cols-2 gap-4 pt-4">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                             <div className="text-green-600 font-bold text-2xl">{profile.stats.quotaStreak}</div>
                             <div className="text-xs text-green-800 uppercase font-bold">Meses Consecutivos</div>
                             <p className="text-xs text-green-700 mt-1">Cotas em dia.</p>
                          </div>
                          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                             <div className="text-amber-600 font-bold text-2xl">{profile.stats.projectsInvolved}</div>
                             <div className="text-xs text-amber-800 uppercase font-bold">Projetos Ativos</div>
                             <p className="text-xs text-amber-700 mt-1">Contribuição direta.</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Engagement & Badges */}
                 <div className="space-y-6">
                    {/* Engagement Score Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white rounded-xl shadow-lg p-6 text-center relative overflow-hidden">
                       <div className="relative z-10">
                          <h3 className="text-sm font-medium text-blue-200 uppercase tracking-wider mb-2">Nível de Engajamento</h3>
                          <div className="text-5xl font-bold mb-2">{profile.stats.engagementScore}</div>
                          <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-4">
                             <Star className="w-3 h-3 fill-current" /> Associado Ouro
                          </div>
                          <p className="text-xs text-gray-300">
                             O seu nível de participação é exemplar. Continue a contribuir para a nossa classe!
                          </p>
                       </div>
                       {/* Decoration */}
                       <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500 rounded-full filter blur-[40px] opacity-30"></div>
                    </div>

                    {/* Badges Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                       <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                          <Award className="w-4 h-4 text-amber-500" /> Reconhecimentos
                       </h3>
                       <div className="space-y-4">
                          {profile.badges.map((badge) => (
                             <div key={badge.id} className="flex gap-3 items-start">
                                <div className="bg-amber-50 p-2 rounded-lg text-amber-600 shrink-0">
                                   <Zap className="w-5 h-5" />
                                </div>
                                <div>
                                   <h4 className="font-bold text-gray-900 text-sm">{badge.name}</h4>
                                   <p className="text-xs text-gray-500">{badge.description}</p>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>

              </div>
           </div>
        )}

        {/* ... (Other tabs remain unchanged: FORUM, VOTING, PROJECTS, MEETINGS, FINANCE) ... */}
        {activeTab === 'forum' && (
           <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center">
                 <h2 className="text-xl font-bold text-gray-900">Fórum de Discussão Interna</h2>
                 <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Novo Tópico
                 </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                 {MOCK_FORUM_THREADS.map(thread => (
                    <div key={thread.id} className="p-6 border-b border-gray-100 hover:bg-gray-50 transition cursor-pointer">
                       <div className="flex items-start justify-between">
                          <div>
                             <div className="flex items-center gap-2 mb-2">
                                {thread.tags.map(tag => (
                                   <span key={tag} className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase flex items-center gap-1">
                                      <Tag className="w-3 h-3" /> {tag}
                                   </span>
                                ))}
                             </div>
                             <h3 className="text-lg font-bold text-gray-900 mb-1">{thread.title}</h3>
                             <p className="text-sm text-gray-500">Iniciado por <span className="font-medium text-gray-800">{thread.author}</span> • {thread.date}</p>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                             <div className="text-center">
                                <span className="block font-bold text-gray-900 text-lg">{thread.replies}</span>
                                <span className="text-xs">Respostas</span>
                             </div>
                             <div className="text-right hidden sm:block">
                                <p className="text-xs">Última atividade</p>
                                <p className="font-medium text-gray-800">{thread.lastActivity}</p>
                             </div>
                             <ChevronRight className="w-5 h-5 text-gray-300" />
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {activeTab === 'voting' && (
          <div className="space-y-12 animate-in fade-in">
             {/* Active Votes */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {votes.filter(v => !v.userVoted).length > 0 ? (
                  votes.filter(v => !v.userVoted).map((vote) => (
                    <div key={vote.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <span className="text-xs font-bold px-2 py-1 rounded uppercase bg-blue-100 text-blue-600">
                                Votação Aberta
                             </span>
                             <h3 className="text-xl font-bold text-gray-900 mt-2">{vote.title}</h3>
                          </div>
                          <div className="text-xs text-gray-500 text-right">
                             <p>Prazo:</p>
                             <p className="font-mono">{vote.deadline}</p>
                          </div>
                       </div>
                       <p className="text-gray-600 mb-6 flex-1">{vote.description}</p>
                       
                       <div className="space-y-3">
                          {vote.options.map((option) => (
                             <div key={option.label}>
                                <button 
                                  onClick={() => handleVote(vote.id, option.label)}
                                  className="mt-2 w-full py-2 border border-gray-200 rounded hover:bg-gray-50 text-sm font-medium transition"
                                >
                                   Votar {option.label}
                                </button>
                             </div>
                          ))}
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500">Não há votações ativas de momento.</p>
                  </div>
                )}
                
                {isAdmin && (
                  <button className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition h-full min-h-[250px]">
                     <Plus className="w-8 h-8 mb-2" />
                     <span className="font-medium">Criar Nova Proposta</span>
                  </button>
                )}
             </div>

             {votes.filter(v => v.userVoted).length > 0 && (
               <div>
                 <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                   <History className="w-5 h-5 text-gray-500" /> Histórico de Votação
                 </h3>
                 <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                   <table className="w-full text-sm text-left">
                     <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                       <tr>
                         <th className="px-6 py-3">Proposta</th>
                         <th className="px-6 py-3">Data do Voto</th>
                         <th className="px-6 py-3">A sua Opção</th>
                         <th className="px-6 py-3">Status</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                       {votes.filter(v => v.userVoted).map((vote) => (
                         <tr key={vote.id} className="hover:bg-gray-50">
                           <td className="px-6 py-4 font-medium text-gray-900">{vote.title}</td>
                           <td className="px-6 py-4 font-mono text-gray-500">{vote.votedDate || 'N/A'}</td>
                           <td className="px-6 py-4">
                             <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                               <CheckCircle2 className="w-3 h-3" />
                               {vote.votedOption}
                             </span>
                           </td>
                           <td className="px-6 py-4">
                             <span className="text-xs text-gray-500">Voto Registado</span>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
               </div>
             )}
          </div>
        )}

        {/* ... (Rest of the tabs: PROJECTS, MEETINGS, FINANCE - kept identical to preserve existing functionality) ... */}
        {activeTab === 'projects' && (
           <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center">
                 <h2 className="text-xl font-bold text-gray-900">Caderno de Reivindicações & Projetos</h2>
                 {isAdmin && (
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center gap-2">
                       <Plus className="w-4 h-4" /> Novo Projeto
                    </button>
                 )}
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                 {ASSOCIATION_PROJECTS.map((project) => (
                    <div key={project.id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition">
                       <div className="p-4 bg-blue-50 rounded-full">
                          <FileText className="w-6 h-6 text-blue-600" />
                       </div>
                       <div className="flex-1 w-full">
                          <div className="flex flex-wrap justify-between items-start mb-2">
                             <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                             <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                project.status === 'Aprovado' ? 'bg-green-100 text-green-800' : 
                                project.status === 'Em Negociação' ? 'bg-amber-100 text-amber-800' : 
                                'bg-gray-100 text-gray-600'
                             }`}>
                                {project.status}
                             </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                          
                          {/* Progress Bar */}
                          <div className="flex items-center gap-4">
                             <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${project.progress}%` }}></div>
                             </div>
                             <span className="text-sm font-bold text-blue-600">{project.progress}%</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">Responsável: {project.owner}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {activeTab === 'meetings' && (
           <div className="animate-in fade-in">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                 <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Próximas Reuniões & Assembleias</h3>
                    <button className="text-blue-600 text-sm font-medium hover:underline">Ver Histórico</button>
                 </div>
                 <div className="divide-y divide-gray-100">
                    {MEETINGS.map((meeting) => (
                       <div key={meeting.id} className="p-6 flex flex-col md:flex-row items-center gap-6 hover:bg-gray-50 transition">
                          <div className="flex flex-col items-center min-w-[80px] p-3 bg-blue-50 rounded-xl text-blue-800">
                             <span className="text-2xl font-bold">{meeting.date.split('-')[2]}</span>
                             <span className="text-xs font-bold uppercase">OUT</span>
                          </div>
                          <div className="flex-1 text-center md:text-left">
                             <h4 className="text-lg font-bold text-gray-900">{meeting.title}</h4>
                             <p className="text-sm text-gray-500 flex items-center justify-center md:justify-start gap-2 mt-1">
                                <Clock className="w-4 h-4" /> {meeting.time} • {meeting.type}
                             </p>
                          </div>
                          <div className="flex gap-3 w-full md:w-auto">
                             {meeting.link && (
                                <a 
                                  href={meeting.link} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="flex-1 md:flex-none bg-cv-blue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition flex items-center justify-center gap-2"
                                >
                                   <Video className="w-4 h-4" /> Entrar na Sala
                                </a>
                             )}
                             <button className="flex-1 md:flex-none border border-gray-300 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-100">
                                Pauta
                             </button>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Download className="w-4 h-4"/> Documentos Recentes</h4>
                    <ul className="space-y-3 text-sm">
                       <li className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                          <FileText className="w-4 h-4 text-gray-400" /> Ata da Assembleia Geral Set/2025
                       </li>
                       <li className="flex items-center gap-2 text-gray-600 hover:text-blue-600 cursor-pointer">
                          <FileText className="w-4 h-4 text-gray-400" /> Relatório de Contas Q3 2025
                       </li>
                    </ul>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'finance' && (
          <div className="space-y-6 animate-in fade-in">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Financial Overview Chart */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                   <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-gray-800">Transparência Financeira (Ano Corrente)</h3>
                      {isAdmin && <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full">+ Lançar Gasto</button>}
                   </div>
                   <div className="h-64 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}>
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                          <Tooltip formatter={(value: number) => `${value.toLocaleString()} CVE`} />
                        </RechartsPie>
                      </ResponsiveContainer>
                      <div className="absolute text-center">
                         <p className="text-xs text-gray-400">Saldo Líquido</p>
                         <p className="text-xl font-bold text-gray-900">{balance.toLocaleString()}</p>
                      </div>
                   </div>
                   <div className="flex justify-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                         <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                         <span className="text-sm text-gray-600">Receitas: {income.toLocaleString()} CVE</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                         <span className="text-sm text-gray-600">Despesas: {expense.toLocaleString()} CVE</span>
                      </div>
                   </div>
                </div>

                {/* My Quotas Statement */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                   <div className="mb-4">
                      <h3 className="font-bold text-gray-800 mb-2">Extrato de Cotas</h3>
                      <div className="bg-blue-50 text-blue-800 text-xs p-3 rounded-lg flex items-start gap-2">
                         <Briefcase className="w-4 h-4 shrink-0 mt-0.5" />
                         <p>
                           <strong>Nota Informativa:</strong> O pagamento das cotas é efetuado automaticamente via desconto na folha de vencimento mensal. Este quadro serve apenas para conferência.
                         </p>
                      </div>
                   </div>
                   
                   <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px]">
                      {USER_QUOTAS.map((quota, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                           <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${quota.status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                                 {quota.status === 'Paid' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                              </div>
                              <div>
                                 <p className="font-medium text-gray-900">{quota.month} {quota.year}</p>
                                 <p className="text-xs text-gray-500">
                                   {quota.status === 'Paid' 
                                     ? `Descontado em ${quota.paidDate}` 
                                     : 'Agendado para final do mês'}
                                 </p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="font-bold text-gray-900">{quota.amount} CVE</p>
                              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                                {quota.status === 'Paid' ? 'Processado' : 'Automático'}
                              </p>
                              {quota.status === 'Paid' && (
                                <button 
                                  onClick={() => handleDownloadReceipt(quota.month)}
                                  className="text-[10px] text-blue-600 font-medium hover:underline flex items-center justify-end gap-1 w-full mt-1"
                                >
                                  <Download className="w-3 h-3" /> Recibo
                                </button>
                              )}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Recent Transactions Table */}
             <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                   <h3 className="font-bold text-gray-800">Últimos Movimentos da Tesouraria</h3>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left">
                      <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                         <tr>
                            <th className="px-6 py-3">Data</th>
                            <th className="px-6 py-3">Descrição</th>
                            <th className="px-6 py-3">Categoria</th>
                            <th className="px-6 py-3 text-right">Valor</th>
                         </tr>
                      </thead>
                      <tbody>
                         {expenses.map((record) => (
                            <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                               <td className="px-6 py-4 font-mono text-gray-500">{record.date}</td>
                               <td className="px-6 py-4 font-medium text-gray-900">{record.description}</td>
                               <td className="px-6 py-4">
                                  <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">{record.category}</span>
                               </td>
                               <td className={`px-6 py-4 text-right font-bold ${record.type === 'Income' ? 'text-green-600' : 'text-red-600'}`}>
                                  {record.type === 'Income' ? '+' : '-'} {record.amount.toLocaleString()} CVE
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Association;
