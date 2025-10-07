import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetchItem, evictById } from "@/api/items";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Play, Loader2 } from "lucide-react";

interface BenchmarkData {
  label: string;
  serverMs: number;
  clientMs: number;
}

const Benchmark = () => {
  const [itemId, setItemId] = useState("1");
  const [warmCount, setWarmCount] = useState(5);
  const [running, setRunning] = useState(false);
  const [data, setData] = useState<BenchmarkData[]>([]);

  const runBenchmark = async () => {
    if (!itemId.trim() || warmCount < 1) return;

    setRunning(true);
    setData([]);

    try {
      const results: BenchmarkData[] = [];

      // Evict cache first to ensure cold start
      await evictById(itemId);

      // 1. Cold call
      const coldResult = await fetchItem(itemId);
      results.push({
        label: "fría",
        serverMs: coldResult.serverMs,
        clientMs: coldResult.clientMs,
      });

      // 2. Warm calls
      for (let i = 1; i <= warmCount; i++) {
        const warmResult = await fetchItem(itemId);
        results.push({
          label: `caliente #${i}`,
          serverMs: warmResult.serverMs,
          clientMs: warmResult.clientMs,
        });
      }

      setData(results);
    } catch (error) {
      console.error("Benchmark error:", error);
    } finally {
      setRunning(false);
    }
  };

  return (
    <Card className="p-6 border-border bg-card space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Ejecutor de Prueba de Rendimiento</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Ejecute una prueba de rendimiento con 1 llamada fría + N llamadas calientes para visualizar el rendimiento de la caché
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="bench-id">ID del Elemento</Label>
            <Input
              id="bench-id"
              type="text"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              placeholder="ej., 1"
              disabled={running}
              className="bg-input border-border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="warm-count">Llamadas Calientes</Label>
            <Input
              id="warm-count"
              type="number"
              min="1"
              max="20"
              value={warmCount}
              onChange={(e) => setWarmCount(parseInt(e.target.value) || 5)}
              placeholder="ej., 5"
              disabled={running}
              className="bg-input border-border"
            />
          </div>
        </div>

        <Button
          onClick={runBenchmark}
          disabled={running || !itemId.trim()}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {running ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Ejecutando...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Ejecutar Prueba
            </>
          )}
        </Button>
      </div>

      {data.length > 0 && (
        <>
          {/* Chart */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Gráfico de Rendimiento</h3>
            <div className="h-80 w-full bg-secondary/30 rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="label"
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: "12px" }}
                    label={{ value: "Tiempo (ms)", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="serverMs"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    name="Tiempo del Servidor (ms)"
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="clientMs"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Tiempo del Cliente (ms)"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Data Table */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Tabla de Resultados</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-muted-foreground font-medium">Llamada</th>
                    <th className="text-right p-3 text-muted-foreground font-medium">Tiempo del Servidor</th>
                    <th className="text-right p-3 text-muted-foreground font-medium">Tiempo del Cliente</th>
                    <th className="text-right p-3 text-muted-foreground font-medium">Diferencia</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-border hover:bg-secondary/50 transition-colors"
                    >
                      <td className="p-3 font-mono text-foreground">{row.label}</td>
                      <td className="p-3 text-right font-mono">
                        <span
                          className={
                            row.serverMs < 50 ? "text-success font-bold" : "text-warning font-bold"
                          }
                        >
                          {row.serverMs}ms
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono text-foreground">
                        {row.clientMs}ms
                      </td>
                      <td className="p-3 text-right font-mono text-muted-foreground">
                        {row.clientMs - row.serverMs}ms
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default Benchmark;
