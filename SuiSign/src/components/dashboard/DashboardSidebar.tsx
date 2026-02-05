import { 
  Inbox, 
  Send, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Trash2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarCategory } from "@/types/agreement";
import { useAgreements } from "@/contexts/AgreementContext";

const sidebarItems: { id: SidebarCategory; label: string; icon: React.ElementType }[] = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "sent", label: "Sent", icon: Send },
  { id: "drafts", label: "Drafts", icon: FileText },
  { id: "action_required", label: "Action Required", icon: AlertCircle },
  { id: "completed", label: "Completed", icon: CheckCircle },
  { id: "expired", label: "Expired", icon: Clock },
  { id: "trash", label: "Trash", icon: Trash2 },
];

const DashboardSidebar = () => {
  const { activeCategory, setActiveCategory, agreements } = useAgreements();

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

  return (
    <aside className="w-64 bg-card border-r border-border h-full flex-shrink-0">
      <nav className="p-4 space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const count = getCategoryCount(item.id);
          const isActive = activeCategory === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveCategory(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {count > 0 && (
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
