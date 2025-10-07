import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, Database, Trash2 } from "lucide-react";

export interface HistoryEntry {
  id: number;
  serverMs: number;
  clientMs: number;
  hit: boolean;
  at: number;
}

interface RequestHistoryProps {
  history: HistoryEntry[];
  onClearHistory: () => void;
  onRerun: (id: number) => void;
}

const RequestHistory = ({ history, onClearHistory, onRerun }: RequestHistoryProps) => {
  if (history.length === 0) {
    return (
      <Card className="p-8 text-center border-border bg-card">
        <Clock className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
        <p className="text-muted-foreground">
          Aún no hay historial de solicitudes. Realice algunas solicitudes para verlas aquí.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-border bg-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Historial de Solicitudes</h2>
        <Button
          onClick={onClearHistory}
          variant="outline"
          size="sm"
          className="border-border hover:bg-destructive hover:text-destructive-foreground"
          aria-label="Borrar historial de solicitudes"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Limpiar Historial
        </Button>
      </div>

      <div className="space-y-2">
        {history.map((entry, index) => (
          <div
            key={`${entry.at}-${index}`}
            onClick={() => onRerun(entry.id)}
            className="flex items-center justify-between p-4 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors border border-border hover:border-primary/50"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="text-sm font-mono text-muted-foreground">
                {new Date(entry.at).toLocaleTimeString()}
              </div>
              <div className="text-sm font-semibold text-foreground">
                Elemento #{entry.id}
              </div>
              <div className="flex gap-3">
                <div className="text-xs">
                  <span className="text-muted-foreground">Servidor: </span>
                  <span className={`font-mono font-bold ${entry.hit ? "text-success" : "text-warning"}`}>
                    {entry.serverMs}ms
                  </span>
                </div>
                <div className="text-xs">
                  <span className="text-muted-foreground">Cliente: </span>
                  <span className="font-mono font-bold text-foreground">
                    {entry.clientMs}ms
                  </span>
                </div>
              </div>
            </div>
            <Badge
              className={
                entry.hit
                  ? "bg-success text-success-foreground"
                  : "bg-warning text-warning-foreground"
              }
            >
              {entry.hit ? (
                <>
                  <Zap className="w-3 h-3 mr-1" />
                  Acierto
                </>
              ) : (
                <>
                  <Database className="w-3 h-3 mr-1" />
                  Fallo
                </>
              )}
            </Badge>
          </div>
        ))}
      </div>

      {history.length === 20 && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Mostrando las últimas 20 solicitudes. Las entradas más antiguas se eliminan automáticamente.
        </p>
      )}
    </Card>
  );

};

export default RequestHistory;
