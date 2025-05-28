
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";

const Agenda = () => {
  const appointments = [
    {
      id: "AGD001",
      title: "Audiência Trabalhista",
      client: "Maria Silva Santos",
      case: "001/2024",
      date: "25/03/2024",
      time: "09:00",
      duration: "2h",
      location: "TRT - 2ª Região",
      type: "Audiência",
      status: "Confirmado",
      participants: ["Dr. João Silva", "Maria Silva Santos"],
      notes: "Levar documentos originais do contrato de trabalho",
    },
    {
      id: "AGD002",
      title: "Consulta Inicial",
      client: "Carlos Eduardo Santos",
      case: "Novo",
      date: "25/03/2024",
      time: "14:30",
      duration: "1h",
      location: "NPJ - Sala 101",
      type: "Consulta",
      status: "Confirmado",
      participants: ["Dra. Ana Costa", "Carlos Eduardo Santos"],
      notes: "Primeira consulta - caso de direito civil",
    },
    {
      id: "AGD003",
      title: "Reunião com Cliente",
      client: "João Carlos Oliveira",
      case: "002/2024",
      date: "26/03/2024",
      time: "10:00",
      duration: "1h",
      location: "NPJ - Sala 102",
      type: "Reunião",
      status: "Pendente",
      participants: ["Dra. Ana Costa", "João Carlos Oliveira"],
      notes: "Discussão sobre estratégia processual",
    },
    {
      id: "AGD004",
      title: "Mediação Familiar",
      client: "Ana Paula Costa",
      case: "003/2024",
      date: "26/03/2024",
      time: "16:00",
      duration: "2h",
      location: "CEJUSC",
      type: "Mediação",
      status: "Confirmado",
      participants: ["Dr. Carlos Santos", "Ana Paula Costa", "Mediador"],
      notes: "Tentativa de acordo extrajudicial",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado":
        return "bg-green-100 text-green-700";
      case "Pendente":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelado":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Audiência":
        return "bg-purple-100 text-purple-700";
      case "Consulta":
        return "bg-blue-100 text-blue-700";
      case "Reunião":
        return "bg-orange-100 text-orange-700";
      case "Mediação":
        return "bg-teal-100 text-teal-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Agenda" 
        subtitle="Calendário de compromissos e audiências"
      />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <Button variant="outline">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Hoje
            </Button>
            <Button variant="outline">
              Esta Semana
            </Button>
            <Button variant="outline">
              Este Mês
            </Button>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Compromisso
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Compromissos */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Próximos Compromissos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{appointment.title}</h3>
                          <p className="text-gray-600 text-sm">{appointment.client}</p>
                          {appointment.case !== "Novo" && (
                            <p className="text-blue-600 text-sm font-medium">Caso: {appointment.case}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getTypeColor(appointment.type)}>
                            {appointment.type}
                          </Badge>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {appointment.time} ({appointment.duration})
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {appointment.location}
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            Participantes: {appointment.participants.join(", ")}
                          </span>
                        </div>
                        {appointment.notes && (
                          <p className="text-sm text-gray-500 bg-gray-50 p-2 rounded">
                            <strong>Observações:</strong> {appointment.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Dia */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hoje - 25/03/2024</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">09:00</p>
                      <p className="text-sm text-blue-700">Audiência Trabalhista</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Confirmado</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-blue-900">14:30</p>
                      <p className="text-sm text-blue-700">Consulta Inicial</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">Confirmado</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Compromissos hoje</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Esta semana</span>
                    <span className="font-semibold">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Audiências pendentes</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultas agendadas</span>
                    <span className="font-semibold">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
