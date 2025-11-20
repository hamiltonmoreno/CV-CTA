
import { NewsItem, Notam, Document, OperationalStatus, FlightStat } from './types';

export const APP_NAME = "CV-CTA Portal";

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Briefing: Simulação de emergência no Aeroporto do Sal',
    summary: 'Exercício em escala real programado para 22 de Outubro de 2025. Todos os controladores devem rever os procedimentos de emergência e coordenação com a proteção civil.',
    date: '2025-10-14',
    category: 'Operacional',
    imageUrl: 'https://images.unsplash.com/photo-1524592714635-d77511a4834d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '2',
    title: 'Novos Procedimentos de Transferência Radar (v1.2)',
    summary: 'Atualização mandatória dos protocolos de hand-off entre ACC Sal e Dakar Oceanic. As mudanças visam otimizar o fluxo na rota Atlântico Sul.',
    date: '2025-10-10',
    category: 'Formação',
    imageUrl: 'https://images.unsplash.com/photo-1468183654773-77e2e09d0501?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '3',
    title: 'Recrutamento Aberto: Controladores Estagiários',
    summary: 'Abertura de concurso público para 15 novas vagas para formação de controladores de tráfego aéreo. O curso terá duração de 18 meses.',
    date: '2025-10-05',
    category: 'Institucional',
    imageUrl: 'https://images.unsplash.com/photo-1542296332-2e44a99cfef9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '4',
    title: 'Instalação de Novo Radar Secundário em Santiago',
    summary: 'A ASA concluiu a instalação do novo sistema MSSR na ilha de Santiago, aumentando a cobertura radar na TMA da Praia para níveis inferiores.',
    date: '2025-09-28',
    category: 'Operacional',
    imageUrl: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '5',
    title: 'Cabo Verde Eleito para o Conselho da ICAO',
    summary: 'Reconhecimento internacional pela excelência na gestão do espaço aéreo atlântico e compromisso com a redução de emissões de carbono.',
    date: '2025-09-15',
    category: 'Institucional',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
  },
  {
    id: '6',
    title: 'Curso de Inglês Aeronáutico Nível 5 e 6',
    summary: 'Inscrições abertas para o programa intensivo de manutenção de proficiência linguística. Aulas presenciais no Sal e Praia.',
    date: '2025-09-01',
    category: 'Formação',
    imageUrl: 'https://images.unsplash.com/photo-1559297434-fae8a1916a79?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
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
    id: 'DOC-001',
    title: 'Manual de Operações Torre (TWR)',
    version: '3.4',
    updatedAt: '2025-09-01',
    category: 'Manual',
    size: '4.2 MB'
  },
  {
    id: 'DOC-002',
    title: 'Fraseologia Aeronáutica (PT/EN)',
    version: '2.0',
    updatedAt: '2025-08-15',
    category: 'Procedimento',
    size: '1.5 MB'
  },
  {
    id: 'DOC-003',
    title: 'Regulamento de Tráfego Aéreo CV',
    version: '2025.1',
    updatedAt: '2025-01-10',
    category: 'Legislação',
    size: '12 MB'
  }
];

// RAG Knowledge Base: Simulated content of the documents above
export const DOC_CONTENTS: Record<string, string> = {
  'DOC-001': `
    CONTEÚDO DO DOCUMENTO: Manual de Operações Torre (TWR)
    VERSÃO: 3.4
    
    CAPÍTULO 1: RESPONSABILIDADES
    O Controlador de Torre (TWR) é responsável por prevenir colisões entre aeronaves na área de manobras e aeronaves a voar no circuito de aeródromo.
    
    CAPÍTULO 2: SEPARAÇÃO DE PISTA
    2.1. Mínimos de Separação: Nenhuma aeronave deve aterrar ou descolar enquanto a pista estiver ocupada.
    2.2. Separação reduzida: Em condições VMC diurnas, a aterragem pode ser autorizada se a aeronave precedente já tiver cruzado a cabeceira oposta ou desocupado a pista.
    
    CAPÍTULO 3: VENTOS E LIMITES
    3.1. Limite de Vento Cruzado (Crosswind): Para B737/A320 é 35kt em pista seca e 15kt em pista molhada.
    3.2. Tailwind: Máximo de 10kt para aterragens e 15kt para descolagens.
  `,
  'DOC-002': `
    CONTEÚDO DO DOCUMENTO: Fraseologia Aeronáutica (PT/EN)
    VERSÃO: 2.0
    
    SECÇÃO: CLEARANCES (AUTORIZAÇÕES)
    PT: "Autorizado a aterrar pista 01, vento 360 graus 10 nós."
    EN: "Cleared to land runway 01, wind 360 degrees 10 knots."
    
    SECÇÃO: TAXI
    PT: "Taxi para o ponto de espera Alfa, pista 01."
    EN: "Taxi to holding point Alpha, runway 01."
    
    SECÇÃO: EMERGÊNCIAS
    PT: "Mayday, Mayday, Mayday."
    EN: "Mayday, Mayday, Mayday."
    Nota: O silêncio rádio deve ser imposto a todas as outras aeronaves imediatamente.
  `,
  'DOC-003': `
    CONTEÚDO DO DOCUMENTO: Regulamento de Tráfego Aéreo CV
    VERSÃO: 2025.1
    
    ARTIGO 10: ESPAÇO AÉREO RVSM
    10.1. Na FIR do Sal, o espaço aéreo RVSM (Reduced Vertical Separation Minima) aplica-se entre o FL290 e o FL410.
    10.2. Aeronaves não aprovadas RVSM não podem operar nestes níveis, exceto voos de estado, humanitários ou em emergência, com separação vertical de 2000 pés.
    
    ARTIGO 15: CLASSIFICAÇÃO DO ESPAÇO AÉREO
    O espaço aéreo controlado da FIR Sal é classificado como Classe A acima do FL245 e Classe C abaixo.
    
    ARTIGO 20: REPORTES DE POSIÇÃO
    Obrigatório reportar entrada e saída da FIR, e passagem por waypoints obrigatórios com estimativa para o próximo.
  `
};

export const TRAFFIC_DATA: FlightStat[] = [
  { time: '00:00', arrivals: 2, departures: 1 },
  { time: '04:00', arrivals: 5, departures: 3 },
  { time: '08:00', arrivals: 12, departures: 10 },
  { time: '12:00', arrivals: 18, departures: 15 },
  { time: '16:00', arrivals: 22, departures: 20 },
  { time: '20:00', arrivals: 10, departures: 12 },
];

export const AIRPORTS = ['GVAC (Sal)', 'GVNP (Praia)', 'GVSV (São Vicente)', 'GVBA (Boa Vista)'];
