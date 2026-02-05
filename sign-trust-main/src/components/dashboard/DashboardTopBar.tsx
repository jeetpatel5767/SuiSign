import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileSignature, Search, Plus, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-soft">
          <FileSignature className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-foreground">SuiSign</span>
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search agreements by name, signer, status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <Button onClick={() => navigate("/create-agreement")} className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Agreement
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="focus:outline-none">
              <Avatar className="w-9 h-9 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <User className="w-4 h-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Settings className="w-4 h-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="gap-2 cursor-pointer text-destructive focus:text-destructive"
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
