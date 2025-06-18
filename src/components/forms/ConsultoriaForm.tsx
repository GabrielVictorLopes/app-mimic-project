
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ConsultoriaFormProps {
  onClose: () => void;
  consultoria?: any;
}

export const ConsultoriaForm: React.FC<ConsultoriaFormProps> = ({ onClose, consultoria }) => {
  const [formData, setFormData] = useState({
    client: consultoria?.client || '',
    type: consultoria?.type || '',
    subject: consultoria?.subject || '',
    status: consultoria?.status || 'Em andamento',
    priority: consultoria?.priority || 'Média',
    responsible: consultoria?.responsible || '',
    startDate: consultoria?.startDate || '',
    endDate: consultoria?.endDate || '',
    value: consultoria?.value || '',
    description: consultoria?.description || '',
    objectives: consultoria?.objectives || '',
    deliverables: consultoria?.deliverables || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Consultoria data:', formData);
    onClose();
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>{consultoria ? 'Editar Consultoria' : 'Nova Consultoria'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="client">Cliente</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData({...formData, client: e.target.value})}
                placeholder="Nome do cliente"
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo de Consultoria</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Análise de Contratos">Análise de Contratos</SelectItem>
                  <SelectItem value="Consultoria Empresarial">Consultoria Empresarial</SelectItem>
                  <SelectItem value="Planejamento Estratégico">Planejamento Estratégico</SelectItem>
                  <SelectItem value="Gestão de Clientes">Gestão de Clientes</SelectItem>
                  <SelectItem value="Compliance">Compliance</SelectItem>
                  <SelectItem value="Due Diligence">Due Diligence</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="subject">Assunto</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              placeholder="Resumo do assunto da consultoria"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição Detalhada</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Descrição completa da consultoria"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="objectives">Objetivos</Label>
            <Textarea
              id="objectives"
              value={formData.objectives}
              onChange={(e) => setFormData({...formData, objectives: e.target.value})}
              placeholder="Objetivos a serem alcançados com a consultoria"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="deliverables">Entregáveis</Label>
            <Textarea
              id="deliverables"
              value={formData.deliverables}
              onChange={(e) => setFormData({...formData, deliverables: e.target.value})}
              placeholder="Lista de entregáveis da consultoria"
              rows={3}
            />
          </div>

          {/* Datas e Valor */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="startDate">Data de Início</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="endDate">Data de Término</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="value">Valor</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                placeholder="R$ 0,00"
              />
            </div>
          </div>

          {/* Status e Prioridade */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Aguardando aprovação">Aguardando aprovação</SelectItem>
                  <SelectItem value="Concluída">Concluída</SelectItem>
                  <SelectItem value="Cancelada">Cancelada</SelectItem>
                  <SelectItem value="Pausada">Pausada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority">Prioridade</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Média">Média</SelectItem>
                  <SelectItem value="Baixa">Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="responsible">Responsável</Label>
              <Input
                id="responsible"
                value={formData.responsible}
                onChange={(e) => setFormData({...formData, responsible: e.target.value})}
                placeholder="Nome do responsável"
                required
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {consultoria ? 'Atualizar' : 'Criar'} Consultoria
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
