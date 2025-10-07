import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Database, Zap, Trash2, AlignCenter, ShoppingCart, Activity } from "lucide-react";
import { fetchItem, evictById, evictAll, Item } from "@/api/items";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/useCart";
import RequestHistory, { HistoryEntry } from "@/components/RequestHistory";
import CartModal from "@/components/CartModal";

interface RequestResult {
  id: string;
  timestamp: Date;
  item: Item;
  clientMs: number;
  serverMs: number;
  isCacheHit: boolean;
}

const CacheDemo = () => {
  const [itemId, setItemId] = useState("1");
  const [loading, setLoading] = useState(false);
  const [evictingAll, setEvictingAll] = useState(false);
  const [results, setResults] = useState<RequestResult[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const { toast } = useToast();
  const { ids, add, remove, clear, count } = useCart();

  const handleFetchItem = async (id?: string | number) => {
    const idToFetch = id !== undefined ? String(id) : itemId;
    if (!idToFetch.trim()) return;

    setLoading(true);

    try {
      const result = await fetchItem(idToFetch);

      // Cache hit is typically when server time is very low (< 50ms)
      const isCacheHit = result.serverMs < 50;

      const newResult: RequestResult = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        item: result.item,
        clientMs: result.clientMs,
        serverMs: result.serverMs,
        isCacheHit,
      };

      setResults((prev) => [newResult, ...prev]);

      // Add to history (keep last 20)
      setHistory((prev) => {
        const newEntry: HistoryEntry = {
          id: parseInt(result.item.id),
          serverMs: result.serverMs,
          clientMs: result.clientMs,
          hit: isCacheHit,
          at: Date.now(),
        };
        const updated = [newEntry, ...prev];
        return updated.slice(0, 20); // Keep only last 20
      });
    } catch (error) {
      console.error("Error fetching item:", error);
      toast({
        title: "Error",
        description: "Error al obtener el elemento. Asegúrese de que el backend esté en ejecución.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEvictById = async () => {
    if (!itemId.trim()) return;

    try {
      await evictById(itemId);
      toast({
        title: "Caché Eliminada",
        description: `Caché eliminada para el elemento #${itemId}`,
      });
    } catch (error) {
      console.error("Error evicting cache:", error);
      toast({
        title: "Error",
        description: "Error al eliminar la caché.",
        variant: "destructive",
      });
    }
  };

  const handleEvictAll = async () => {
    setEvictingAll(true);
    
    try {
      await evictAll();
      toast({
        title: "Caché Limpiada",
        description: "Toda la caché se ha limpiado exitosamente.",
      });
    } catch (error) {
      console.error("Error clearing cache:", error);
      toast({
        title: "Error",
        description: "Error al limpiar la caché.",
        variant: "destructive",
      });
    } finally {
      setEvictingAll(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  const handleRerun = (id: number) => {
    handleFetchItem(id);
  };

  const handleAddToCart = () => {
    const idNum = parseInt(itemId.trim());
    if (isNaN(idNum)) {
      toast({
        title: "ID Inválido",
        description: "Por favor ingrese un ID numérico válido.",
        variant: "destructive",
      });
      return;
    }

    add(idNum);
    toast({
      title: "Agregado al Carrito",
      description: `El item #${idNum} fue agregado al carrito`,
    });
  };

  // Atajos de teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + Shift + D para borrar caché global
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'D') {
        event.preventDefault();
        if (!evictingAll && !loading) {
          handleEvictAll();
        }
      }
      
      // Ctrl/Cmd + L para limpiar historial
      if ((event.ctrlKey || event.metaKey) && event.key === 'l') {
        event.preventDefault();
        handleClearHistory();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evictingAll, loading]);

  const getPerformanceBadge = (serverMs: number, isCacheHit: boolean) => {
    if (isCacheHit) {
      return (
        <Badge className="bg-success text-success-foreground">
          <Zap className="w-3 h-3 mr-1" />
          Acierto
        </Badge>
      );
    }
    return (
      <Badge className="bg-warning text-warning-foreground">
        <Database className="w-3 h-3 mr-1" />
        Fallo
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Spring Boot Cache Demo
            </h1>
            <Button
              onClick={() => setCartOpen(true)}
              variant="outline"
              size="sm"
              className="border-border hover:bg-secondary relative"
              aria-label={`Abrir carrito con ${count} elementos`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Carrito 🛒
              {count > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-2 h-5 w-5 p-0 text-xs flex items-center justify-center"
                >
                  {count}
                </Badge>
              )}
            </Button>
          </div>
          <p className="text-muted-foreground">
            Esta aplicación comprueba el rendimiento del almacenamiento en caché del backend recuperando el mismo ID de elemento varias veces.
          </p>
        </div>

        {/* Fetch Controls */}
        <Card className="p-6 border-border bg-card">
          <div className="flex gap-3 mb-3">
            <Input
              type="text"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              placeholder="Ingrese el ID del elemento (ej., 1)"
              className="flex-1 bg-input border-border"
              onKeyDown={(e) => e.key === "Enter" && handleFetchItem()}
            />
            <Button
              onClick={() => handleFetchItem()}
              disabled={loading || evictingAll}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? "Obteniendo..." : "Obtener Elemento"}
            </Button>
            <Button
              onClick={handleAddToCart}
              disabled={loading || evictingAll || !itemId.trim()}
              variant="outline"
              className="border-border hover:bg-secondary"
              aria-label="Agregar elemento al carrito"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Agregar al Carrito
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleEvictById}
              disabled={loading || evictingAll || !itemId.trim()}
              variant="outline"
              size="sm"
              className="border-border hover:bg-secondary"
              aria-label="Eliminar caché por ID"
            >
              <Trash2 className="w-3 h-3 mr-2" />
              Eliminar ID
            </Button>
            <Button
              onClick={handleEvictAll}
              disabled={loading || evictingAll}
              variant="outline"
              size="sm"
              className="border-border hover:bg-destructive hover:text-destructive-foreground"
              aria-label="Borrar caché global"
            >
              <Trash2 className="w-3 h-3 mr-2" />
              {evictingAll ? "Eliminando..." : "Eliminar Todo"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            💡 Consejo: Obtenga el mismo ID dos veces para ver el rendimiento de la caché
          </p>
          <div className="text-xs text-muted-foreground mt-1 space-y-1">
            <p>⌨️ Atajos: <kbd className="px-1.5 py-0.5 text-xs bg-secondary rounded border border-border">Ctrl+Shift+D</kbd> para limpiar caché global</p>
            <p className="ml-7"><kbd className="px-1.5 py-0.5 text-xs bg-secondary rounded border border-border">Ctrl+L</kbd> para limpiar historial</p>
          </div>
        </Card>

        {/* Request History */}
        <RequestHistory
          history={history}
          onClearHistory={handleClearHistory}
          onRerun={handleRerun}
        />

        {/* Benchmark Navigation */}
        <Card className="p-6 border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Ejecutor de Prueba de Rendimiento
              </h3>
              <p className="text-sm text-muted-foreground">
                Ejecuta pruebas automatizadas para medir el impacto del caché
              </p>
            </div>
            <Link to="/benchmark">
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                aria-label="Ir al ejecutor de prueba de rendimiento"
              >
                <Activity className="h-4 w-4 mr-2" />
                Ejecutar Pruebas
              </Button>
            </Link>
          </div>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {results.length === 0 && (
            <Card className="p-12 text-center border-border bg-card">
              <Database className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Aún no hay solicitudes. Ingrese un ID de elemento y haga clic en "Obtener Elemento" para comenzar.
              </p>
            </Card>
          )}

          {results.map((result) => (
            <Card
              key={result.id}
              className="p-6 border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      Solicitud para Elemento #{result.item.id}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {result.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {getPerformanceBadge(result.serverMs, result.isCacheHit)}
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tiempo del Cliente</p>
                    <p className="text-2xl font-mono font-bold text-foreground">
                      {result.clientMs}ms
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tiempo del Servidor</p>
                    <p
                      className={`text-2xl font-mono font-bold ${
                        result.isCacheHit ? "text-success" : "text-warning"
                      }`}
                    >
                      {result.serverMs}ms
                    </p>
                  </div>
                </div>

                {/* JSON Response */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Respuesta JSON:</p>
                  <pre className="bg-secondary p-4 rounded-lg overflow-x-auto text-sm border border-border">
                    <code className="text-foreground">
                      {JSON.stringify(result.item, null, 2)}
                    </code>
                  </pre>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Cart Modal */}
        <CartModal
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          ids={ids}
          onRemove={remove}
          onClear={clear}
        />

        {/* Footer */}
        <footer className="border-t border-border mt-4 pt-4" >
          <p className="text-center text-sm text-muted-foreground" >
            Copyright © 2025 - CacheApp - Martin Jimenez.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CacheDemo;
