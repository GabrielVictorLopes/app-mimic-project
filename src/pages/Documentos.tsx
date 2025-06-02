import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search, Filter, Download, Eye, Upload, FileText, File, Image } from "lucide-react";
import { DocumentForm } from "@/components/forms/DocumentForm";
import { useApp } from "@/contexts/AppContext";

const Documentos = () => {
  const { documents } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprovado":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "Pendente":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "Rejeitado":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Documentos" 
        subtitle="Gerenciamento de documentos e arquivos"
      />
      
      <div className="p-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="dark:text-white">Biblioteca de Documentos</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Buscar documentos..." 
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
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Documento
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl dark:bg-gray-800 dark:border-gray-700">
                    <DocumentForm onClose={() => setIsFormOpen(false)} />
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
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Documento</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Tipo</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Caso</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Cliente</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Tamanho</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Enviado por</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Data</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600 dark:text-gray-300">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((document, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {getFileIcon(document.format)}
                          <div>
                            <span className="font-medium text-gray-900 dark:text-white block">{document.name}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{document.format}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 dark:text-gray-300">{document.type}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-blue-600 dark:text-blue-400">{document.case}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 dark:text-gray-300">{document.client}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{document.size}</span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(document.status)}>
                          {document.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-600 dark:text-gray-300 text-sm">{document.uploadedBy}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">{document.createdAt}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex gap-1 justify-end">
                          <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-gray-300">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 dark:text-gray-300">
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
