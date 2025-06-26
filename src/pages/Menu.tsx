
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Trash2, Calendar, DollarSign, User, FileText } from "lucide-react";
import { ConsultoriaForm } from "@/components/forms/ConsultoriaForm";

// Mock data para consultorias
const mockConsultorias = [
  {
    id: "CON-001",
    client: "Empresa ABC Ltda",
    type: "Consultoria Empresarial",
    subject: "Reestruturação societária",
    status: "Em andamento",
    priority: "Alta",
    responsible: "Dr. João Santos",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    value: "R$ 15.000,00",
    description: "Consultoria para reestruturação da sociedade empresarial",
    created: "15/01/2024"
  },
  {
    id: "CON-002", 
    client: "Maria Silva",
    type: "Análise de Contratos",
    subject: "Revisão de contratos comerciais",
    status: "Aguardando aprovação",
    priority: "Média",
    responsible: "Dra. Ana Costa",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    value: "R$ 8.500,00",
    description: "Análise e revisão de contratos comerciais existentes",
    created: "20/01/2024"
  },
  {
    id: "CON-003",
    client: "Tech Innovations S.A.",
    type: "Compliance",
    subject: "Implementação de programa de compliance",
    status: "Concluída",
    priority: "Alta",
    responsible: "Dr. Carlos Lima",
    startDate: "2023-11-01",
    endDate: "2024-01-10",
    value: "R$ 25.000,00",
    description: "Desenvolvimento e implementação de programa de compliance corporativo",
    created: "01/11/2023"
  }
];

const Menu = () => {
  const [consultorias] = useState(mockConsultorias);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedConsultoria, setSelectedConsultoria] = useState(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredConsultorias = consultorias.filter(consultoria => {
    const matchesSearch = consultoria.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultoria.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         consultoria.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || consultoria.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (consultoria: any) => {
    setSelectedConsultoria(consultoria);
    setIsFormOpen(true);
  };

  const handleView = (consultoria: any) => {
    console.log("Visualizando consultoria:", consultoria);
  };

  const handleDelete = (id: string) => {
    console.log("Excluindo consultoria:", id);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'em andamento':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'aguardando aprovação':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'concluída':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'cancelada':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'alta':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'média':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'baixa':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Consultoria" 
        subtitle="Gerencie consultorias e serviços jurídicos"
      />
      
      <div className="p-3 md:p-6 space-y-4 md:space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 flex-1 w-full sm:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar consultorias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filtrar por status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="em andamento">Em andamento</SelectItem>
                  <SelectItem value="aguardando aprovação">Aguardando aprovação</SelectItem>
                  <SelectItem value="concluída">Concluída</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            onClick={() => {
              setSelectedConsultoria(null);
              setIsFormOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Consultoria
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-2 md:p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <FileText className="h-4 w-4 md:h-6 md:w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">{consultorias.length}</p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-2 md:p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
                  <Calendar className="h-4 w-4 md:h-6 md:w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                    {consultorias.filter(c => c.status === "Em andamento").length}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Em Andamento</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-2 md:p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <User className="h-4 w-4 md:h-6 md:w-6 text-green-600" />
                </div> 
                <div>
                  <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
                    {consultorias.filter(c => c.status === "Concluída").length}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Concluídas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="p-2 md:p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <DollarSign className="h-4 w-4 md:h-6 md:w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">R$ 48.5K</p>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Valor Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Consultorias List */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-3 md:pb-6">
            <CardTitle className="text-base md:text-lg dark:text-white">
              Consultorias ({filteredConsultorias.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {filteredConsultorias.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <FileText className="h-8 w-8 md:h-12 md:w-12 text-gray-400 dark:text-gray-500 mx-auto mb-3 md:mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">Nenhuma consultoria encontrada</p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {filteredConsultorias.map((consultoria) => (
                  <div
                    key={consultoria.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-800"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 md:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base truncate">
                            {consultoria.id}
                          </h3>
                          <div className="flex gap-2">
                            <Badge className={`text-xs ${getStatusColor(consultoria.status)}`}>
                              {consultoria.status}
                            </Badge>
                            <Badge className={`text-xs ${getPriorityColor(consultoria.priority)}`}>
                              {consultoria.priority}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm md:text-base text-gray-900 dark:text-white font-medium mb-1">{consultoria.subject}</p>
                        <div className="text-xs md:text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <p><strong>Cliente:</strong> {consultoria.client}</p>
                          <p><strong>Tipo:</strong> {consultoria.type}</p>
                          <p><strong>Responsável:</strong> {consultoria.responsible}</p>
                          <div className="flex flex-col sm:flex-row sm:gap-4 gap-1">
                            <p><strong>Valor:</strong> {consultoria.value}</p>
                            <p><strong>Criado:</strong> {consultoria.created}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleView(consultoria)}
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEdit(consultoria)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDelete(consultoria.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog para formulário */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedConsultoria ? 'Editar Consultoria' : 'Nova Consultoria'}
            </DialogTitle>
          </DialogHeader>
          <ConsultoriaForm
            consultoria={selectedConsultoria}
            onClose={() => {
              setIsFormOpen(false);
              setSelectedConsultoria(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Menu;
