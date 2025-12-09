import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Calculator, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ExpenseItem {
  id: number;
  name: string;
  amount: number;
}

export default function ProfitLoss() {
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");

  const handleAddExpense = () => {
    if (newExpenseName && newExpenseAmount && parseFloat(newExpenseAmount) > 0) {
      const newExpense: ExpenseItem = {
        id: expenses.length + 1,
        name: newExpenseName,
        amount: parseFloat(newExpenseAmount),
      };
      setExpenses([...expenses, newExpense]);
      setNewExpenseName("");
      setNewExpenseAmount("");
    }
  };

  const handleRemoveExpense = (id: number) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalCostPrice = parseFloat(costPrice) || 0;
  const totalCP = totalCostPrice + totalExpenses;

  // Calculate profit/loss
  const totalSP = parseFloat(sellingPrice) || 0;
  const profitOrLoss = totalSP - totalCP;
  const isProfit = profitOrLoss >= 0;

  // Calculate percentage
  const profitLossPercent =
    totalCP > 0 ? Math.abs((profitOrLoss / totalCP) * 100).toFixed(2) : "0.00";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Profit & Loss Calculator</h1>
        <p className="text-muted-foreground">Calculate your crop profit or loss easily</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                <CardTitle>Input Details</CardTitle>
              </div>
              <CardDescription>Enter your cost and selling prices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cost Price */}
              <div>
                <Label htmlFor="cost-price">Cost Price (CP) - Total Investment (₹)</Label>
                <Input
                  id="cost-price"
                  type="number"
                  placeholder="Enter total investment amount"
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Total money spent on crop production
                </p>
              </div>

              {/* Selling Price */}
              <div>
                <Label htmlFor="selling-price">Selling Price (SP) - Total Income (₹)</Label>
                <Input
                  id="selling-price"
                  type="number"
                  placeholder="Enter total selling amount"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Total money earned from crop sale
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Expenses */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Expenses (Optional)</CardTitle>
              <CardDescription>Add extra costs like transport, storage, etc.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Expense name (e.g., Transport)"
                  value={newExpenseName}
                  onChange={(e) => setNewExpenseName(e.target.value)}
                />
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Amount (₹)"
                    value={newExpenseAmount}
                    onChange={(e) => setNewExpenseAmount(e.target.value)}
                  />
                  <Button onClick={handleAddExpense} size="icon">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {expenses.length > 0 && (
                <div className="space-y-2 pt-2 border-t">
                  {expenses.map((expense) => (
                    <div
                      key={expense.id}
                      className="flex items-center justify-between p-2 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-sm">{expense.name}</p>
                        <p className="text-xs text-muted-foreground">₹{expense.amount.toLocaleString()}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveExpense(expense.id)}
                        className="h-8 w-8"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Total Additional Expenses:</span>
                      <span className="font-semibold">₹{totalExpenses.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Output Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Results Card */}
          <Card className={cn(
            "border-2",
            isProfit ? "border-success/50 bg-success/5" : "border-destructive/50 bg-destructive/5"
          )}>
            <CardHeader>
              <div className="flex items-center gap-2">
                {isProfit ? (
                  <TrendingUp className="w-5 h-5 text-success" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-destructive" />
                )}
                <CardTitle>Calculation Results</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Total Cost Price */}
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">Total Cost Price (CP):</span>
                <span className="font-semibold text-lg">₹{totalCP.toLocaleString()}</span>
              </div>

              {/* Total Selling Price */}
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">Total Selling Price (SP):</span>
                <span className="font-semibold text-lg">₹{totalSP.toLocaleString()}</span>
              </div>

              {/* Profit/Loss Amount */}
              <div className={cn(
                "flex justify-between items-center p-4 rounded-lg border-2",
                isProfit ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"
              )}>
                <span className="font-medium">
                  {isProfit ? "Profit Amount:" : "Loss Amount:"}
                </span>
                <span className={cn(
                  "font-bold text-2xl",
                  isProfit ? "text-success" : "text-destructive"
                )}>
                  {isProfit ? "+" : "-"}₹{Math.abs(profitOrLoss).toLocaleString()}
                </span>
              </div>

              {/* Profit/Loss Percentage */}
              <div className={cn(
                "flex justify-between items-center p-4 rounded-lg border-2",
                isProfit ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"
              )}>
                <span className="font-medium">
                  {isProfit ? "Profit Percentage:" : "Loss Percentage:"}
                </span>
                <span className={cn(
                  "font-bold text-2xl",
                  isProfit ? "text-success" : "text-destructive"
                )}>
                  {isProfit ? "+" : "-"}{profitLossPercent}%
                </span>
              </div>

              {/* Final Result Message */}
              <div className={cn(
                "p-6 rounded-lg text-center border-2",
                isProfit ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"
              )}>
                <p className="text-sm text-muted-foreground mb-2">Final Result</p>
                <p className={cn(
                  "text-2xl font-bold",
                  isProfit ? "text-success" : "text-destructive"
                )}>
                  {isProfit ? (
                    <>You made a <span className="text-success">PROFIT</span> of ₹{Math.abs(profitOrLoss).toLocaleString()} ({profitLossPercent}%)</>
                  ) : (
                    <>You made a <span className="text-destructive">LOSS</span> of ₹{Math.abs(profitOrLoss).toLocaleString()} ({profitLossPercent}%)</>
                  )}
                </p>
              </div>

              {/* Formula Display */}
              <div className="p-4 bg-muted/30 rounded-lg space-y-2 text-sm">
                <p className="font-medium">Calculation Formula:</p>
                <div className="space-y-1 text-muted-foreground">
                  <p>Total CP = Cost Price + Additional Expenses</p>
                  <p>Total CP = ₹{totalCostPrice.toLocaleString()} + ₹{totalExpenses.toLocaleString()} = ₹{totalCP.toLocaleString()}</p>
                  <p className="pt-2">
                    {isProfit ? "Profit" : "Loss"} = SP - CP = ₹{totalSP.toLocaleString()} - ₹{totalCP.toLocaleString()} = {isProfit ? "+" : "-"}₹{Math.abs(profitOrLoss).toLocaleString()}
                  </p>
                  <p className="pt-2">
                    {isProfit ? "Profit" : "Loss"}% = ({isProfit ? "Profit" : "Loss"} / CP) × 100 = ({Math.abs(profitOrLoss).toLocaleString()} / {totalCP.toLocaleString()}) × 100 = {profitLossPercent}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Summary */}
          {(totalCP > 0 || totalSP > 0) && (
            <Card>
              <CardHeader>
                <CardTitle>Quick Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base Investment:</span>
                    <span className="font-medium">₹{totalCostPrice.toLocaleString()}</span>
                  </div>
                  {totalExpenses > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Additional Expenses:</span>
                      <span className="font-medium">₹{totalExpenses.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t">
                    <span className="font-semibold">Total Investment:</span>
                    <span className="font-bold">₹{totalCP.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Total Income:</span>
                    <span className="font-bold text-success">₹{totalSP.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
