
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Eye, Edit, MoreHorizontal, Phone, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Clientes = () => {
  const clients = [
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
    {
      id: "CLI003",
      name: "Empresa ABC Ltda",
      email: "contato@empresaabc.com",
      phone: "(11) 3333-4444",
      document: "12.345.678/0001-99",
      type: "Pessoa Jurídica",
      status: "Ativo",
      cases: 3,
      created: "25/01/2024",
      lastContact: "21/03/2024",
    },
    {
      id: "CLI004",
      name: "Ana Paula Costa",
      email: "ana.costa@email.com",
      phone: "(11) 97777-9999",
      document: "456.789.123-00",
      type: "Pessoa Física",
      status: "Inativo",
      cases: 1,
      created: "10/02/2024",
      lastContact: "15/02/2024",
    },
  ];

  const getStatusColor = (status: string) => {
    return status === "Ativo" 
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";
  };

  const getTypeColor = (type: string) => {
    return type === "Pessoa Física"
      ? "bg-blue-100 text-blue-700"
      : "bg-purple-100 text-purple-700";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Clientes" 
        subtitle="Gerenciamento de clientes do NPJ"
      />
      
      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Lista de Clientes</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar clientes..." 
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Cliente
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Nome/Razão Social</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Contato</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">CPF/CNPJ</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Casos</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Último Contato</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <span className="font-medium text-blue-600">{client.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <span className="font-medium text-gray-900 block">{client.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Mail className="h-3 w-3" />
                            {client.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Phone className="h-3 w-3" />
                            {client.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 font-mono text-sm">{client.document}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getTypeColor(client.type)}>
                          {client.type}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(client.status)}>
                          {client.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
                          {client.cases}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-500 text-sm">{client.lastContact}</span>
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

export default Clientes;
