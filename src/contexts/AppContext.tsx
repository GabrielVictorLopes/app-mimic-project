import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf: string;
  birthDate: string;
  document: string; // CPF/CNPJ formatado
  type: string; // Pessoa Física/Jurídica
  status: string; // Ativo/Inativo
  cases: number; // Número de casos
  lastContact: string; // Data do último contato
  created: string; // Data de criação
  documents: DocumentFile[];
}

interface DocumentFile {
  id: string;
  name: string;
  type: string;
  format: string;
  case: string;
  client: string;
  uploadedBy: string;
  status: string;
  size: string;
  createdAt: string;
}

interface Case {
  id: string;
  client: string;
  type: string;
  subject: string;
  status: string;
  priority: string;
  responsible: string;
  created: string;
}

interface Appointment {
  id: string;
  title: string;
  client: string;
  case: string;
  type: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  status: string;
  participants: string[];
  notes?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'deadline' | 'document' | 'agenda';
}

interface AppContextType {
  clients: Client[];
  cases: Case[];
  appointments: Appointment[];
  documents: DocumentFile[];
  addClient: (client: Omit<Client, 'id' | 'documents' | 'cases' | 'created'>) => void;
  updateClient: (id: string, client: Partial<Client>) => void;
  addDocument: (document: Omit<DocumentFile, 'id' | 'createdAt'>) => void;
  addDocumentToClient: (clientId: string, document: { title: string; description: string; fileName: string; createdAt: string }) => void;
  addCase: (case_: Omit<Case, 'id' | 'created'>) => void;
  updateCase: (id: string, case_: Partial<Case>) => void;
  getCaseById: (id: string) => Case | undefined;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  getNotifications: () => Notification[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'Maria Silva Santos',
      email: 'maria.silva@email.com',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123, São Paulo - SP',
      cpf: '123.456.789-00',
      birthDate: '15/03/1985',
      document: '123.456.789-00',
      type: 'Pessoa Física',
      status: 'Ativo',
      cases: 2,
      lastContact: '15/03/2024',
      created: '01/01/2024',
      documents: []
    },
    {
      id: '2',
      name: 'João Carlos Oliveira',
      email: 'joao.carlos@email.com',
      phone: '(11) 88888-8888',
      address: 'Av. Principal, 456, São Paulo - SP',
      cpf: '987.654.321-00',
      birthDate: '22/07/1978',
      document: '987.654.321-00',
      type: 'Pessoa Física',
      status: 'Ativo',
      cases: 1,
      lastContact: '18/03/2024',
      created: '02/01/2024',
      documents: []
    },
    {
      id: '3',
      name: 'Empresa ABC Ltda',
      email: 'contato@empresaabc.com',
      phone: '(11) 77777-7777',
      address: 'Rua Comercial, 789, São Paulo - SP',
      cpf: '12.345.678/0001-90',
      birthDate: '10/05/2010',
      document: '12.345.678/0001-90',
      type: 'Pessoa Jurídica',
      status: 'Ativo',
      cases: 3,
      lastContact: '20/03/2024',
      created: '03/01/2024',
      documents: []
    }
  ]);

  const [documents, setDocuments] = useState<DocumentFile[]>([
    {
      id: '1',
      name: 'Contrato de Trabalho - Maria Silva',
      type: 'Contrato',
      format: 'PDF',
      case: '001/2024',
      client: 'Maria Silva Santos',
      uploadedBy: 'Dr. Carlos Mendes',
      status: 'Aprovado',
      size: '2.3 MB',
      createdAt: '15/03/2024'
    },
    {
      id: '2',
      name: 'RG - João Carlos',
      type: 'Documento Pessoal',
      format: 'PDF',
      case: '002/2024',
      client: 'João Carlos Oliveira',
      uploadedBy: 'Dra. Ana Paula',
      status: 'Pendente',
      size: '1.1 MB',
      createdAt: '18/03/2024'
    }
  ]);

  const [cases, setCases] = useState<Case[]>([
    {
      id: '001/2024',
      client: 'Maria Silva Santos',
      type: 'Trabalhista',
      subject: 'Ação trabalhista por rescisão indevida do contrato de trabalho',
      status: 'Em andamento',
      priority: 'Alta',
      responsible: 'Dr. Carlos Mendes',
      created: '15/03/2024'
    },
    {
      id: '002/2024',
      client: 'João Carlos Oliveira',
      type: 'Civil',
      subject: 'Ação de cobrança de valores em aberto',
      status: 'Audiência marcada',
      priority: 'Média',
      responsible: 'Dra. Ana Paula',
      created: '18/03/2024'
    },
    {
      id: '003/2024',
      client: 'Ana Paula Costa',
      type: 'Família',
      subject: 'Processo de divórcio consensual',
      status: 'Documentação',
      priority: 'Baixa',
      responsible: 'Dr. Roberto Silva',
      created: '20/03/2024'
    }
  ]);

  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Audiência Trabalhista',
      client: 'Maria Silva Santos',
      case: '001/2024',
      type: 'Audiência',
      date: '25/03/2024',
      time: '09:00',
      duration: '2 horas',
      location: 'Tribunal Regional do Trabalho',
      status: 'Confirmado',
      participants: ['Dr. Carlos Mendes', 'Maria Silva', 'Juiz Dr. Fernando'],
      notes: 'Levar toda documentação trabalhista'
    },
    {
      id: '2',
      title: 'Consulta Inicial',
      client: 'João Carlos Oliveira',
      case: '002/2024',
      type: 'Consulta',
      date: '26/03/2024',
      time: '14:30',
      duration: '1 hora',
      location: 'Escritório NPJ',
      status: 'Confirmado',
      participants: ['Dra. Ana Paula', 'João Carlos'],
      notes: 'Primeira consulta sobre ação de cobrança'
    },
    {
      id: '3',
      title: 'Mediação Familiar',
      client: 'Ana Paula Costa',
      case: '003/2024',
      type: 'Mediação',
      date: '27/03/2024',
      time: '16:00',
      duration: '1.5 horas',
      location: 'Centro de Mediação',
      status: 'Pendente',
      participants: ['Dr. Roberto Silva', 'Ana Paula', 'Cônjuge'],
      notes: 'Mediação para acordo de divórcio'
    },
    {
      id: '4',
      title: 'Reunião de Acompanhamento',
      client: 'Maria Silva Santos',
      case: '001/2024',
      type: 'Reunião',
      date: '28/03/2024',
      time: '10:00',
      duration: '45 minutos',
      location: 'Escritório NPJ',
      status: 'Confirmado',
      participants: ['Dr. Carlos Mendes', 'Maria Silva'],
      notes: 'Acompanhamento do andamento do processo'
    }
  ]);

  const addClient = (client: Omit<Client, 'id' | 'documents' | 'cases' | 'created'>) => {
    const newClient: Client = {
      ...client,
      id: Date.now().toString(),
      documents: [],
      cases: 0,
      created: new Date().toLocaleDateString('pt-BR')
    };
    setClients(prev => [...prev, newClient]);
  };

  const updateClient = (id: string, updatedClient: Partial<Client>) => {
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, ...updatedClient } : client
    ));
  };

  const addDocument = (document: Omit<DocumentFile, 'id' | 'createdAt'>) => {
    const newDocument: DocumentFile = {
      ...document,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString('pt-BR')
    };
    setDocuments(prev => [...prev, newDocument]);
  };

  const addDocumentToClient = (clientId: string, document: { title: string; description: string; fileName: string; createdAt: string }) => {
    const newDocument: DocumentFile = {
      id: Date.now().toString(),
      name: document.title,
      type: 'Documento Pessoal',
      format: 'PDF',
      case: '',
      client: clients.find(c => c.id === clientId)?.name || '',
      uploadedBy: 'Sistema',
      status: 'Pendente',
      size: '1.0 MB',
      createdAt: document.createdAt
    };
    setDocuments(prev => [...prev, newDocument]);
  };

  const addCase = (case_: Omit<Case, 'id' | 'created'>) => {
    const newCase: Case = {
      ...case_,
      id: `${String(cases.length + 1).padStart(3, '0')}/2024`,
      created: new Date().toLocaleDateString('pt-BR')
    };
    setCases(prev => [...prev, newCase]);
  };

  const updateCase = (id: string, updatedCase: Partial<Case>) => {
    setCases(prev => prev.map(case_ => 
      case_.id === id ? { ...case_, ...updatedCase } : case_
    ));
  };

  const getCaseById = (id: string) => {
    return cases.find(case_ => case_.id === id);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString()
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const getNotifications = (): Notification[] => {
    const notifications: Notification[] = [];
    
    // Verificar prazos de audiências próximas (próximos 7 dias)
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    appointments.forEach(appointment => {
      const appointmentDate = new Date(appointment.date.split('/').reverse().join('-'));
      if (appointmentDate >= today && appointmentDate <= nextWeek) {
        notifications.push({
          id: `agenda-${appointment.id}`,
          title: 'Compromisso Próximo',
          message: `${appointment.title} agendado para ${appointment.date} às ${appointment.time}`,
          date: 'Hoje',
          type: 'agenda'
        });
      }
    });

    // Notificações de casos com alta prioridade
    cases.filter(case_ => case_.priority === 'Alta').forEach(case_ => {
      notifications.push({
        id: `case-${case_.id}`,
        title: 'Caso Prioritário',
        message: `Caso ${case_.id} (${case_.client}) requer atenção`,
        date: 'Hoje',
        type: 'deadline'
      });
    });

    // Simulação de documentos com validade próxima
    notifications.push({
      id: 'doc-1',
      title: 'Documento Vencendo',
      message: 'Procuração de Maria Silva vence em 3 dias',
      date: 'Hoje',
      type: 'document'
    });

    return notifications;
  };

  return (
    <AppContext.Provider value={{
      clients,
      cases,
      appointments,
      documents,
      addClient,
      updateClient,
      addDocument,
      addDocumentToClient,
      addCase,
      updateCase,
      getCaseById,
      addAppointment,
      getNotifications
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
