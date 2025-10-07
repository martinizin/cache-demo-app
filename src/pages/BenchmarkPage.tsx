import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Activity } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import Benchmark from "@/components/Benchmark";

const BenchmarkPage = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header con navegación */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button 
              variant="outline" 
              size="sm"
              className="border-border hover:bg-secondary"
              aria-label="Volver a la página principal"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-3">
              <Activity className="h-8 w-8 text-primary" />
              Ejecutor de Prueba de Rendimiento
            </h1>
            <p className="text-muted-foreground mt-2">
              Ejecuta pruebas automatizadas de rendimiento para medir el impacto del caché
            </p>
          </div>
        </div>

        {/* Información adicional */}
        <Card className="p-6 border-border bg-card">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">¿Cómo funciona?</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• <strong>1 llamada en frío:</strong> Primera petición sin caché (tiempo base)</p>
              <p>• <strong>N llamadas en caliente:</strong> Peticiones posteriores que aprovechan el caché</p>
              <p>• <strong>Gráfico comparativo:</strong> Visualiza la diferencia de rendimiento</p>
              <p>• <strong>Métricas detalladas:</strong> Tiempos de servidor y cliente por petición</p>
            </div>
          </div>
        </Card>

        {/* Componente Benchmark */}
        <Benchmark />

        <Toaster />
      </div>
    </div>
  );
};

export default BenchmarkPage;