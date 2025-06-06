
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { useApp } from '@/contexts/AppContext';
import { ClientBasicForm } from './ClientBasicForm';
import { ClientDocumentsSection } from './ClientDocumentsSection';

interface ClientFormProps {
  onClose: () => void;
  client?: any;
  mode?: 'create' | 'edit';
}

export const ClientForm: React.FC<ClientFormProps> = ({ onClose, client, mode = 'create' }) => {
  const { addClient, updateClient, addDocumentToClient } = useApp();
  const [formData, setFormData] = useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    address: client?.address || '',
    cpf: client?.cpf || '',
    birthDate: client?.birthDate || '',
    document: client?.document || '',
    type: client?.type || 'Pessoa Física',
    status: client?.status || 'Ativo',
    lastContact: client?.lastContact || new Date().toLocaleDateString('pt-BR'),
  });
  
  const [documents, setDocuments] = useState<{title: string, description: string, file: File | null}[]>([
    { title: '', description: '', file: null }
  ]);

  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'edit' && client) {
      updateClient(client.id, formData);
      
      // Adicionar novos documentos se houver
      documents.forEach(doc => {
        if (doc.title && doc.file) {
          addDocumentToClient(client.id, {
            title: doc.title,
            description: doc.description,
            fileName: doc.file.name,
            createdAt: new Date().toLocaleDateString('pt-BR')
          });
        }
      });
    } else {
      const newClientId = Date.now().toString();
      addClient(formData);
      
      // Adicionar documentos ao novo cliente
      documents.forEach(doc => {
        if (doc.title && doc.file) {
          addDocumentToClient(newClientId, {
            title: doc.title,
            description: doc.description,
            fileName: doc.file.name,
            createdAt: new Date().toLocaleDateString('pt-BR')
          });
        }
      });
    }
    
    onClose();
  };

  return (
    <Card className="w-full max-w-4xl dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="dark:text-white">
          {mode === 'edit' ? 'Editar Cliente' : 'Novo Cliente'}
        </CardTitle>
        <Button onClick={onClose} variant="ghost" size="sm">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ClientBasicForm 
            formData={formData}
            onChange={handleFormDataChange}
          />

          <ClientDocumentsSection 
            documents={documents}
            onDocumentsChange={setDocuments}
          />

          <div className="flex gap-2 justify-end pt-4 border-t dark:border-gray-700">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {mode === 'edit' ? 'Salvar Alterações' : 'Criar Cliente'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
