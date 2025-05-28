
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Calendar, Clock, TrendingUp, AlertCircle } from "lucide-react";

const Index = () => {
  const stats = [
    {
      title: "Casos Ativos",
      value: "124",
      icon: FileText,
      change: "+12%",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Clientes",
      value: "89",
      icon: Users,
      change: "+8%",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Audiências Hoje",
      value: "7",
      icon: Calendar,
      change: "2 concluídas",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Pendências",
      value: "23",
      icon: AlertCircle,
      change: "-5%",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const recentCases = [
    {
      id: "001/2024",
      client: "Maria Silva Santos",
      type: "Trabalhista",
      status: "Em andamento",
      date: "15/03/2024",
    },
    {
      id: "002/2024",
      client: "João Carlos Oliveira",
      type: "Civil",
      status: "Audiência marcada",
      date: "18/03/2024",
    },
    {
      id: "003/2024",
      client: "Ana Paula Costa",
      type: "Família",
      status: "Documentação",
      date: "20/03/2024",
    },
  ];

  const appointments = [
    {
      time: "09:00",
      client: "Carlos Eduardo",
      type: "Consulta inicial",
      status: "Confirmado",
    },
    {
      time: "14:30",
      client: "Fernanda Lima",
      type: "Audiência",
      status: "Pendente",
    },
    {
      time: "16:00",
      client: "Roberto Santos",
      type: "Acompanhamento",
      status: "Confirmado",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Dashboard" 
        subtitle="Visão geral do Núcleo de Prática Jurídica"
      />
      
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Cases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Casos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.map((case_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{case_.id}</p>
                      <p className="text-sm text-gray-600">{case_.client}</p>
                      <p className="text-xs text-gray-500">{case_.type}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                        {case_.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{case_.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Agenda de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="font-medium text-gray-900">{appointment.time}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{appointment.client}</p>
                      <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      appointment.status === 'Confirmado' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
