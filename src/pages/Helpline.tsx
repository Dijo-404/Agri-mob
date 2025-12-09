import { useMemo, useState } from "react";
import { PhoneCall, Search, Info } from "lucide-react";
import { helplines } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Helpline() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return helplines.filter(
      (h) =>
        h.state.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q) ||
        h.numbers.some((n) => n.includes(q))
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="glass-card frosted-border rounded-2xl p-6 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Support</p>
            <h1 className="text-2xl font-display font-semibold text-foreground">AI Smart Helpline</h1>
            <p className="text-sm text-muted-foreground">24/7 assistance and state-wise numbers</p>
          </div>
          <PhoneCall className="h-6 w-6 text-accent" />
        </div>
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search helplines by state, category or number..."
            className="pl-10 pr-4 bg-card/70 border border-white/15 rounded-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((entry) => (
          <div key={entry.state} className="glass-card frosted-border rounded-2xl p-5 border">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{entry.category}</p>
                <h3 className="text-lg font-semibold text-foreground">{entry.state}</h3>
              </div>
              {entry.website && (
                <a href={`https://${entry.website}`} target="_blank" rel="noreferrer" className="pill">
                  <Info className="h-4 w-4" />
                  {entry.website}
                </a>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {entry.numbers.map((num) => (
                <Button key={num} asChild variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-foreground">
                  <a href={`tel:${num.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4" />
                    {num}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
