import { FileText, Plus, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAgreements } from "@/contexts/AgreementContext";
import { Button } from "../ui/button";
import ViewModeToggle from "./ViewModeToggle";
import AgreementCard from "./AgreementCard";
import AgreementListItem from "./AgreementListItem";
import AgreementPlainItem from "./AgreementPlainItem";

const sidebarLabels: Record<string, string> = {
  inbox: "All Agreements",
  sent: "Sent",
  drafts: "Drafts",
  action_required: "Action Required",
  completed: "Completed",
  expired: "Expired",
  trash: "Trash",
};

const AgreementList = () => {
  const { filteredAgreements, viewMode, activeCategory, agreements } = useAgreements();
  const navigate = useNavigate();

  const stats = {
    total: agreements.length,
    draft: agreements.filter((a) => a.status === "draft").length,
    pending: agreements.filter((a) => a.status === "waiting_for_signatures").length,
    actionRequired: agreements.filter((a) => a.status === "action_required").length,
    completed: agreements.filter((a) => a.status === "completed").length,
  };

  const renderAgreements = () => {
    if (filteredAgreements.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="w-10 h-10 text-muted-foreground/30 mb-3" strokeWidth={1} />
          <p className="text-sm text-foreground mb-1">No agreements yet</p>
          <p className="text-xs text-muted-foreground mb-4">
            Get started by creating your first agreement.
          </p>
          <Button
            size="sm"
            onClick={() => navigate("/create-agreement")}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Create Agreement
          </Button>
        </div>
      );
    }

    switch (viewMode) {
      case "grid":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
            {filteredAgreements.map((agreement) => (
              <AgreementCard key={agreement.id} agreement={agreement} />
            ))}
          </div>
        );
      case "list":
        return (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* List header */}
            <div className="flex items-center py-2 px-4 border-b border-border bg-muted/30 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              <div className="w-2 mr-3" />
              <span className="flex-1">Name</span>
              <span className="hidden lg:block max-w-[160px] w-[160px] mr-4">Signer</span>
              <span className="hidden md:block w-[50px] text-center">Count</span>
              <span className="w-[110px]">Status</span>
              <span className="w-[24px] text-center">
                <span className="sr-only">Verified</span>
                ✓
              </span>
              <span className="w-[80px] text-right">Date</span>
              <span className="w-[20px] ml-2" />
            </div>
            {filteredAgreements.map((agreement) => (
              <AgreementListItem key={agreement.id} agreement={agreement} />
            ))}
          </div>
        );
      case "plain":
        return (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="flex items-center py-2 px-4 border-b border-border bg-muted/30 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              <div className="w-2 mr-3" />
              <span className="flex-1 min-w-0">Name</span>
              <span className="w-[110px]">Status</span>
              <span className="w-[50px] text-center">Signers</span>
              <span className="w-[24px] text-center">✓</span>
              <span className="w-[90px] text-right">Updated</span>
            </div>
            {filteredAgreements.map((agreement) => (
              <AgreementPlainItem key={agreement.id} agreement={agreement} />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex-1 p-6 overflow-auto bg-muted/20">
      {/* Stats Strip — only on inbox */}
      {activeCategory === "inbox" && (
        <div className="flex items-stretch gap-3 mb-6">
          {/* Summary card */}
          <div className="bg-card border border-border rounded-lg p-4 flex-1">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Overview</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <p className="text-3xl font-semibold text-foreground tabular-nums">{stats.total}</p>
            <p className="text-xs text-muted-foreground mt-1">Total agreements</p>
          </div>

          {/* Breakdown card */}
          <div className="bg-card border border-border rounded-lg p-4 flex-[2]">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-3">By Status</span>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Draft", value: stats.draft, color: "border-slate-300" },
                { label: "Pending", value: stats.pending, color: "border-amber-400" },
                { label: "Needs Action", value: stats.actionRequired, color: "border-blue-500" },
                { label: "Completed", value: stats.completed, color: "border-emerald-500" },
              ].map((item) => (
                <div key={item.label} className={`border-l-2 ${item.color} pl-3`}>
                  <p className="text-xl font-semibold text-foreground tabular-nums leading-none">{item.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-baseline gap-3">
          <h2 className="text-base font-medium text-foreground">
            {sidebarLabels[activeCategory]}
          </h2>
          <span className="text-xs text-muted-foreground tabular-nums">
            {filteredAgreements.length} result{filteredAgreements.length !== 1 ? 's' : ''}
          </span>
        </div>
        <ViewModeToggle />
      </div>

      {renderAgreements()}
    </div>
  );
};

export default AgreementList;
