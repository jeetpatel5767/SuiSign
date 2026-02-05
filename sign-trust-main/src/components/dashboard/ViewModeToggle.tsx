import { LayoutGrid, List, AlignJustify } from "lucide-react";
import { cn } from "@/lib/utils";
import { ViewMode } from "@/types/agreement";
import { useAgreements } from "@/contexts/AgreementContext";

const viewModes: { id: ViewMode; label: string; icon: React.ElementType }[] = [
  { id: "grid", label: "Grid", icon: LayoutGrid },
  { id: "list", label: "List", icon: List },
  { id: "plain", label: "Plain", icon: AlignJustify },
];

const ViewModeToggle = () => {
  const { viewMode, setViewMode } = useAgreements();

  return (
    <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
      {viewModes.map((mode) => {
        const Icon = mode.icon;
        const isActive = viewMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
            title={mode.label}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ViewModeToggle;
