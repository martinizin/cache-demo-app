import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Database, Zap } from "lucide-react";

interface Item {
  id: string;
  name: string;
  description: string;
}

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
  const [results, setResults] = useState<RequestResult[]>([]);

  const fetchItem = async () => {
    if (!itemId.trim()) return;

    setLoading(true);
    const startTime = performance.now();

    try {
      const response = await axios.get(`/api/items/${itemId}`, {
        headers: {
          Accept: "application/json",
        },
      });

      const endTime = performance.now();
      const clientMs = Math.round(endTime - startTime);
      const serverMs = parseInt(response.headers["x-server-timems"] || "0");

      // Cache hit is typically when server time is very low (< 50ms)
      const isCacheHit = serverMs < 50;

      const newResult: RequestResult = {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        item: response.data,
        clientMs,
        serverMs,
        isCacheHit,
      };

      setResults((prev) => [newResult, ...prev]);
    } catch (error) {
      console.error("Error fetching item:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceBadge = (serverMs: number, isCacheHit: boolean) => {
    if (isCacheHit) {
      return (
        <Badge className="bg-success text-success-foreground">
          <Zap className="w-3 h-3 mr-1" />
          Cache Hit
        </Badge>
      );
    }
    return (
      <Badge className="bg-warning text-warning-foreground">
        <Database className="w-3 h-3 mr-1" />
        Cache Miss
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Spring Boot Cache Demo
          </h1>
          <p className="text-muted-foreground">
            Comprueba el rendimiento del almacenamiento en caché del backend recuperando el mismo ID de elemento varias veces.
          </p>
        </div>

        {/* Fetch Controls */}
        <Card className="p-6 border-border bg-card">
          <div className="flex gap-3">
            <Input
              type="text"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              placeholder="Enter item ID (e.g., 1)"
              className="flex-1 bg-input border-border"
              onKeyDown={(e) => e.key === "Enter" && fetchItem()}
            />
            <Button
              onClick={fetchItem}
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? "Fetching..." : "Fetch Item"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            💡 Tip: Fetch the same ID twice to see cache performance
          </p>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          {results.length === 0 && (
            <Card className="p-12 text-center border-border bg-card">
              <Database className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                No requests yet. Enter an item ID and click "Fetch Item" to start.
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
                      Request for Item #{result.item.id}
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
                    <p className="text-sm text-muted-foreground mb-1">Client Time</p>
                    <p className="text-2xl font-mono font-bold text-foreground">
                      {result.clientMs}ms
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Server Time</p>
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
                  <p className="text-sm text-muted-foreground mb-2">JSON Response:</p>
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
      </div>
    </div>
  );
};

export default CacheDemo;
