import { ReactNode, useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>
      
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <AppSidebar mobileOpen={sidebarOpen} onMobileClose={() => setSidebarOpen(false)} />
      </div>
      
      <div className="flex-1 lg:ml-[280px] transition-all duration-300 w-full">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        <main className="p-3 sm:p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
