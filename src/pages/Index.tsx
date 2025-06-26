
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
      
      <div className="p-3 md:p-6 space-y-4 md:space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">{stat.title}</p>
                    <p className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">{stat.change}</p>
                  </div>
                  <div className={`p-2 md:p-3 rounded-lg ${stat.bgColor} flex-shrink-0`}>
                    <stat.icon className={`h-4 w-4 md:h-6 md:w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Recent Cases */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center gap-2 dark:text-white text-base md:text-lg">
                <FileText className="h-4 w-4 md:h-5 md:w-5" />
                Casos Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 md:space-y-4">
                {recentCases.map((case_, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 dark:text-white text-sm md:text-base truncate">{case_.id}</p>
                      <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate">{case_.client}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{case_.type}</p>
                    </div>
                    <div className="text-left sm:text-right flex-shrink-0">
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
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center gap-2 dark:text-white text-base md:text-lg">
                <Clock className="h-4 w-4 md:h-5 md:w-5" />
                Agenda de Hoje
              </CardTitle>  
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 md:space-y-4">
                {todayAppointments.length > 0 ? (
                  todayAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <div className="text-center flex-shrink-0">
                        <p className="font-medium text-gray-900 dark:text-white text-sm md:text-base">{appointment.time}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white text-sm md:text-base truncate">{appointment.title}</p>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 truncate">{appointment.client}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                        appointment.status === 'Confirmado' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 md:py-8">
                    <Calendar className="h-8 w-8 md:h-12 md:w-12 text-gray-400 dark:text-gray-500 mx-auto mb-3 md:mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">Nenhum compromisso para hoje</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Section */}
        {notifications.length > 0 && (
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-3 md:pb-6">
              <CardTitle className="flex items-center gap-2 dark:text-white text-base md:text-lg">
                <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-orange-500" />
                Notificações Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {notifications.slice(0, 6).map((notification, index) => (
                  <div key={index} className="p-3 md:p-4 border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                    <h4 className="font-medium text-orange-800 dark:text-orange-200 text-sm md:text-base">{notification.title}</h4>
                    <p className="text-xs md:text-sm text-orange-600 dark:text-orange-300 mt-1">{notification.message}</p>
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
