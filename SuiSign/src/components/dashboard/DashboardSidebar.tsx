import {
  Inbox,
  Send,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  Trash2,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarCategory } from "@/types/agreement";
import { useAgreements } from "@/contexts/AgreementContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const mainItems: { id: SidebarCategory; label: string; icon: React.ElementType }[] = [
  { id: "inbox", label: "All Agreements", icon: Inbox },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: FileText },
];

const statusItems: { id: SidebarCategory; label: string; icon: React.ElementType }[] = [
  { id: "action_required", label: "Action Required", icon: AlertCircle },
  { id: "completed", label: "Completed", icon: CheckCircle },
  { id: "expired", label: "Expired", icon: Clock },
];

const DashboardSidebar = () => {
  const { activeCategory, setActiveCategory, agreements } = useAgreements();
  const navigate = useNavigate();

  const getCategoryCount = (category: SidebarCategory): number => {
    switch (category) {
      case "inbox":
        return agreements.length;
      case "sent":
        return agreements.filter((a) => a.status === "waiting_for_signatures").length;
      case "drafts":
        return agreements.filter((a) => a.status === "draft").length;
      case "action_required":
        return agreements.filter((a) => a.status === "action_required").length;
      case "completed":
        return agreements.filter((a) => a.status === "completed").length;
      case "expired":
        return agreements.filter((a) => a.status === "expired").length;
      case "trash":
        return 0;
      default:
        return 0;
    }
  };

  const renderItem = (item: { id: SidebarCategory; label: string; icon: React.ElementType }) => {
    const Icon = item.icon;
    const count = getCategoryCount(item.id);
    const isActive = activeCategory === item.id;

    return (
      <button
        key={item.id}
        onClick={() => setActiveCategory(item.id)}
        className={cn(
          "w-full flex items-center justify-between px-2.5 py-[7px] rounded-md text-[13px] transition-colors duration-100",
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-foreground/70 hover:bg-muted hover:text-foreground font-normal"
        )}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" strokeWidth={isActive ? 2 : 1.5} />
          <span>{item.label}</span>
        </div>
        {count > 0 && (
          <span className={cn(
            "text-[11px] tabular-nums",
            isActive ? "text-primary" : "text-foreground/40"
          )}>
            {count}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className="w-56 bg-card border-r border-border h-full flex-shrink-0 flex flex-col">
      {/* Compose Button */}
      <div className="p-3 pb-1">
        <Button
          size="sm"
          onClick={() => navigate("/create-agreement")}
          className="w-full gap-1.5 h-9 text-[13px] font-medium shadow-none"
        >
          <Plus className="w-4 h-4" />
          Compose
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="px-2 pt-3 space-y-0.5">
        {mainItems.map(renderItem)}
      </nav>

      {/* Separator + Status Section */}
      <div className="px-4 pt-4 pb-1">
        <span className="text-[10px] font-medium text-foreground/30 uppercase tracking-[0.08em]">Status</span>
      </div>
      <nav className="px-2 space-y-0.5">
        {statusItems.map(renderItem)}
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Trash at bottom */}
      <nav className="px-2 pb-3 border-t border-border/50 pt-2">
        {renderItem({ id: "trash", label: "Trash", icon: Trash2 })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
