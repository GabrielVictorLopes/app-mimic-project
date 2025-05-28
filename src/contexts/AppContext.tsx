
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Case {
  id: string;
  client: string;
  type: string;
  subject: string;
  status: string;
  priority: string;
  responsible: string;
  created: string;
  updated: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  type: string;
  status: string;
  cases: number;
  created: string;
  lastContact: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  format: string;
  case: string;
  client: string;
  uploadedBy: string;
  uploadedAt: string;
  status: string;
}

interface Appointment {
  id: string;
  title: string;
  client: string;
  case: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  type: string;
  status: string;
  participants: string[];
  notes: string;
}

interface AppContextType {
  cases: Case[];
  clients: Client[];
  documents: Document[];
  appointments: Appointment[];
  addCase: (caseData: Omit<Case, 'id' | 'created' | 'updated'>) => void;
  addClient: (clientData: Omit<Client, 'id' | 'created' | 'lastContact' | 'cases'>) => void;
  addDocument: (documentData: Omit<Document, 'id' | 'uploadedAt'>) => void;
  addAppointment: (appointmentData: Omit<Appointment, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<Case[]>([
    {
      id: "001/2024",
      client: "Maria Silva Santos",
      type: "Trabalhista",
      subject: "Rescisão indireta do contrato de trabalho",
      status: "Em andamento",
      priority: "Alta",
      responsible: "Dr. João Silva",
      created: "15/03/2024",
      updated: "22/03/2024",
    },
    {
      id: "002/2024",
      client: "João Carlos Oliveira",
      type: "Civil",
      subject: "Ação de cobrança",
      status: "Audiência marcada",
      priority: "Média",
      responsible: "Dra. Ana Costa",
      created: "18/03/2024",
      updated: "20/03/2024",
    },
  ]);

  const [clients, setClients] = useState<Client[]>([
    {
      id: "CLI001",
      name: "Maria Silva Santos",
      email: "maria.santos@email.com",
      phone: "(11) 99999-1234",
      document: "123.456.789-00",
      type: "Pessoa Física",
      status: "Ativo",
      cases: 2,
      created: "15/01/2024",
      lastContact: "22/03/2024",
    },
    {
      id: "CLI002",
      name: "João Carlos Oliveira",
      email: "joao.oliveira@email.com",
      phone: "(11) 98888-5678",
      document: "987.654.321-00",
      type: "Pessoa Física",
      status: "Ativo",
      cases: 1,
      created: "20/01/2024",
      lastContact: "20/03/2024",
    },
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "DOC001",
      name: "Petição Inicial - Caso 001/2024",
      type: "Petição",
      size: "2.3 MB",
      format: "PDF",
      case: "001/2024",
      client: "Maria Silva Santos",
      uploadedBy: "Dr. João Silva",
      uploadedAt: "15/03/2024 14:30",
      status: "Aprovado",
    },
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "AGD001",
      title: "Audiência Trabalhista",
      client: "Maria Silva Santos",
      case: "001/2024",
      date: "25/03/2024",
      time: "09:00",
      duration: "2h",
      location: "TRT - 2ª Região",
      type: "Audiência",
      status: "Confirmado",
      participants: ["Dr. João Silva", "Maria Silva Santos"],
      notes: "Levar documentos originais do contrato de trabalho",
    },
  ]);

  const addCase = (caseData: Omit<Case, 'id' | 'created' | 'updated'>) => {
    const newCase: Case = {
      ...caseData,
      id: `${String(cases.length + 1).padStart(3, '0')}/2024`,
      created: new Date().toLocaleDateString('pt-BR'),
      updated: new Date().toLocaleDateString('pt-BR'),
    };
    setCases([...cases, newCase]);
  };

  const addClient = (clientData: Omit<Client, 'id' | 'created' | 'lastContact' | 'cases'>) => {
    const newClient: Client = {
      ...clientData,
      id: `CLI${String(clients.length + 1).padStart(3, '0')}`,
      cases: 0,
      created: new Date().toLocaleDateString('pt-BR'),
      lastContact: new Date().toLocaleDateString('pt-BR'),
    };
    setClients([...clients, newClient]);
  };

  const addDocument = (documentData: Omit<Document, 'id' | 'uploadedAt'>) => {
    const newDocument: Document = {
      ...documentData,
      id: `DOC${String(documents.length + 1).padStart(3, '0')}`,
      uploadedAt: new Date().toLocaleString('pt-BR'),
    };
    setDocuments([...documents, newDocument]);
  };

  const addAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `AGD${String(appointments.length + 1).padStart(3, '0')}`,
    };
    setAppointments([...appointments, newAppointment]);
  };

  return (
    <AppContext.Provider value={{
      cases,
      clients,
      documents,
      appointments,
      addCase,
      addClient,
      addDocument,
      addAppointment,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
