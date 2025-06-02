import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Upload, FileText, Trash2 } from "lucide-react";
import { useApp } from '@/contexts/AppContext';

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

  const handleFileChange = (index: number, file: File | null) => {
    if (file && file.type === 'application/pdf') {
      const newDocuments = [...documents];
      newDocuments[index].file = file;
      setDocuments(newDocuments);
    } else if (file) {
      alert('Por favor, selecione apenas arquivos PDF.');
    }
  };

  const addDocumentField = () => {
    setDocuments([...documents, { title: '', description: '', file: null }]);
  };

  const removeDocumentField = (index: number) => {
    if (documents.length > 1) {
      const newDocuments = documents.filter((_, i) => i !== index);
      setDocuments(newDocuments);
    }
  };

  const updateDocumentField = (index: number, field: string, value: string) => {
    const newDocuments = [...documents];
    newDocuments[index] = { ...newDocuments[index], [field]: value };
    setDocuments(newDocuments);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Nome completo do cliente"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="email@exemplo.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(11) 99999-9999"
                required
              />
            </div>
            <div>
              <Label htmlFor="cpf">CPF/CNPJ</Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={(e) => setFormData({...formData, cpf: e.target.value, document: e.target.value})}
                placeholder="000.000.000-00"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="birthDate">Data de Nascimento</Label>
              <Input
                id="birthDate"
                value={formData.birthDate}
                onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                placeholder="DD/MM/AAAA"
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo</Label>
              <select 
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Pessoa Física">Pessoa Física</option>
                <option value="Pessoa Jurídica">Pessoa Jurídica</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="address">Endereço</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              placeholder="Endereço completo"
              required
            />
          </div>

          {/* Seção de Documentos */}
          <div className="border-t dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium dark:text-white">Documentos (PDF)</h3>
              <Button type="button" onClick={addDocumentField} variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Adicionar Documento
              </Button>
            </div>

            <div className="space-y-4">
              {documents.map((doc, index) => (
                <div key={index} className="p-4 border dark:border-gray-700 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium dark:text-white">Documento {index + 1}</h4>
                    {documents.length > 1 && (
                      <Button 
                        type="button" 
                        onClick={() => removeDocumentField(index)}
                        variant="ghost" 
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label>Título do Documento</Label>
                      <Input
                        value={doc.title}
                        onChange={(e) => updateDocumentField(index, 'title', e.target.value)}
                        placeholder="Ex: RG, CPF, Contrato..."
                      />
                    </div>
                    <div>
                      <Label>Arquivo PDF</Label>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                        className="file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Descrição</Label>
                    <Input
                      value={doc.description}
                      onChange={(e) => updateDocumentField(index, 'description', e.target.value)}
                      placeholder="Descrição opcional do documento"
                    />
                  </div>
                  
                  {doc.file && (
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                      <FileText className="h-4 w-4" />
                      <span>Arquivo selecionado: {doc.file.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

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
