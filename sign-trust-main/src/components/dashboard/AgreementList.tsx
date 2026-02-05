import { FileText } from "lucide-react";
import { useAgreements } from "@/contexts/AgreementContext";
import ViewModeToggle from "./ViewModeToggle";
import AgreementCard from "./AgreementCard";
import AgreementListItem from "./AgreementListItem";
import AgreementPlainItem from "./AgreementPlainItem";

const sidebarLabels: Record<string, string> = {
  inbox: "All Agreements",
  sent: "Sent Agreements",
  drafts: "Draft Agreements",
  action_required: "Action Required",
  completed: "Completed Agreements",
  expired: "Expired Agreements",
  trash: "Trash",
};

const AgreementList = () => {
  const { filteredAgreements, viewMode, activeCategory } = useAgreements();

  const renderAgreements = () => {
    if (filteredAgreements.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No agreements found</h3>
          <p className="text-sm text-muted-foreground">
            Create a new agreement to get started.
          </p>
        </div>
      );
    }

    switch (viewMode) {
      case "grid":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredAgreements.map((agreement) => (
              <AgreementCard key={agreement.id} agreement={agreement} />
            ))}
          </div>
        );
      case "list":
        return (
          <div className="space-y-2">
            {filteredAgreements.map((agreement) => (
              <AgreementListItem key={agreement.id} agreement={agreement} />
            ))}
          </div>
        );
      case "plain":
        return (
          <div className="bg-card border border-border rounded-lg">
            {filteredAgreements.map((agreement) => (
              <AgreementPlainItem key={agreement.id} agreement={agreement} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          {sidebarLabels[activeCategory]}
        </h2>
        <ViewModeToggle />
      </div>

      {renderAgreements()}
    </div>
  );
};

export default AgreementList;
