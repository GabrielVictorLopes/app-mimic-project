
import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Filter, Eye, Edit, MoreHorizontal, Phone, Mail } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClientForm } from "@/components/forms/ClientForm";
import { useApp } from "@/contexts/AppContext";

const Clientes = () => {
  const { clients } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  const openCreateForm = () => {
    setEditingClient(null);
    setFormMode('create');
    setIsFormOpen(true);
  };

  const openEditForm = (client: any) => {
    setEditingClient(client);
    setFormMode('edit');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingClient(null);
    setFormMode('create');
  };

  const getStatusColor = (status: string) => {
    return status === "Ativo" 
      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
  };

  const getTypeColor = (type: string) => {
    return type === "Pessoa Física"
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      : "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Clientes" 
        subtitle="Gerenciamento de clientes do NPJ"
      />
      
      <div className="p-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="dark:text-white">Lista de Clientes</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar clientes..." 
                      className="pl-10 w-64 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <Button variant="outline" size="icon" className="dark:border-gray-600 dark:text-gray-300">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={openCreateForm} className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Novo Cliente
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl dark:bg-gray-800 dark:border-gray-700">
                    <ClientForm 
                      onClose={closeForm} 
                      client={editingClient}
                      mode={formMode}
                    />
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
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Nome/Razão Social</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Contato</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">CPF/CNPJ</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Casos</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Último Contato</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-4 px-4">
                        <span className="font-medium text-blue-600 dark:text-blue-400">{client.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white block">{client.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                            <Mail className="h-3 w-3" />
                            {client.email}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                            <Phone className="h-3 w-3" />
                            {client.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 dark:text-gray-300 font-mono text-sm">{client.document}</span>
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
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-sm font-medium">
                          {client.cases}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{client.lastContact}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-gray-300">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 dark:border-gray-700">
                            <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700">
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => openEditForm(client)}
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
    </div>
  );
};

export default Clientes;
