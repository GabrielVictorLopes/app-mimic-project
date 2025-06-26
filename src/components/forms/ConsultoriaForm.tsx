
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
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Informações Básicas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div>
            <Label htmlFor="client" className="text-sm font-medium">Cliente</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData({...formData, client: e.target.value})}
              placeholder="Nome do cliente"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="type" className="text-sm font-medium">Tipo de Consultoria</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
              <SelectTrigger className="mt-1">
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
          <Label htmlFor="subject" className="text-sm font-medium">Assunto</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
            placeholder="Resumo do assunto da consultoria"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-sm font-medium">Descrição Detalhada</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Descrição completa da consultoria"
            rows={4}
            className="mt-1 resize-none"
          />
        </div>

        <div>
          <Label htmlFor="objectives" className="text-sm font-medium">Objetivos</Label>
          <Textarea
            id="objectives"
            value={formData.objectives}
            onChange={(e) => setFormData({...formData, objectives: e.target.value})}
            placeholder="Objetivos a serem alcançados com a consultoria"
            rows={3}
            className="mt-1 resize-none"
          />
        </div>

        <div>
          <Label htmlFor="deliverables" className="text-sm font-medium">Entregáveis</Label>
          <Textarea
            id="deliverables"
            value={formData.deliverables}
            onChange={(e) => setFormData({...formData, deliverables: e.target.value})}
            placeholder="Lista de entregáveis da consultoria"
            rows={3}
            className="mt-1 resize-none"
          />
        </div>

        {/* Datas e Valor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div>
            <Label htmlFor="startDate" className="text-sm font-medium">Data de Início</Label>
            <Input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-sm font-medium">Data de Término</Label>
            <Input
              id="endDate"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="value" className="text-sm font-medium">Valor</Label>
            <Input
              id="value"
              value={formData.value}
              onChange={(e) => setFormData({...formData, value: e.target.value})}
              placeholder="R$ 0,00"
              className="mt-1"
            />
          </div>
        </div>

        {/* Status e Prioridade */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          <div>
            <Label htmlFor="status" className="text-sm font-medium">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
              <SelectTrigger className="mt-1">
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
            <Label htmlFor="priority" className="text-sm font-medium">Prioridade</Label>
            <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
              <SelectTrigger className="mt-1">
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
            <Label htmlFor="responsible" className="text-sm font-medium">Responsável</Label>
            <Input
              id="responsible"
              value={formData.responsible}
              onChange={(e) => setFormData({...formData, responsible: e.target.value})}
              placeholder="Nome do responsável"
              required
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 justify-end pt-4 border-t">
          <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
            Cancelar
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
            {consultoria ? 'Atualizar' : 'Criar'} Consultoria
          </Button>
        </div>
      </form>
    </div>
  );
};
