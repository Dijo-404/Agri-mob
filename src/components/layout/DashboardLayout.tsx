import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      <div className="mesh-overlay" />
      <div className="pointer-events-none absolute inset-0 grid-sheen" />
      <AppSidebar />
      <div className="flex-1 ml-[280px] transition-all duration-300 relative">
        <TopBar />
        <main className="p-6 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-6">{children}</main>
      </div>
    </div>
  );
}