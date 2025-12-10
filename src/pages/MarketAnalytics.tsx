import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Search, Filter, Calculator, X } from "lucide-react";
import { marketPrices } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColors = {
  up: "text-success",
  down: "text-destructive",
  stable: "text-muted-foreground",
};

export default function MarketAnalytics() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("price-desc");
  
  // Profit calculator state
  const [selectedCrop, setSelectedCrop] = useState("Cotton");
  const [landArea, setLandArea] = useState([5]);
  const [inputCost, setInputCost] = useState([25000]);
  const [expectedYield, setExpectedYield] = useState([8]);

  const states = useMemo(() => {
    const uniqueStates = [...new Set(marketPrices.map(p => p.state))];
    return uniqueStates;
  }, []);

  const filteredPrices = useMemo(() => {
    let result = [...marketPrices];
    
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(p => 
        (p.crop?.toLowerCase() || "").includes(searchLower) ||
        (p.variety?.toLowerCase() || "").includes(searchLower) ||
        (p.mandi?.toLowerCase() || "").includes(searchLower) ||
        (p.state?.toLowerCase() || "").includes(searchLower)
      );
    }
    
    if (stateFilter !== "all") {
      result = result.filter(p => p.state === stateFilter);
    }
    
    switch (sortBy) {
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "change-desc":
        result.sort((a, b) => b.change - a.change);
        break;
    }
    
    return result;
  }, [search, stateFilter, sortBy]);

  const selectedCropData = marketPrices.find(p => p.crop === selectedCrop);
  const cropPrice = selectedCropData?.price || 6850;
  const totalRevenue = landArea[0] * expectedYield[0] * cropPrice;
  const totalCost = landArea[0] * inputCost[0];
  const projectedProfit = totalRevenue - totalCost;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Market Analytics</h1>
        <p className="text-muted-foreground">Live mandi prices and profit calculator</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 glass-card rounded-xl p-6"
        >
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search crops, varieties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-10"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="change-desc">Biggest Gains</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Crop</TableHead>
                  <TableHead>Variety</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Mandi</TableHead>
                  <TableHead className="text-right">Price (₹/q)</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Search className="w-8 h-8 text-muted-foreground" />
                        <p className="text-muted-foreground font-medium">No results found</p>
                        <p className="text-sm text-muted-foreground">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPrices.map((item, index) => {
                    const TrendIcon = trendIcons[item.trend as keyof typeof trendIcons];
                    return (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.05 * index }}
                        className="hover:bg-muted/30"
                      >
                        <TableCell className="font-medium">{item.crop}</TableCell>
                        <TableCell className="text-muted-foreground">{item.variety}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{item.state}</Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{item.mandi || "N/A"}</TableCell>
                        <TableCell className="text-right font-semibold">
                          ₹{item.price.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className={cn("flex items-center justify-end gap-1", trendColors[item.trend as keyof typeof trendColors])}>
                            <TrendIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">
                              {item.change > 0 ? "+" : ""}{item.change}%
                            </span>
                          </div>
                        </TableCell>
                      </motion.tr>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* Profit Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-foreground">Profit Calculator</h3>
          </div>

          <div className="space-y-6">
            {/* Crop Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Select Crop</label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[...new Set(marketPrices.map(p => p.crop))].map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Current price: ₹{cropPrice.toLocaleString()}/quintal
              </p>
            </div>

            {/* Land Area */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Land Area</label>
                <span className="text-sm text-primary font-semibold">{landArea[0]} acres</span>
              </div>
              <Slider
                value={landArea}
                onValueChange={setLandArea}
                min={1}
                max={50}
                step={1}
                className="py-2"
              />
            </div>

            {/* Input Cost */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Input Cost per Acre</label>
                <span className="text-sm text-primary font-semibold">₹{inputCost[0].toLocaleString()}</span>
              </div>
              <Slider
                value={inputCost}
                onValueChange={setInputCost}
                min={5000}
                max={100000}
                step={1000}
                className="py-2"
              />
            </div>

            {/* Expected Yield */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Expected Yield per Acre</label>
                <span className="text-sm text-primary font-semibold">{expectedYield[0]} q/acre</span>
              </div>
              <Slider
                value={expectedYield}
                onValueChange={setExpectedYield}
                min={1}
                max={20}
                step={0.5}
                className="py-2"
              />
            </div>

            {/* Results */}
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Revenue</span>
                <span className="font-semibold text-foreground">₹{totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Cost</span>
                <span className="font-semibold text-destructive">- ₹{totalCost.toLocaleString()}</span>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Projected Profit</span>
                  <span className={cn(
                    "text-2xl font-display font-bold",
                    projectedProfit >= 0 ? "text-success" : "text-destructive"
                  )}>
                    ₹{projectedProfit.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {projectedProfit >= 0 
                    ? `Profit margin: ${((projectedProfit / totalRevenue) * 100).toFixed(1)}%`
                    : "Consider reducing input costs or increasing yield"
                  }
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}