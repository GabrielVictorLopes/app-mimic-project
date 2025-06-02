
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Calendar, Clock, TrendingUp, AlertCircle, Bell } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const Index = () => {
  const { cases, clients, appointments, getNotifications } = useApp();
  const notifications = getNotifications();

  const stats = [
    {
      title: "Casos Ativos",
      value: cases.length.toString(),
      icon: FileText,
      change: "+12%",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
    },
    {
      title: "Clientes",
      value: clients.length.toString(),
      icon: Users,
      change: "+8%",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/30",
    },
    {
      title: "Compromissos Hoje",
      value: appointments.filter(apt => apt.date === new Date().toLocaleDateString('pt-BR')).length.toString(),
      icon: Calendar,
      change: "2 concluídos",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
    },
    {
      title: "Notificações",
      value: notifications.length.toString(),
      icon: Bell,
      change: "Pendentes",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/30",
    },
  ];

  const recentCases = cases.slice(0, 3);
  const todayAppointments = appointments.filter(apt => 
    apt.date === new Date().toLocaleDateString('pt-BR')
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Menu Principal" 
        subtitle="Visão geral do Núcleo de Prática Jurídica"
      />
      
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.change}</p>
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
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <FileText className="h-5 w-5" />
                Casos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.map((case_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{case_.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{case_.client}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{case_.type}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        case_.status === 'Em andamento' 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : case_.status === 'Audiência marcada'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {case_.status}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{case_.created}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Appointments */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <Clock className="h-5 w-5" />
                Agenda de Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.length > 0 ? (
                  todayAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="text-center">
                        <p className="font-medium text-gray-900 dark:text-white">{appointment.time}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{appointment.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{appointment.client}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        appointment.status === 'Confirmado' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Nenhum compromisso para hoje</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Section */}
        {notifications.length > 0 && (
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 dark:text-white">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                Notificações Importantes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notifications.slice(0, 6).map((notification, index) => (
                  <div key={index} className="p-4 border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                    <h4 className="font-medium text-orange-800 dark:text-orange-200">{notification.title}</h4>
                    <p className="text-sm text-orange-600 dark:text-orange-300 mt-1">{notification.message}</p>
                    <p className="text-xs text-orange-500 dark:text-orange-400 mt-2">{notification.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
