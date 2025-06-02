
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Edit, Calendar, User, FileText, AlertCircle } from "lucide-react";

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

interface CaseViewerProps {
  case_: Case;
  onClose: () => void;
  onEdit: () => void;
}

export const CaseViewer: React.FC<CaseViewerProps> = ({ case_, onClose, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em andamento":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "Audiência marcada":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
      case "Documentação":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "Aguardando julgamento":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      case "Média":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "Baixa":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <Card className="w-full max-w-4xl dark:bg-gray-800 dark:border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="dark:text-white">Detalhes do Caso</CardTitle>
        <div className="flex gap-2">
          <Button onClick={onEdit} variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Número do Caso</label>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{case_.id}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Cliente</label>
              <div className="flex items-center gap-2 mt-1">
                <User className="h-4 w-4 text-gray-400" />
                <p className="text-gray-900 dark:text-white">{case_.client}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Tipo de Caso</label>
              <div className="flex items-center gap-2 mt-1">
                <FileText className="h-4 w-4 text-gray-400" />
                <p className="text-gray-900 dark:text-white">{case_.type}</p>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Responsável</label>
              <p className="text-gray-900 dark:text-white">{case_.responsible}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Status</label>
              <div className="mt-1">
                <Badge className={getStatusColor(case_.status)}>
                  {case_.status}
                </Badge>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Prioridade</label>
              <div className="flex items-center gap-2 mt-1">
                <AlertCircle className="h-4 w-4 text-gray-400" />
                <Badge className={getPriorityColor(case_.priority)}>
                  {case_.priority}
                </Badge>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Data de Criação</label>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-gray-400" />
                <p className="text-gray-900 dark:text-white">{case_.created}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Assunto</label>
          <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-900 dark:text-white">{case_.subject}</p>
          </div>
        </div>
        
        <div className="border-t dark:border-gray-700 pt-4">
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Ações Rápidas</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Audiência
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Adicionar Documento
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Contatar Cliente
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
