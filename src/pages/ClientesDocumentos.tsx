
import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Filter, Eye, Edit, MoreHorizontal, Phone, Mail, FileText, Upload, Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ClientForm } from "@/components/forms/ClientForm";
import { DocumentForm } from "@/components/forms/DocumentForm";
import { useApp } from "@/contexts/AppContext";

const ClientesDocumentos = () => {
  const { clients, documents } = useApp();
  const [isClientFormOpen, setIsClientFormOpen] = useState(false);
  const [isDocumentFormOpen, setIsDocumentFormOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClientDocuments = (clientName: string) => {
    return documents.filter(doc => doc.client === clientName);
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
        title="Clientes e Documentos" 
        subtitle="Gerenciamento integrado de clientes e seus documentos"
      />
      
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de Clientes */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="dark:text-white">Clientes</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar clientes..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <Dialog open={isClientFormOpen} onOpenChange={setIsClientFormOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Novo Cliente
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl dark:bg-gray-800 dark:border-gray-700">
                      <ClientForm onClose={() => setIsClientFormOpen(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredClients.map((client) => (
                  <div 
                    key={client.id} 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      selectedClient?.id === client.id ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700' : ''
                    }`}
                    onClick={() => setSelectedClient(client)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{client.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getTypeColor(client.type)}>{client.type}</Badge>
                          <Badge className={getStatusColor(client.status)}>{client.status}</Badge>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-gray-300">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 dark:border-gray-700">
                          <DropdownMenuItem className="dark:text-gray-300 dark:hover:bg-gray-700">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {client.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {client.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Detalhes do Cliente e Documentos */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="dark:text-white">
                  {selectedClient ? `Documentos - ${selectedClient.name}` : 'Selecione um Cliente'}
                </CardTitle>
                {selectedClient && (
                  <Dialog open={isDocumentFormOpen} onOpenChange={setIsDocumentFormOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Upload className="h-4 w-4 mr-2" />
                        Novo Documento
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl dark:bg-gray-800 dark:border-gray-700">
                      <DocumentForm onClose={() => setIsDocumentFormOpen(false)} />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {selectedClient ? (
                <div className="space-y-6">
                  {/* Informações do Cliente */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Informações do Cliente</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">CPF/CNPJ:</span>
                        <p className="font-medium dark:text-white">{selectedClient.document}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Casos:</span>
                        <p className="font-medium dark:text-white">{selectedClient.cases}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Último Contato:</span>
                        <p className="font-medium dark:text-white">{selectedClient.lastContact}</p>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Criado em:</span>
                        <p className="font-medium dark:text-white">{selectedClient.created}</p>
                      </div>
                    </div>
                  </div>

                  {/* Lista de Documentos */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Documentos</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {getClientDocuments(selectedClient.name).map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{doc.type} • {doc.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={
                              doc.status === "Aprovado" 
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : doc.status === "Pendente"
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                            }>
                              {doc.status}
                            </Badge>
                            <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-gray-300">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-gray-300">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {getClientDocuments(selectedClient.name).length === 0 && (
                        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                          Nenhum documento encontrado para este cliente.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Selecione um cliente na lista ao lado para ver seus documentos
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientesDocumentos;
