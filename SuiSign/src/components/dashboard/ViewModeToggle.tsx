import { LayoutGrid, List, AlignJustify } from "lucide-react";
import { cn } from "@/lib/utils";
import { ViewMode } from "@/types/agreement";
import { useAgreements } from "@/contexts/AgreementContext";

const viewModes: { id: ViewMode; icon: React.ElementType }[] = [
  { id: "grid", icon: LayoutGrid },
  { id: "list", icon: List },
  { id: "plain", icon: AlignJustify },
];

const ViewModeToggle = () => {
  const { viewMode, setViewMode } = useAgreements();

  return (
    <div className="flex items-center gap-0.5 p-0.5 border border-border rounded-md bg-card">
      {viewModes.map((mode) => {
        const Icon = mode.icon;
        const isActive = viewMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => setViewMode(mode.id)}
            className={cn(
              "flex items-center justify-center w-7 h-7 rounded-[3px] transition-colors duration-100",
              isActive
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
};

export default ViewModeToggle;
