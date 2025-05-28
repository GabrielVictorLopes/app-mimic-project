
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, Filter, Calendar, TrendingUp, Users, FileText, Clock } from "lucide-react";

const Relatorios = () => {
  // Dados para os gráficos
  const casosPorMes = [
    { mes: "Jan", casos: 12 },
    { mes: "Fev", casos: 19 },
    { mes: "Mar", casos: 15 },
    { mes: "Abr", casos: 22 },
    { mes: "Mai", casos: 18 },
    { mes: "Jun", casos: 25 },
  ];

  const casosPorTipo = [
    { tipo: "Trabalhista", quantidade: 45, color: "#3B82F6" },
    { tipo: "Civil", quantidade: 32, color: "#10B981" },
    { tipo: "Família", quantidade: 28, color: "#F59E0B" },
    { tipo: "Criminal", quantidade: 15, color: "#EF4444" },
    { tipo: "Outros", quantidade: 8, color: "#8B5CF6" },
  ];

  const atendimentosPorSemana = [
    { semana: "Sem 1", atendimentos: 35 },
    { semana: "Sem 2", atendimentos: 42 },
    { semana: "Sem 3", atendimentos: 38 },
    { semana: "Sem 4", atendimentos: 45 },
  ];

  const estatisticasGerais = [
    {
      titulo: "Total de Casos",
      valor: "128",
      mudanca: "+12%",
      cor: "text-blue-600",
      fundo: "bg-blue-50",
      icone: FileText,
    },
    {
      titulo: "Clientes Ativos",
      valor: "89",
      mudanca: "+8%",
      cor: "text-green-600",
      fundo: "bg-green-50",
      icone: Users,
    },
    {
      titulo: "Casos Concluídos",
      valor: "67",
      mudanca: "+15%",
      cor: "text-purple-600",
      fundo: "bg-purple-50",
      icone: TrendingUp,
    },
    {
      titulo: "Tempo Médio",
      valor: "45 dias",
      mudanca: "-5%",
      cor: "text-orange-600",
      fundo: "bg-orange-50",
      icone: Clock,
    },
  ];

  const relatoriosDisponiveis = [
    {
      titulo: "Relatório Mensal de Casos",
      descricao: "Análise completa dos casos do mês atual",
      periodo: "Março 2024",
      formato: "PDF",
      tamanho: "2.1 MB",
    },
    {
      titulo: "Relatório de Produtividade",
      descricao: "Produtividade por advogado e estagiário",
      periodo: "Trimestre Q1",
      formato: "Excel",
      tamanho: "1.8 MB",
    },
    {
      titulo: "Relatório Financeiro",
      descricao: "Custos e receitas do NPJ",
      periodo: "2024",
      formato: "PDF",
      tamanho: "3.2 MB",
    },
    {
      titulo: "Relatório de Atendimentos",
      descricao: "Estatísticas de atendimentos realizados",
      periodo: "Março 2024",
      formato: "PDF",
      tamanho: "1.5 MB",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Relatórios" 
        subtitle="Análises e estatísticas do NPJ"
      />
      
      <div className="p-6 space-y-6">
        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {estatisticasGerais.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.titulo}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.valor}</p>
                    <p className={`text-sm ${stat.mudanca.startsWith('+') ? 'text-green-600' : 'text-red-600'} mt-1`}>
                      {stat.mudanca} vs mês anterior
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.fundo}`}>
                    <stat.icone className={`h-6 w-6 ${stat.cor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Casos por Mês */}
          <Card>
            <CardHeader>
              <CardTitle>Casos por Mês</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={casosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="casos" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Casos por Tipo */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Tipo de Caso</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={casosPorTipo}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="quantidade"
                    label={({ tipo, quantidade }) => `${tipo}: ${quantidade}`}
                  >
                    {casosPorTipo.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Atendimentos */}
        <Card>
          <CardHeader>
            <CardTitle>Atendimentos por Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={atendimentosPorSemana}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semana" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="atendimentos" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Relatórios Disponíveis */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Relatórios Disponíveis</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrar
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Período
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatoriosDisponiveis.map((relatorio, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{relatorio.titulo}</h4>
                      <p className="text-sm text-gray-600 mt-1">{relatorio.descricao}</p>
                    </div>
                    <Badge variant="outline">{relatorio.formato}</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <p>{relatorio.periodo}</p>
                      <p>{relatorio.tamanho}</p>
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Relatorios;
