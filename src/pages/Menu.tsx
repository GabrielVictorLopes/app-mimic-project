
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  Users, 
  FileText, 
  Calendar, 
  BarChart3, 
  Settings,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

const Menu = () => {
  const consultoriaServices = [
    {
      title: "Análise de Contratos",
      description: "Revisão detalhada e análise jurídica de contratos empresariais",
      icon: FileText,
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/30"
    },
    {
      title: "Consultoria Empresarial",
      description: "Assessoria jurídica especializada para empresas e negócios",
      icon: Briefcase,
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      bgColor: "hover:bg-green-50 dark:hover:bg-green-900/30"
    },
    {
      title: "Gestão de Clientes",
      description: "Acompanhamento personalizado e gestão de relacionamento",
      icon: Users,
      color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      bgColor: "hover:bg-purple-50 dark:hover:bg-purple-900/30"
    },
    {
      title: "Planejamento Estratégico",
      description: "Desenvolvimento de estratégias jurídicas e empresariais",
      icon: TrendingUp,
      color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
      bgColor: "hover:bg-orange-50 dark:hover:bg-orange-900/30"
    }
  ];

  const quickStats = [
    { label: "Consultorias Ativas", value: "24", icon: Clock, color: "text-blue-600 dark:text-blue-400" },
    { label: "Projetos Concluídos", value: "156", icon: CheckCircle, color: "text-green-600 dark:text-green-400" },
    { label: "Clientes Atendidos", value: "89", icon: Users, color: "text-purple-600 dark:text-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Consultoria Jurídica" 
        subtitle="Área de Consultoria - Serviços Especializados"
      />
      
      <div className="p-6 space-y-6">
        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="dark:bg-gray-800 dark:border-gray-700 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Serviços de Consultoria */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              Serviços de Consultoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultoriaServices.map((service, index) => (
                <Card key={index} className={`dark:bg-gray-700 dark:border-gray-600 transition-all cursor-pointer ${service.bgColor} border-l-4 border-l-blue-500`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${service.color}`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                          {service.description}
                        </p>
                        <Button variant="outline" size="sm" className="dark:border-gray-500 dark:text-gray-300">
                          Acessar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white flex items-center gap-2">
              <Settings className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white p-6 h-auto flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Agendar Consultoria</span>
              </Button>
              <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300 p-6 h-auto flex-col gap-2">
                <BarChart3 className="h-6 w-6" />
                <span>Relatórios</span>
              </Button>
              <Button variant="outline" className="dark:border-gray-600 dark:text-gray-300 p-6 h-auto flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Gerenciar Clientes</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Menu;
