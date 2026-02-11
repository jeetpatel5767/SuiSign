import { useNavigate } from "react-router-dom";
import { FileSignature, Search, Bell, User, Settings, LogOut, HelpCircle } from "lucide-react";
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

  return (
    <header className="h-14 border-b border-border bg-card px-4 flex items-center gap-4">
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity mr-2"
      >
        <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
          <FileSignature className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="text-sm font-semibold text-foreground">SuiSign</span>
      </button>

      {/* Search Bar - takes remaining space */}
      <div className="flex-1 max-w-xl">
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

      {/* Right side - icon buttons + avatar */}
      <div className="flex items-center gap-1 ml-auto">
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
    </header>
  );
};

export default DashboardTopBar;
