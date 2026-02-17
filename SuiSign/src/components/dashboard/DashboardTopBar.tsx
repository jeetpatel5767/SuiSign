import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileSignature, Search, Bell, User, Settings, LogOut, HelpCircle, X } from "lucide-react";
import Logo from "@/assets/Logo.png";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAgreements } from "@/contexts/AgreementContext";

const DashboardTopBar = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useAgreements();
  const [mobileSearchFocused, setMobileSearchFocused] = useState(false);

  return (
    <header className="h-14 border-b border-border bg-card px-4 flex items-center gap-4">
      {/* ============ DESKTOP LAYOUT (md+) ============ */}
      {/* Logo — hidden on mobile */}
      <button
        onClick={() => navigate("/")}
        className="hidden md:flex items-center gap-2 hover:opacity-80 transition-opacity mr-2"
      >
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center overflow-hidden">
          <img src={Logo} alt="SuiSign Logo" className="w-6 h-6 object-contain" />
        </div>
        <span className="text-sm font-semibold text-foreground">SuiSign</span>
      </button>

      {/* Desktop Search Bar */}
      <div className="hidden md:block flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search agreements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-8 text-[13px] bg-muted/40 border border-border/50 focus-visible:ring-1 focus-visible:ring-primary/30 focus-visible:border-primary/30 placeholder:text-muted-foreground/50 rounded-md"
          />
        </div>
      </div>

      {/* Desktop right side — icon buttons + avatar */}
      <div className="hidden md:flex items-center gap-1 ml-auto">
        <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" title="Help">
          <HelpCircle className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative" title="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
        </button>

        <div className="w-px h-5 bg-border mx-1" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <Avatar className="w-7 h-7 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer text-[13px]">
              <User className="w-4 h-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer text-[13px]">
              <Settings className="w-4 h-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 cursor-pointer text-[13px] text-destructive focus:text-destructive"
              onClick={() => navigate("/")}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ============ MOBILE LAYOUT (<md) — Google Drive style ============ */}
      {/* Mobile Avatar (left) */}
      <div className="flex md:hidden items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer text-[13px]">
              <User className="w-4 h-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer text-[13px]">
              <Settings className="w-4 h-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 cursor-pointer text-[13px] text-destructive focus:text-destructive"
              onClick={() => navigate("/")}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile Search Pill (center) — Drive style */}
      <div className="flex md:hidden flex-1">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search in SuiSign"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-sm bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary/30 placeholder:text-muted-foreground/60 rounded-full shadow-sm"
          />
        </div>
      </div>

      {/* Mobile Bell (right) */}
      <button className="flex md:hidden w-9 h-9 rounded-full items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative flex-shrink-0" title="Notifications">
        <Bell className="w-[18px] h-[18px]" />
        <span className="absolute top-1 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-card" />
      </button>
    </header>
  );
};

export default DashboardTopBar;
