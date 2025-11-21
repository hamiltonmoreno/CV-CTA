
export enum UserRole {
  PUBLIC = 'PUBLIC',
  CONTROLLER = 'CONTROLLER',
  SUPERVISOR = 'SUPERVISOR',
  ADMIN = 'ADMIN'
}

export enum OperationalStatus {
  NORMAL = 'NORMAL',
  ATTENTION = 'ATTENTION',
  CRITICAL = 'CRITICAL',
  MAINTENANCE = 'MAINTENANCE'
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
  role?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'Operacional' | 'Formação' | 'Institucional';
  imageUrl?: string;
  comments?: Comment[];
}

export interface Notam {
  id: string;
  airport: string;
  code: string;
  validFrom: string;
  validTo: string;
  description: string;
  type: 'Info' | 'Warning' | 'Alert';
}

export interface Document {
  id: string;
  title: string;
  version: string;
  updatedAt: string;
  category: 'Manual' | 'Procedimento' | 'Legislação';
  size: string;
  url?: string;
}

export interface FlightStat {
  time: string;
  arrivals: number;
  departures: number;
}

export interface AlertSubscription {
  airports: string[];
  types: ('Info' | 'Warning' | 'Alert')[];
  channels: {
    email: boolean;
    sms: boolean;
  };
  contactInfo: {
    email: string;
    phone: string;
  };
}

// Association Types
export interface Member {
  id: string;
  name: string;
  license: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
  quotaStatus: 'Up-to-date' | 'Overdue';
}

export interface MemberProfile extends Member {
  email: string;
  phone: string;
  base: string;
  admissionDate: string;
  bio: string;
  stats: {
    votingParticipation: number; // 0-100%
    meetingAttendance: number; // 0-100%
    projectsInvolved: number; // count
    quotaStreak: number; // months
    engagementScore: number; // 0-100 calculated
  };
  badges: {
    id: string;
    name: string;
    icon: string;
    description: string;
  }[];
}

export interface MemberHistoryLog {
  id: string;
  date: string;
  action: string; // e.g., "Mudança de Status", "Atualização de Dados"
  details: string; // e.g., "Ativo -> Licença Sem Vencimento"
  performedBy: string; // "Sistema" or Admin Name
}

export interface RegistrationRequest {
  id: string;
  name: string;
  email: string;
  license: string;
  airport: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'Planeamento' | 'Em Negociação' | 'Concluído' | 'Cancelado' | 'Aprovado';
  progress: number; // 0 to 100
  owner: string;
}

export interface VoteProposal {
  id: string;
  title: string;
  description: string;
  deadline: string;
  options: {
    label: string; // Sim, Não, Abstenção
    count: number;
  }[];
  userVoted?: boolean; // Track if current user voted
  votedDate?: string;
  votedOption?: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Assembleia Geral' | 'Direção' | 'Extraordinária';
  link?: string; // Google Meet link
  minutesUrl?: string; // Link to PDF minutes
}

export interface FinancialRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Income' | 'Expense';
  category: string;
}

export interface UserQuota {
  month: string;
  year: number;
  amount: number;
  status: 'Paid' | 'Pending'; // 'Pending' now means "Scheduled for deduction"
  paidDate?: string;
}

// New Improvements Types
export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'Operacional' | 'Técnico' | 'Geral';
}

export interface ForumThread {
  id: string;
  title: string;
  author: string;
  date: string;
  replies: number;
  tags: string[];
  lastActivity: string;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  description: string;
}

// AI Knowledge Base Type
export interface KnowledgeItem {
  id: string;
  title: string;
  category: 'Manual' | 'Regulamento' | 'Procedimento' | 'Outro';
  content: string;
  lastUpdated: string;
  // New fields for file support
  mediaData?: string; // Base64 string of the file
  mimeType?: string; // e.g., 'application/pdf', 'image/jpeg'
  fileName?: string;
}
