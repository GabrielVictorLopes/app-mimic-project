
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Menu = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        title="Menu" 
        subtitle="Área de Consultoria - Menu Principal"
      />
      
      <div className="p-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Menu Principal da Consultoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Bem-vindo à Área de Consultoria
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Esta é a página principal do menu de consultoria. Aqui você encontrará as principais funcionalidades para gerenciar os serviços de consultoria.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Menu;
