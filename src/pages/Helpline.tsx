import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PhoneCall, Search, Globe, MapPin, Info, X } from "lucide-react";
import { helplines } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

  const stateCount = helplines.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 via-red-500 to-orange-500 text-white shadow-xl">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,#fff,transparent_40%)]" />
        <div className="relative p-6 sm:p-8 text-center">
          <PhoneCall className="h-10 w-10 mx-auto mb-3 text-white/90" />
          <h1 className="text-3xl font-display font-bold">AI Smart Helpline</h1>
          <p className="text-white/80 mt-1">24/7 AI support & state-wise agriculture helpline numbers</p>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="glass-card frosted-border rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search helplines by state, category or number..."
              className="pl-10 pr-10 bg-card/70 border border-white/15 rounded-full"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{stateCount} States & UTs covered</span>
          </div>
        </div>
      </div>

      {/* AI Helpline Feature Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card frosted-border rounded-2xl p-5 border border-accent/30 bg-gradient-to-br from-accent/10 to-cyan-500/5"
      >
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
            <Info className="h-6 w-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">AI Smart Helpline</h3>
            <p className="text-sm text-muted-foreground mb-3">Get instant AI-powered answers to your farming questions in Hindi, English, and regional languages.</p>
            <Button className="bg-accent hover:bg-accent/90">
              <PhoneCall className="h-4 w-4 mr-2" />
              Call 1800-180-1551 (Toll Free)
            </Button>
          </div>
        </div>
      </motion.div>

      {/* State-wise Helplines */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">{filtered.length} State Helplines</h2>
        {filtered.map((entry, index) => (
          <motion.div
            key={entry.state}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * index }}
            className="glass-card frosted-border rounded-2xl p-5 border"
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{entry.state}</h3>
                  <Badge variant="outline" className="text-xs mt-1">{entry.category}</Badge>
                </div>
              </div>
              {entry.website && (
                <a
                  href={`https://${entry.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  <Globe className="h-4 w-4" />
                  {entry.website}
                </a>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {entry.numbers.map((num) => (
                <Button
                  key={num}
                  asChild
                  variant="outline"
                  className="bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-foreground"
                >
                  <a href={`tel:${num.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4 text-emerald-600" />
                    {num}
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
