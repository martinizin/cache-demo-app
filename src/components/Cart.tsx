import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, X } from "lucide-react";
import { fetchItem, Item } from "@/api/items";
import { useToast } from "@/hooks/use-toast";

interface CartItem extends Item {
  loading?: boolean;
  error?: string;
}

interface CartProps {
  ids: number[];
  onRemove: (id: number) => void;
  onClear: () => void;
}

const Cart = ({ ids, onRemove, onClear }: CartProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Cargar detalles de los items cuando cambien los IDs
  useEffect(() => {
    const loadItems = async () => {
      if (ids.length === 0) {
        setItems([]);
        return;
      }

      setLoading(true);
      const newItems: CartItem[] = [];

      // Cargar secuencialmente los detalles de cada item
      for (const id of ids) {
        try {
          const { item } = await fetchItem(String(id));
          newItems.push(item);
        } catch (error) {
          console.error(`Error cargando item ${id}:`, error);
          newItems.push({
            id: String(id),
            name: `Error - Item ${id}`,
            description: "No se pudo cargar",
            price: 0,
            error: "Error al cargar"
          });
        }
      }

      setItems(newItems);
      setLoading(false);
    };

    loadItems();
  }, [ids]);

  // Calcular total
  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleRemove = (id: number) => {
    onRemove(id);
    toast({
      title: "Elemento removido",
      description: `El item #${id} fue removido del carrito`,
    });
  };

  const handleClear = () => {
    onClear();
    toast({
      title: "Carrito vaciado",
      description: "Todos los elementos fueron removidos del carrito",
    });
  };

  if (ids.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Carrito de Compras</h3>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Tu carrito está vacío</p>
          <p className="text-sm">Agrega algunos elementos para comenzar</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Carrito de Compras</h3>
          <Badge variant="secondary">{ids.length}</Badge>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleClear}
          aria-label="Vaciar carrito completo"
          disabled={loading}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Vaciar
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {ids.map((id) => (
            <div key={id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-32 mb-2 animate-pulse" />
                <div className="h-3 bg-muted rounded w-24 animate-pulse" />
              </div>
              <div className="h-6 bg-muted rounded w-16 animate-pulse" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-mono text-muted-foreground">
                    #{item.id}
                  </span>
                  {item.error && (
                    <Badge variant="destructive" className="text-xs px-1 py-0">
                      Error
                    </Badge>
                  )}
                </div>
                <h4 className="font-medium truncate">{item.name}</h4>
                <p className="text-sm text-muted-foreground truncate">
                  {item.description}
                </p>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <div className="text-right">
                  <div className="font-semibold">
                    ${item.price?.toFixed(2) || "0.00"}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemove(ids[index])}
                  aria-label={`Quitar ${item.name} del carrito`}
                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t pt-4 mt-4">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Total:</span>
          <span className="text-primary">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default Cart;