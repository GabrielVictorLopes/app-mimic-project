
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, User, Bell, Shield, Palette } from "lucide-react";

const Configuracoes = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Configurações" 
        subtitle="Gerencie as configurações do sistema"
      />
      
      <div className="p-6">
        <Tabs defaultValue="appearance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Aparência
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Segurança
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-base font-medium">Tema Escuro</Label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Alterne entre o tema claro e escuro
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sun className={`h-4 w-4 ${!isDarkMode ? 'text-yellow-500' : 'text-gray-400'}`} />
                    <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                    <Moon className={`h-4 w-4 ${isDarkMode ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <Label className="text-base font-medium">Outras Opções</Label>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Sidebar compacta</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Animações reduzidas</Label>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" defaultValue="João" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input id="lastName" defaultValue="Silva" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" defaultValue="joao.silva@npj.edu.br" />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="(11) 99999-9999" />
                </div>
                <div>
                  <Label htmlFor="oab">OAB</Label>
                  <Input id="oab" defaultValue="123.456/SP" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Novos casos</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Receber notificações de novos casos atribuídos
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Audiências</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Lembretes de audiências marcadas
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">Documentos pendentes</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Notificações de documentos aguardando aprovação
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="font-medium">E-mail diário</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Resumo diário das atividades
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="currentPassword">Senha Atual</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">Nova Senha</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Alterar Senha
                </Button>
                
                <div className="border-t pt-6">
                  <Label className="text-base font-medium">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-4">
                    Adicione uma camada extra de segurança à sua conta
                  </p>
                  <Button variant="outline">
                    Configurar 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Configuracoes;
