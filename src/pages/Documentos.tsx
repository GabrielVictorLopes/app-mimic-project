
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Download, Eye, Upload, FileText, File, Image } from "lucide-react";

const Documentos = () => {
  const documents = [
    {
      id: "DOC001",
      name: "Petição Inicial - Caso 001/2024",
      type: "Petição",
      size: "2.3 MB",
      format: "PDF",
      case: "001/2024",
      client: "Maria Silva Santos",
      uploadedBy: "Dr. João Silva",
      uploadedAt: "15/03/2024 14:30",
      status: "Aprovado",
    },
    {
      id: "DOC002",
      name: "Contrato de Trabalho",
      type: "Documento",
      size: "1.8 MB",
      format: "PDF",
      case: "001/2024",
      client: "Maria Silva Santos",
      uploadedBy: "Maria Silva Santos",
      uploadedAt: "16/03/2024 09:15",
      status: "Pendente",
    },
    {
      id: "DOC003",
      name: "Certidão de Nascimento",
      type: "Documento Pessoal",
      size: "850 KB",
      format: "PDF",
      case: "003/2024",
      client: "Ana Paula Costa",
      uploadedBy: "Ana Paula Costa",
      uploadedAt: "20/03/2024 16:45",
      status: "Aprovado",
    },
    {
      id: "DOC004",
      name: "Comprovante de Residência",
      type: "Documento Pessoal",
      size: "1.2 MB",
      format: "JPG",
      case: "002/2024",
      client: "João Carlos Oliveira",
      uploadedBy: "João Carlos Oliveira",
      uploadedAt: "18/03/2024 11:20",
      status: "Aprovado",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-100 text-green-700";
      case "Pendente":
        return "bg-yellow-100 text-yellow-700";
      case "Rejeitado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case "pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "jpg":
      case "jpeg":
      case "png":
        return <Image className="h-4 w-4 text-blue-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Documentos" 
        subtitle="Gerenciamento de documentos e arquivos"
      />
      
      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle>Biblioteca de Documentos</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar documentos..." 
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documento
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Documento</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Caso</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Cliente</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Tamanho</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Enviado por</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Data</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {getFileIcon(doc.format)}
                          <div>
                            <span className="font-medium text-gray-900 block">{doc.name}</span>
                            <span className="text-xs text-gray-500">{doc.format}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600">{doc.type}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-blue-600">{doc.case}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600">{doc.client}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-500 text-sm">{doc.size}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 text-sm">{doc.uploadedBy}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-500 text-sm">{doc.uploadedAt}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
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

export default Documentos;
