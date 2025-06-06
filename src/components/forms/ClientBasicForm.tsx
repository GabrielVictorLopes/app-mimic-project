
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ClientBasicFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    cpf: string;
    birthDate: string;
    type: string;
  };
  onChange: (field: string, value: string) => void;
}

export const ClientBasicForm: React.FC<ClientBasicFormProps> = ({ formData, onChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Nome completo do cliente"
            required
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="email@exemplo.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="(11) 99999-9999"
            required
          />
        </div>
        <div>
          <Label htmlFor="cpf">CPF/CNPJ</Label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={(e) => {
              onChange('cpf', e.target.value);
              onChange('document', e.target.value);
            }}
            placeholder="000.000.000-00"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="birthDate">Data de Nascimento</Label>
          <Input
            id="birthDate"
            value={formData.birthDate}
            onChange={(e) => onChange('birthDate', e.target.value)}
            placeholder="DD/MM/AAAA"
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Tipo</Label>
          <select 
            id="type"
            value={formData.type}
            onChange={(e) => onChange('type', e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="Pessoa Física">Pessoa Física</option>
            <option value="Pessoa Jurídica">Pessoa Jurídica</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="address">Endereço</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => onChange('address', e.target.value)}
          placeholder="Endereço completo"
          required
        />
      </div>
    </>
  );
};
