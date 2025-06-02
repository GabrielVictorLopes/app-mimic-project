
import { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Clock, MapPin, Users, CalendarIcon } from "lucide-react";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { useApp } from "@/contexts/AppContext";
import { format, isSameDay, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

const Agenda = () => {
  const { appointments } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmado":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "Pendente":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "Cancelado":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Audiência":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300";
      case "Consulta":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "Reunião":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
      case "Mediação":
        return "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  // Converter string de data para Date object e filtrar eventos do dia selecionado
  const getEventsForDate = (date: Date) => {
    return appointments.filter(appointment => {
      const appointmentDate = parseISO(appointment.date.split('/').reverse().join('-'));
      return isSameDay(appointmentDate, date);
    });
  };

  // Marcar dias com eventos no calendário
  const getDaysWithEvents = () => {
    return appointments.map(appointment => {
      const appointmentDate = parseISO(appointment.date.split('/').reverse().join('-'));
      return appointmentDate;
    });
  };

  const eventsForSelectedDate = getEventsForDate(selectedDate);
  const daysWithEvents = getDaysWithEvents();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Agenda" 
        subtitle="Calendário de compromissos e audiências"
      />
      
      <div className="p-6">
        <div className="flex justify-end mb-6">
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Compromisso
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl dark:bg-gray-800 dark:border-gray-700">
              <AppointmentForm onClose={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendário */}
          <div className="lg:col-span-1">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Calendário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  locale={ptBR}
                  className="rounded-md border dark:border-gray-700"
                  modifiers={{
                    hasEvents: daysWithEvents,
                  }}
                  modifiersStyles={{
                    hasEvents: {
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      fontWeight: 'bold',
                    },
                  }}
                />
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    📅 Dias marcados em azul possuem eventos agendados
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Resumo do Dia */}
            <Card className="dark:bg-gray-800 dark:border-gray-700 mt-6">
              <CardHeader>
                <CardTitle className="text-lg dark:text-white">
                  {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Eventos hoje</span>
                    <span className="font-semibold dark:text-white">{eventsForSelectedDate.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Total na agenda</span>
                    <span className="font-semibold dark:text-white">{appointments.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Eventos do Dia Selecionado */}
          <div className="lg:col-span-2">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Eventos do dia - {format(selectedDate, "dd/MM/yyyy")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {eventsForSelectedDate.length > 0 ? (
                  <div className="space-y-4">
                    {eventsForSelectedDate.map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow dark:hover:bg-gray-700">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{appointment.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{appointment.client}</p>
                            {appointment.case !== "Novo" && (
                              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Caso: {appointment.case}</p>
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
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            {appointment.time} ({appointment.duration})
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {appointment.location}
                          </div>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">
                              Participantes: {appointment.participants.join(", ")}
                            </span>
                          </div>
                          {appointment.notes && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-2 rounded">
                              <strong>Observações:</strong> {appointment.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Nenhum evento agendado para {format(selectedDate, "dd/MM/yyyy")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
