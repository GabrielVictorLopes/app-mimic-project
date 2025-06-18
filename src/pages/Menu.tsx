
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
import { ConsultoriaForm } from "@/components/forms/ConsultoriaForm";

const Menu = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedConsultoria, setSelectedConsultoria] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'view' | 'edit' | null>(null);

  // Dados mockados para consultoria
  const consultorias = [
    {
      id: "CONS-001",
      client: "Maria Silva",
      type: "Análise de Contratos",
      subject: "Revisão de contrato de prestação de serviços",
      status: "Em andamento",
      priority: "Alta",
      responsible: "Dr. João Santos",
      created: "15/03/2024",
      startDate: "15/03/2024",
      endDate: "30/03/2024",
      value: "R$ 2.500,00"
    },
    {
      id: "CONS-002",
      client: "Empresa XYZ Ltda",
      type: "Consultoria Empresarial",
      subject: "Reestruturação societária",
      status: "Aguardando aprovação",
      priority: "Média",
      responsible: "Dra. Ana Costa",
      created: "10/03/2024",
      startDate: "20/03/2024",
      endDate: "15/04/2024",
      value: "R$ 5.000,00"
    },
    {
      id: "CONS-003",
      client: "Carlos Pereira",
      type: "Planejamento Estratégico",
      subject: "Estratégia de expansão de negócios",
      status: "Concluída",
      priority: "Baixa",
      responsible: "Dr. Pedro Lima",
      created: "01/03/2024",
      startDate: "05/03/2024",
      endDate: "12/03/2024",
      value: "R$ 3.200,00"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em andamento":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "Aguardando aprovação":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "Concluída":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "Cancelada":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
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

  const handleViewConsultoria = (consultoria: any) => {
    setSelectedConsultoria(consultoria);
    setViewMode('view');
  };

  const handleEditConsultoria = (consultoria: any) => {
    setSelectedConsultoria(consultoria);
    setViewMode('edit');
  };

  const handleCloseModal = () => {
    setSelectedConsultoria(null);
    setViewMode(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Consultoria" 
        subtitle="Gerenciamento de consultorias jurídicas"
      />
      
      <div className="p-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="dark:text-white">Lista de Consultorias</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar consultorias..." 
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
                      Nova Consultoria
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl dark:bg-gray-800 dark:border-gray-700">
                    <ConsultoriaForm onClose={() => setIsFormOpen(false)} />
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
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Nº da Consultoria</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Cliente</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Assunto</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Prioridade</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Valor</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Responsável</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Criado em</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {consultorias.map((consultoria, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-medium text-blue-600 dark:text-blue-400">{consultoria.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900 dark:text-white">{consultoria.client}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 dark:text-gray-300">{consultoria.type}</span>
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <span className="text-gray-600 dark:text-gray-300 truncate block" title={consultoria.subject}>
                          {consultoria.subject}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(consultoria.status)}>
                          {consultoria.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getPriorityColor(consultoria.priority)}>
                          {consultoria.priority}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">{consultoria.value}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 dark:text-gray-300">{consultoria.responsible}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{consultoria.created}</span>
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
                              onClick={() => handleViewConsultoria(consultoria)}
                              className="dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleEditConsultoria(consultoria)}
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

      {/* Modal para visualizar/editar consultoria */}
      <Dialog open={viewMode !== null} onOpenChange={handleCloseModal}>
        <DialogContent className="max-w-6xl dark:bg-gray-800 dark:border-gray-700 max-h-[90vh] overflow-y-auto">
          {selectedConsultoria && viewMode === 'view' && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Detalhes da Consultoria</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ID:</label>
                  <p className="text-gray-900 dark:text-white">{selectedConsultoria.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cliente:</label>
                  <p className="text-gray-900 dark:text-white">{selectedConsultoria.client}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo:</label>
                  <p className="text-gray-900 dark:text-white">{selectedConsultoria.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Valor:</label>
                  <p className="text-gray-900 dark:text-white">{selectedConsultoria.value}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assunto:</label>
                  <p className="text-gray-900 dark:text-white">{selectedConsultoria.subject}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={() => setViewMode('edit')}>Editar</Button>
                <Button variant="outline" onClick={handleCloseModal}>Fechar</Button>
              </div>
            </div>
          )}
          {selectedConsultoria && viewMode === 'edit' && (
            <div className="p-6">
              <ConsultoriaForm 
                consultoria={selectedConsultoria}
                onClose={handleCloseModal}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Menu;
