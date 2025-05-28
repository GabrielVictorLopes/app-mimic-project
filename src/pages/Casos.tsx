
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Eye, Edit, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Casos = () => {
  const cases = [
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
    {
      id: "003/2024",
      client: "Ana Paula Costa",
      type: "Família",
      subject: "Divórcio consensual",
      status: "Documentação",
      priority: "Baixa",
      responsible: "Dr. Carlos Santos",
      created: "20/03/2024",
      updated: "21/03/2024",
    },
    {
      id: "004/2024",
      client: "Pedro Henrique Lima",
      type: "Criminal",
      subject: "Defesa em processo criminal",
      status: "Aguardando julgamento",
      priority: "Alta",
      responsible: "Dra. Mariana Oliveira",
      created: "22/03/2024",
      updated: "23/03/2024",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em andamento":
        return "bg-blue-100 text-blue-700";
      case "Audiência marcada":
        return "bg-purple-100 text-purple-700";
      case "Documentação":
        return "bg-yellow-100 text-yellow-700";
      case "Aguardando julgamento":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-red-100 text-red-700";
      case "Média":
        return "bg-yellow-100 text-yellow-700";
      case "Baixa":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Casos" 
        subtitle="Gerenciamento de processos jurídicos"
      />
      
      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Lista de Casos</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar casos..." 
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Caso
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Nº do Caso</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Cliente</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Assunto</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Prioridade</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Responsável</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Criado em</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((case_, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="font-medium text-blue-600">{case_.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-gray-900">{case_.client}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600">{case_.type}</span>
                      </td>
                      <td className="py-4 px-4 max-w-xs">
                        <span className="text-gray-600 truncate block">{case_.subject}</span>
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
                        <span className="text-gray-600">{case_.responsible}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-500 text-sm">{case_.created}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem>
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
    </div>
  );
};

export default Casos;
