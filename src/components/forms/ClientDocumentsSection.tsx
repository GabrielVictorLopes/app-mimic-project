
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, Trash2 } from "lucide-react";

interface DocumentField {
  title: string;
  description: string;
  file: File | null;
}

interface ClientDocumentsSectionProps {
  documents: DocumentField[];
  onDocumentsChange: (documents: DocumentField[]) => void;
}

export const ClientDocumentsSection: React.FC<ClientDocumentsSectionProps> = ({
  documents,
  onDocumentsChange
}) => {
  const handleFileChange = (index: number, file: File | null) => {
    if (file && file.type === 'application/pdf') {
      const newDocuments = [...documents];
      newDocuments[index].file = file;
      onDocumentsChange(newDocuments);
    } else if (file) {
      alert('Por favor, selecione apenas arquivos PDF.');
    }
  };

  const addDocumentField = () => {
    onDocumentsChange([...documents, { title: '', description: '', file: null }]);
  };

  const removeDocumentField = (index: number) => {
    if (documents.length > 1) {
      const newDocuments = documents.filter((_, i) => i !== index);
      onDocumentsChange(newDocuments);
    }
  };

  const updateDocumentField = (index: number, field: string, value: string) => {
    const newDocuments = [...documents];
    newDocuments[index] = { ...newDocuments[index], [field]: value };
    onDocumentsChange(newDocuments);
  };

  return (
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
  );
};
