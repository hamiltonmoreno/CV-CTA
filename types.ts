
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

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'Operacional' | 'Formação' | 'Institucional';
  imageUrl?: string;
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
