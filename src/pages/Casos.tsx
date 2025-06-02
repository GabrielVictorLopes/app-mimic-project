
import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Filter, Eye, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaseForm } from "@/components/forms/CaseForm";
import { CaseViewer } from "@/components/CaseViewer";
import { CaseEditor } from "@/components/CaseEditor";
import { useApp } from "@/contexts/AppContext";

const Casos = () => {
  const { cases } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'view' | 'edit' | null>(null);

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

  const handleViewCase = (case_: any) => {
    setSelectedCase(case_);
    setViewMode('view');
  };

  const handleEditCase = (case_: any) => {
    setSelectedCase(case_);
    setViewMode('edit');
  };

  const handleCloseModal = () => {
    setSelectedCase(null);
    setViewMode(null);
  };

  const handleSaveCase = () => {
    setSelectedCase(null);
    setViewMode(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Casos" 
        subtitle="Gerenciamento de processos jurídicos"
      />
      
      <div className="p-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="dark:text-white">Lista de Casos</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar casos..." 
                      className="pl-10 w-64 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="dark:border-gray-600 dark:text-gray-300">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Caso
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl dark:bg-gray-800 dark:border-gray-700">
                    <CaseForm onClose={() => setIsFormOpen(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Nº do Caso</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Cliente</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Assunto</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Prioridade</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Responsável</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Criado em</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((case_, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-medium text-blue-600 dark:text-blue-400">{case_.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900 dark:text-white">{case_.client}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 dark:text-gray-300">{case_.type}</span>
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <span className="text-gray-600 dark:text-gray-300 truncate block" title={case_.subject}>
                          {case_.subject}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(case_.status)}>
                          {case_.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getPriorityColor(case_.priority)}>
                          {case_.priority}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 dark:text-gray-300">{case_.responsible}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{case_.created}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-gray-300">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 dark:border-gray-700">
                            <DropdownMenuItem 
                              onClick={() => handleViewCase(case_)}
                              className="dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleEditCase(case_)}
                              className="dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal para visualizar/editar caso */}
      <Dialog open={viewMode !== null} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-6xl dark:bg-gray-800 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
          {selectedCase && viewMode === 'view' && (
            <CaseViewer 
              case_={selectedCase} 
              onClose={handleCloseModal}
              onEdit={() => setViewMode('edit')}
            />
          )}
          {selectedCase && viewMode === 'edit' && (
            <CaseEditor 
              case_={selectedCase} 
              onClose={handleCloseModal}
              onSave={handleSaveCase}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Casos;
