import { Bell, Search, User, ChevronDown, Settings, LogOut, HelpCircle, CheckCircle2, AlertTriangle, Info, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: "warning" | "info" | "success";
  read?: boolean;
}

interface TopBarProps {
  onMenuClick?: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification: Notification, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    // Mark as read
    setNotifications(notifications.map(n => 
      n.id === notification.id ? { ...n, read: true } : n
    ));

    // Navigate based on notification type
    if (notification.type === "warning") {
      navigate("/field-management");
    } else if (notification.type === "info") {
      navigate("/weather");
    } else if (notification.type === "success") {
      navigate("/market-analytics");
    }

    toast({
      title: notification.title,
      description: notification.message,
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({
      title: "All notifications marked as read",
      description: "You have no unread notifications",
    });
  };

  const handleLogout = async () => {
    setShowLogoutDialog(false);
    await signOut();
    navigate('/login');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      default:
        return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const handleGlobalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = globalSearchQuery.trim().toLowerCase();
    
    if (!query) {
      toast({
        title: "Search query empty",
        description: "Please enter a search term",
        variant: "destructive",
      });
      return;
    }

    // Navigate based on search query
    if (query.includes("crop") || query.includes("wheat") || query.includes("rice") || query.includes("cotton")) {
      navigate("/market-analytics");
      toast({
        title: "Searching market prices",
        description: `Showing results for "${globalSearchQuery}"`,
      });
    } else if (query.includes("scheme") || query.includes("government") || query.includes("subsidy")) {
      navigate("/gov-schemes");
      toast({
        title: "Searching government schemes",
        description: `Showing results for "${globalSearchQuery}"`,
      });
    } else if (query.includes("weather") || query.includes("rain") || query.includes("forecast")) {
      navigate("/weather");
      toast({
        title: "Opening weather",
        description: `Showing weather information`,
      });
    } else if (query.includes("community") || query.includes("forum") || query.includes("discuss")) {
      navigate("/community");
      toast({
        title: "Opening community forum",
        description: `Showing community discussions`,
      });
    } else if (query.includes("field") || query.includes("sensor") || query.includes("iot")) {
      navigate("/field-management");
      toast({
        title: "Opening field management",
        description: `Showing field and sensor data`,
      });
    } else if (query.includes("profit") || query.includes("loss") || query.includes("calculate")) {
      navigate("/profit-loss");
      toast({
        title: "Opening profit calculator",
        description: `Opening profit & loss calculator`,
      });
    } else if (query.includes("soil") || query.includes("test")) {
      navigate("/soil-test");
      toast({
        title: "Opening soil test",
        description: `Showing soil testing information`,
      });
    } else if (query.includes("calendar") || query.includes("schedule")) {
      navigate("/farming-calendar");
      toast({
        title: "Opening farming calendar",
        description: `Showing farming activities calendar`,
      });
    } else if (query.includes("rotation") || query.includes("crop rotation")) {
      navigate("/crop-rotation");
      toast({
        title: "Opening crop rotation",
        description: `Showing crop rotation planner`,
      });
    } else if (query.includes("ai") || query.includes("assistant") || query.includes("help")) {
      navigate("/ai-assistant");
      toast({
        title: "Opening AI Assistant",
        description: `AI Assistant is ready to help`,
      });
    } else {
      // Default: search in market analytics
      navigate("/market-analytics");
      toast({
        title: "Searching",
        description: `Showing results for "${globalSearchQuery}"`,
      });
    }
    
    setGlobalSearchQuery("");
  };

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-border flex items-center justify-between px-3 sm:px-4 md:px-6 sticky top-0 z-40">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden mr-2"
        onClick={onMenuClick}
      >
        <Menu className="w-5 h-5 text-muted-foreground" />
      </Button>

      {/* Search - Hidden on mobile, shown on tablet+ */}
      <form onSubmit={handleGlobalSearch} className="hidden md:block relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search crops, schemes, forum..."
          value={globalSearchQuery}
          onChange={(e) => setGlobalSearchQuery(e.target.value)}
          className="pl-10 bg-muted/30 border-transparent focus:border-primary focus:bg-white transition-all text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleGlobalSearch(e);
            }
          }}
        />
      </form>

      {/* Mobile Search Icon */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => {
          navigate("/market-analytics");
          toast({
            title: "Search",
            description: "Navigate to Market Analytics to search for crops and prices.",
          });
        }}
      >
        <Search className="w-5 h-5 text-muted-foreground" />
      </Button>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-10 w-10 sm:h-11 sm:w-11">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[calc(100vw-2rem)] sm:w-80 max-h-[80vh] overflow-y-auto">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No notifications
              </div>
            ) : (
              <>
                {notifications.map((notification) => (
                  <DropdownMenuItem 
                    key={notification.id} 
                    className={cn(
                      "flex flex-col items-start py-3 sm:py-3 cursor-pointer hover:bg-muted/50 min-h-[60px] sm:min-h-[auto]",
                      !notification.read && "bg-primary/5"
                    )}
                    onClick={(e) => handleNotificationClick(notification, e)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {getNotificationIcon(notification.type)}
                      <span className={cn("font-medium text-xs sm:text-sm flex-1", !notification.read && "font-semibold")}>
                        {notification.title}
                      </span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{notification.time}</span>
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground mt-1 ml-6 sm:ml-6 break-words">{notification.message}</span>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <div className="flex flex-col sm:flex-row gap-2 p-2">
                  {unreadCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 min-h-[44px]"
                      onClick={handleMarkAllAsRead}
                    >
                      <span className="text-xs sm:text-sm">Mark all as read</span>
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 min-h-[44px]"
                    onClick={() => navigate("/settings")}
                  >
                    <span className="text-xs sm:text-sm">View all</span>
                  </Button>
                </div>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help - Hidden on mobile */}
        <Button 
          variant="ghost" 
          size="icon"
          className="hidden sm:flex h-10 w-10 sm:h-11 sm:w-11"
          onClick={() => {
            toast({
              title: "Help & Support",
              description: "For assistance, please visit the Helpline page or contact support.",
            });
            navigate("/helpline");
          }}
        >
          <HelpCircle className="w-5 h-5 text-muted-foreground" />
        </Button>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 h-10 sm:h-11">
              <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
                <AvatarImage src={user?.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs sm:text-sm">
                  {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-xs sm:text-sm font-medium">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs text-muted-foreground hidden md:block">
                  {user?.email || 'No email'}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 sm:w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer"
              onClick={() => navigate("/settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-destructive"
              onClick={() => setShowLogoutDialog(true)}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="w-[calc(100vw-2rem)] sm:w-full max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl">Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription className="text-sm sm:text-base">
              Are you sure you want to log out? You will need to log in again to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <AlertDialogCancel className="w-full sm:w-auto min-h-[44px]">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="w-full sm:w-auto min-h-[44px] bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
