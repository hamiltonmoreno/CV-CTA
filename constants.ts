
import { NewsItem, Notam, Document, FlightStat, Project, VoteProposal, Meeting, FinancialRecord, UserQuota, MemberHistoryLog, MemberProfile, UserRole, RegistrationRequest, GlossaryTerm, ForumThread, MediaItem, KnowledgeItem } from './types';

export const APP_NAME = "CV-CTA Portal";

// ... (Keep previous exports unchanged until MOCK_NEWS) ...
export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Briefing: Simulação de emergência no Aeroporto do Sal',
    summary: 'Exercício em escala real programado para 22 de Outubro de 2025. Todos os controladores devem rever os procedimentos de emergência e coordenação com a proteção civil.',
    date: '2025-10-14',
    category: 'Operacional',
    imageUrl: 'https://images.unsplash.com/photo-1474302770737-173ee21c6342?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '2',
    title: 'Novos Procedimentos de Transferência Radar (v1.2)',
    summary: 'Atualização mandatória dos protocolos de hand-off entre ACC Sal e Dakar Oceanic. As mudanças visam otimizar o fluxo na rota Atlântico Sul.',
    date: '2025-10-10',
    category: 'Formação',
    imageUrl: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '3',
    title: 'Recrutamento Aberto: Controladores Estagiários',
    summary: 'Abertura de concurso público para 15 novas vagas para formação de controladores de tráfego aéreo. O curso terá duração de 18 meses.',
    date: '2025-10-05',
    category: 'Institucional',
    imageUrl: 'https://images.unsplash.com/photo-1559627748-db5470e1b0a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '4',
    title: 'Instalação de Novo Radar Secundário em Santiago',
    summary: 'A ASA concluiu a instalação do novo sistema MSSR na ilha de Santiago, aumentando a cobertura radar na TMA da Praia para níveis inferiores.',
    date: '2025-09-28',
    category: 'Operacional',
    imageUrl: 'https://images.unsplash.com/photo-1610312278520-bcc093194231?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '5',
    title: 'Cabo Verde Eleito para o Conselho da ICAO',
    summary: 'Reconhecimento internacional pela excelência na gestão do espaço aéreo atlântico e compromisso com a redução de emissões de carbono.',
    date: '2025-09-15',
    category: 'Institucional',
    imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '6',
    title: 'Curso de Inglês Aeronáutico Nível 5 e 6',
    summary: 'Inscrições abertas para o programa intensivo de manutenção de proficiência linguística. Aulas presenciais no Sal e Praia.',
    date: '2025-09-01',
    category: 'Formação',
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '7',
    title: 'Novo Sistema de Comunicações Voz (VCS)',
    summary: 'Implementação bem-sucedida do sistema digital de comunicações voz em todas as posições de controlo da FIR Sal.',
    date: '2025-08-20',
    category: 'Operacional',
    imageUrl: 'https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '8',
    title: 'Protocolo de Cooperação com a NAV Portugal',
    summary: 'Intercâmbio de controladores e partilha de experiências na gestão de espaço aéreo oceânico.',
    date: '2025-08-15',
    category: 'Institucional',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '9',
    title: 'Formação em Fatores Humanos',
    summary: 'Workshop sobre gestão de erro e trabalho em equipa (TRM) para supervisores.',
    date: '2025-08-10',
    category: 'Formação',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '10',
    title: 'Renovação da Certificação do ATS',
    summary: 'A AAC renovou o certificado de prestador de serviços de tráfego aéreo por mais 5 anos.',
    date: '2025-08-05',
    category: 'Institucional',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '11',
    title: 'Procedimentos de Contingência Vulcânica',
    summary: 'Simulação de ativação do plano de contingência devido a cinzas vulcânicas.',
    date: '2025-07-30',
    category: 'Operacional',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '12',
    title: 'Programa de Bem-estar Mental',
    summary: 'Lançamento do programa de apoio psicológico e gestão de stress para controladores (CISM).',
    date: '2025-07-25',
    category: 'Institucional',
    imageUrl: 'https://images.unsplash.com/photo-1544367563-12123d896889?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  }
];

export const MOCK_NOTAMS: Notam[] = [
  {
    id: 'A1234/25',
    airport: 'GVAC (Sal)',
    code: 'QMRLC',
    validFrom: '2025-10-15 08:00',
    validTo: '2025-10-15 16:00',
    description: 'RWY 01/19 CLOSED DUE TO MAINT WORK.',
    type: 'Warning'
  },
  {
    id: 'A1235/25',
    airport: 'GVNP (Praia)',
    code: 'QFAXX',
    validFrom: '2025-10-14 00:00',
    validTo: 'PERM',
    description: 'FIRE FIGHTING CAT UPGRADED TO CAT 8.',
    type: 'Info'
  },
  {
    id: 'A1236/25',
    airport: 'GVSV (São Vicente)',
    code: 'QILAS',
    validFrom: '2025-10-16 10:00',
    validTo: '2025-10-16 14:00',
    description: 'ILS RWY 25 U/S DUE TO CALIBRATION FLIGHT.',
    type: 'Alert'
  }
];

export const MOCK_DOCS: Document[] = [
  {
    id: 'CV-CAR-11',
    title: 'CV-CAR 11 - Serviços de Tráfego Aéreo',
    version: 'Edição 2',
    updatedAt: '2024-05-12',
    category: 'Legislação',
    size: '2.4 MB',
    url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' // Simulation URL 1
  },
  {
    id: 'CV-CAR-1',
    title: 'CV-CAR 1 - Licenciamento de Pessoal',
    version: 'Edição 4',
    updatedAt: '2025-01-15',
    category: 'Legislação',
    size: '3.1 MB',
    url: 'https://pdfobject.com/pdf/sample.pdf' // Simulation URL 2
  },
  {
    id: 'MAN-TWR',
    title: 'Manual de Operações TWR (Sal)',
    version: '3.4',
    updatedAt: '2025-09-01',
    category: 'Manual',
    size: '4.2 MB',
    url: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf' // Simulation URL 3
  }
];

// Initial Data for AI Knowledge Base
export const INITIAL_KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: 'WEB-AAC',
    title: 'Site Oficial da Agência de Aviação Civil (AAC)',
    category: 'Outro',
    lastUpdated: new Date().toISOString().split('T')[0],
    content: `
REFERÊNCIA PARA BUSCA WEB:
Este item serve como ponte para o site oficial da AAC (www.aac.cv).
A Agência de Aviação Civil regula toda a atividade aeronáutica em Cabo Verde.
O assistente deve usar o Google Search ('site:aac.cv') para encontrar:
- Regulamentos atualizados (CV-CARs).
- Circulares de Informação Aeronáutica (AICs).
- Legislação e Diretivas de Segurança Operacional.
- Comunicados de imprensa e taxas aeronáuticas.
    `
  },
  {
    id: 'INTL-STD-ICAO',
    title: 'Padrões Internacionais de Controlo de Tráfego Aéreo (ICAO)',
    category: 'Regulamento',
    lastUpdated: new Date().toISOString().split('T')[0],
    content: `
CONTEÚDO DE REFERÊNCIA: PADRÕES INTERNACIONAIS ICAO
O assistente deve utilizar o seu conhecimento pré-treinado e busca web para responder com base nos seguintes documentos padrão da OACI (ICAO), sempre que a regulamentação local (CV-CAR) for omissa:

1. Anexo 2: Regras do Ar (Rules of the Air).
2. Anexo 11: Serviços de Tráfego Aéreo (Air Traffic Services).
3. Doc 4444: Gestão de Tráfego Aéreo (PANS-ATM).
4. Doc 8168: Operações de Aeronaves (PANS-OPS).
5. Anexo 10: Telecomunicações Aeronáuticas (Vols I-V).

HIERARQUIA DE APLICAÇÃO:
1. Legislação Nacional de Cabo Verde (CV-CAR).
2. Procedimentos Regionais (AFI Region).
3. Padrões Internacionais (ICAO Standards - SARPs).
    `
  },
  {
    id: 'CV-CAR-11',
    title: 'CV-CAR 11 - Serviços de Tráfego Aéreo',
    category: 'Regulamento',
    lastUpdated: '2024-05-12',
    content: `
CONTEÚDO DO DOCUMENTO: CV-CAR 11 - Serviços de Tráfego Aéreo
FONTE: Agência de Aviação Civil (AAC)

CAPÍTULO 2: GERAL
2.1. A autoridade competente para a designação do espaço aéreo e dos aeródromos controlados é a AAC.
2.2. Os Serviços de Tráfego Aéreo (ATS) compreendem três serviços identificados como se segue:
      a) Serviço de controlo de tráfego aéreo (Controlo de área, aproximação e aeródromo);
      b) Serviço de informação de voo;
      c) Serviço de alerta.

CAPÍTULO 3: SERVIÇO DE CONTROLO DE TRÁFEGO AÉREO
3.1. Separações Mínimas: A separação vertical mínima reduzida (RVSM) de 300 m (1 000 pés) aplica-se entre FL 290 e FL 410 na FIR Sal.

CAPÍTULO 4: SERVIÇO DE INFORMAÇÃO DE VOO
4.1. O Serviço de Informação de Voo (FIS) deve ser prestado a todas as aeronaves que possam ser afetadas pela informação e que estejam a receber serviço de controlo de tráfego aéreo; ou conhecidas dos órgãos ATS.
    `
  },
  {
    id: 'CV-CAR-1',
    title: 'CV-CAR 1 - Licenciamento de Pessoal Aeronáutico',
    category: 'Regulamento',
    lastUpdated: '2025-01-15',
    content: `
CONTEÚDO DO DOCUMENTO: CV-CAR 1 - Licenciamento de Pessoal Aeronáutico
FONTE: Agência de Aviação Civil (AAC)

SUBPARTE D: LICENÇA DE CONTROLADOR DE TRÁFEGO AÉREO (ATCL)
1. Requisitos de Idade: O requerente deve ter pelo menos 21 anos de idade.
2. Requisitos Médicos: O requerente deve possuir um Certificado Médico Classe 3 válido.
3. Requisitos de Conhecimento: O requerente deve demonstrar conhecimentos em Legislação Aérea, Equipamento ATC, Geral, Navegação, Procedimentos Operacionais, etc.
4. Requisitos de Proficiência Linguística: Mínimo Nível Operacional 4 (OACI) em Inglês e Português.
    `
  },
  {
    id: 'MAN-TWR',
    title: 'Manual de Operações TWR (Sal)',
    category: 'Manual',
    lastUpdated: '2025-09-01',
    content: `
CONTEÚDO DO DOCUMENTO: Manual de Operações Torre (TWR) - GVAC

CAPÍTULO 3: VENTOS E LIMITES
3.1. Limite de Vento Cruzado (Crosswind): Para B737/A320 é 35kt em pista seca e 15kt em pista molhada.
3.2. Tailwind: Máximo de 10kt para aterragens e 15kt para descolagens.

CAPÍTULO 5: FRASEOLOGIA LOCAL
PT: "Autorizado a aterrar pista 01, vento 360 graus 10 nós."
EN: "Cleared to land runway 01, wind 360 degrees 10 knots."
    `
  }
];

// Deprecated but kept for compatibility if needed, but components should use INITIAL_KNOWLEDGE_BASE
export const DOC_CONTENTS: Record<string, string> = {};

export const TRAFFIC_DATA: FlightStat[] = [
  { time: '00:00', arrivals: 2, departures: 1 },
  { time: '04:00', arrivals: 5, departures: 3 },
  { time: '08:00', arrivals: 12, departures: 10 },
  { time: '12:00', arrivals: 18, departures: 15 },
  { time: '16:00', arrivals: 22, departures: 20 },
  { time: '20:00', arrivals: 10, departures: 12 },
];

export const AIRPORTS = ['GVAC (Sal)', 'GVNP (Praia)', 'GVSV (São Vicente)', 'GVBA (Boa Vista)'];

// ... (Keep remaining constants unchanged: ASSOCIATION_PROJECTS, VOTING_PROPOSALS, MEETINGS, FINANCIAL_RECORDS, USER_QUOTAS, MOCK_MEMBER_HISTORY, MOCK_MEMBER_PROFILE, MOCK_REGISTRATION_REQUESTS, MOCK_GLOSSARY, MOCK_FORUM_THREADS, MOCK_MEDIA) ...
export const ASSOCIATION_PROJECTS: Project[] = [
  {
    id: 'PROJ-01',
    title: 'Revisão da Grelha Salarial 2026',
    description: 'Negociação com a administração para atualização dos índices salariais conforme inflação.',
    status: 'Em Negociação',
    progress: 65,
    owner: 'Direção Sindical'
  },
  {
    id: 'PROJ-02',
    title: 'Renovação Mobiliário TWR Sal',
    description: 'Substituição das cadeiras ergonómicas e atualização das consolas de visualização.',
    status: 'Aprovado',
    progress: 90,
    owner: 'Comissão de Higiene'
  },
  {
    id: 'PROJ-03',
    title: 'Protocolo de Saúde Privado',
    description: 'Novo acordo com clínica privada na Praia e Mindelo para associados.',
    status: 'Planeamento',
    progress: 20,
    owner: 'Direção Social'
  }
];

export const VOTING_PROPOSALS: VoteProposal[] = [
  {
    id: 'VOTE-25-10',
    title: 'Aprovação do Relatório de Contas 2024',
    description: 'Votação para aprovação do relatório financeiro do ano transato apresentado pela tesouraria.',
    deadline: '2025-10-30',
    options: [
      { label: 'Favor', count: 45 },
      { label: 'Contra', count: 2 },
      { label: 'Abstenção', count: 5 }
    ],
    userVoted: false
  },
  {
    id: 'VOTE-25-11',
    title: 'Alteração dos Estatutos - Artigo 4º',
    description: 'Proposta para incluir controladores reformados como sócios honorários com direito a voto.',
    deadline: '2025-11-15',
    options: [
      { label: 'Favor', count: 20 },
      { label: 'Contra', count: 15 },
      { label: 'Abstenção', count: 8 }
    ],
    userVoted: true
  }
];

export const MEETINGS: Meeting[] = [
  {
    id: 'MTG-01',
    title: 'Assembleia Geral Ordinária',
    date: '2025-10-25',
    time: '18:00',
    type: 'Assembleia Geral',
    link: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: 'MTG-02',
    title: 'Reunião de Esclarecimento - Acordo Empresa',
    date: '2025-11-05',
    time: '19:30',
    type: 'Extraordinária',
    link: 'https://meet.google.com/xyz-wozu-pqr'
  }
];

export const FINANCIAL_RECORDS: FinancialRecord[] = [
  { id: '1', date: '2025-10-01', description: 'Pagamento Cotas (Lote Outubro)', amount: 250000, type: 'Income', category: 'Cotas' },
  { id: '2', date: '2025-10-05', description: 'Manutenção Site Institucional', amount: 15000, type: 'Expense', category: 'Tecnologia' },
  { id: '3', date: '2025-10-10', description: 'Honorários Advocacia (Negociação ACT)', amount: 80000, type: 'Expense', category: 'Jurídico' },
  { id: '4', date: '2025-09-28', description: 'Catering Assembleia Geral', amount: 12000, type: 'Expense', category: 'Eventos' },
];

export const USER_QUOTAS: UserQuota[] = [
  { month: 'Outubro', year: 2025, amount: 2000, status: 'Pending' }, // Pending = Scheduled for deduction
  { month: 'Setembro', year: 2025, amount: 2000, status: 'Paid', paidDate: '2025-09-28' }, // Salary day
  { month: 'Agosto', year: 2025, amount: 2000, status: 'Paid', paidDate: '2025-08-28' },
  { month: 'Julho', year: 2025, amount: 2000, status: 'Paid', paidDate: '2025-07-28' },
];

export const MOCK_MEMBER_HISTORY: MemberHistoryLog[] = [
  { id: 'LOG-001', date: '2024-01-10', action: 'Admissão', details: 'Inscrição validada na associação.', performedBy: 'Admin (Secretário)' },
  { id: 'LOG-002', date: '2024-06-15', action: 'Mudança de Status', details: 'Ativo -> Licença de Maternidade/Paternidade', performedBy: 'Sistema' },
  { id: 'LOG-003', date: '2024-10-15', action: 'Mudança de Status', details: 'Licença -> Ativo', performedBy: 'Sistema' },
  { id: 'LOG-004', date: '2025-01-01', action: 'Atualização de Cota', details: 'Valor atualizado de 1500 para 2000 CVE', performedBy: 'Assembleia Geral' }
];

export const MOCK_MEMBER_PROFILE: MemberProfile = {
  id: 'CTA-056',
  name: 'Carlos Delgado',
  role: UserRole.CONTROLLER,
  email: 'carlos.delgado@cta.cv',
  phone: '+238 999 1234',
  base: 'GVAC (Sal)',
  license: 'CV-CTA-2018-056',
  admissionDate: '2018-03-15',
  status: 'Active',
  quotaStatus: 'Up-to-date',
  bio: 'Controlador de Área (ACC) com 7 anos de experiência. Membro da comissão técnica de procedimentos de voo. Entusiasta de segurança operacional.',
  stats: {
    votingParticipation: 85, // 85% das votações participadas
    meetingAttendance: 70, // 70% das reuniões comparecidas
    projectsInvolved: 3,
    quotaStreak: 24, // 2 anos sem falhar
    engagementScore: 88 // Pontuação geral
  },
  badges: [
    { id: '1', name: 'Membro Fundador', icon: 'Award', description: 'Participou na fundação da plataforma digital.' },
    { id: '2', name: 'Voto Consciente', icon: 'Vote', description: 'Participou em mais de 10 votações consecutivas.' },
    { id: '3', name: 'Guardião', icon: 'Shield', description: 'Membro da comissão de segurança.' }
  ]
};

export const MOCK_REGISTRATION_REQUESTS: RegistrationRequest[] = [
  {
    id: 'REQ-001',
    name: 'Ana Pereira',
    email: 'ana.pereira@asa.cv',
    license: 'CV-CTA-2025-012',
    airport: 'GVNP (Praia)',
    date: '2025-10-12',
    status: 'Pending'
  },
  {
    id: 'REQ-002',
    name: 'Jorge Santos',
    email: 'jorge.s@asa.cv',
    license: 'CV-CTA-2024-099',
    airport: 'GVSV (São Vicente)',
    date: '2025-10-13',
    status: 'Pending'
  }
];

export const MOCK_GLOSSARY: GlossaryTerm[] = [
  { term: 'ACC', definition: 'Centro de Controlo de Área. Órgão responsável por controlar aeronaves em rota e altitudes elevadas.', category: 'Operacional' },
  { term: 'ATFM', definition: 'Gestão de Fluxo de Tráfego Aéreo. Regulação do tráfego para evitar sobrecarga dos sectores e atrasos.', category: 'Operacional' },
  { term: 'CPDLC', definition: 'Comunicação Piloto-Controlador por Ligação de Dados. "SMS" da aviação para comunicação oceânica.', category: 'Técnico' },
  { term: 'FIR', definition: 'Região de Informação de Voo. Espaço aéreo de dimensões definidas onde se prestam serviços de informação de voo e alerta.', category: 'Geral' },
  { term: 'Go-Around', definition: 'Borrego ou Arremetida. Procedimento em que o piloto aborta a aterragem por razões de segurança.', category: 'Operacional' },
  { term: 'NOTAM', definition: 'Notice to Air Missions. Aviso contendo informação relativa a estabelecimento, condição ou alteração de qualquer instalação aeronáutica.', category: 'Técnico' },
  { term: 'Slot', definition: 'Janela de tempo atribuída a uma aeronave para descolar ou aterrar, visando a gestão de fluxo.', category: 'Operacional' },
  { term: 'TMA', definition: 'Área de Controlo Terminal. Espaço aéreo controlado, geralmente situado na confluência de rotas ATS nas imediações de um ou mais aeródromos principais.', category: 'Operacional' },
];

export const MOCK_FORUM_THREADS: ForumThread[] = [
  { id: '1', title: 'Feedback sobre o novo sistema VCS na Torre do Sal', author: 'Carlos Delgado', date: '2025-10-14', replies: 12, tags: ['Técnico', 'Equipamento'], lastActivity: '2 horas atrás' },
  { id: '2', title: 'Dúvida sobre aplicação da Circular 14/25 (Procedimentos de Visibilidade Reduzida)', author: 'Ana Silva', date: '2025-10-13', replies: 5, tags: ['Operacional', 'Regulamentação'], lastActivity: '1 dia atrás' },
  { id: '3', title: 'Sugestões para o próximo Acordo de Empresa', author: 'João Mendes', date: '2025-10-10', replies: 34, tags: ['Sindical', 'Carreira'], lastActivity: '3 dias atrás' },
];

export const MOCK_MEDIA: MediaItem[] = [
  { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1583070386038-5293b9476963?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Posição Radar ACC', description: 'Controlador a gerir o tráfego oceânico durante o pico da noite.' },
  { id: '2', type: 'image', url: 'https://images.unsplash.com/photo-1542296332-2e44a99cfef9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Torre de Controlo (TWR)', description: 'Vista panorâmica da placa a partir da Torre do Sal.' },
  { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', title: 'Briefing Matinal', description: 'Equipa a coordenar as operações antes do início do turno.' },
];
