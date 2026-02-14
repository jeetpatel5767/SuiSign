import { useState } from "react";
import { FileText, Plus, TrendingUp, LayoutGrid, List, ArrowDownUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAgreements } from "@/contexts/AgreementContext";
import { Button } from "../ui/button";
import ViewModeToggle from "./ViewModeToggle";
import AgreementCard from "./AgreementCard";
import AgreementListItem from "./AgreementListItem";
import AgreementPlainItem from "./AgreementPlainItem";
import { Agreement } from "@/types/agreement";
import { cn } from "@/lib/utils";
import {
  isToday,
  isYesterday,
  isThisWeek,
  isThisMonth,
  subMonths,
  isAfter,
} from "date-fns";

const sidebarLabels: Record<string, string> = {
  inbox: "All Agreements",
  sent: "Sent",
  drafts: "Drafts",
  action_required: "Action Required",
  completed: "Completed",
  expired: "Expired",
  trash: "Trash",
};

type MobileViewMode = "grid" | "list";

/** Group agreements by time period like Google Drive */
function groupByTimePeriod(agreements: Agreement[]): { label: string; items: Agreement[] }[] {
  const groups: Record<string, Agreement[]> = {
    today: [],
    yesterday: [],
    this_week: [],
    this_month: [],
    last_month: [],
    older: [],
  };

  const lastMonthStart = subMonths(new Date(), 1);

  for (const a of agreements) {
    const d = a.lastUpdated;
    if (isToday(d)) {
      groups.today.push(a);
    } else if (isYesterday(d)) {
      groups.yesterday.push(a);
    } else if (isThisWeek(d)) {
      groups.this_week.push(a);
    } else if (isThisMonth(d)) {
      groups.this_month.push(a);
    } else if (isAfter(d, lastMonthStart)) {
      groups.last_month.push(a);
    } else {
      groups.older.push(a);
    }
  }

  const labelMap: Record<string, string> = {
    today: "Today",
    yesterday: "Yesterday",
    this_week: "Earlier this week",
    this_month: "Earlier this month",
    last_month: "Last month",
    older: "Older",
  };

  return Object.entries(groups)
    .filter(([, items]) => items.length > 0)
    .map(([key, items]) => ({ label: labelMap[key], items }));
}

const AgreementList = () => {
  const { filteredAgreements, viewMode, activeCategory, agreements } = useAgreements();
  const navigate = useNavigate();
  const [mobileView, setMobileView] = useState<MobileViewMode>("grid");

  const stats = {
    total: agreements.length,
    draft: agreements.filter((a) => a.status === "draft").length,
    pending: agreements.filter((a) => a.status === "waiting_for_signatures").length,
    actionRequired: agreements.filter((a) => a.status === "action_required").length,
    completed: agreements.filter((a) => a.status === "completed").length,
  };

  const timeGroups = groupByTimePeriod(filteredAgreements);

  /* ——— Mobile renderers ——— */
  const renderMobileGrid = (items: Agreement[]) => (
    <div className="grid grid-cols-2 gap-2.5">
      {items.map((agreement) => (
        <AgreementCard key={agreement.id} agreement={agreement} />
      ))}
    </div>
  );

  const renderMobileList = (items: Agreement[]) => (
    <div className="bg-card border border-border/60 rounded-xl overflow-hidden">
      {items.map((agreement) => (
        <AgreementListItem key={agreement.id} agreement={agreement} />
      ))}
    </div>
  );

  /* ——— Desktop renderers (unchanged) ——— */
  const renderDesktopAgreements = () => {
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
            <div className="flex items-center py-2 px-4 border-b border-border bg-muted/30 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              <div className="w-2 mr-3" />
              <span className="flex-1">Name</span>
              <span className="hidden lg:block max-w-[160px] w-[160px] mr-4">Signer</span>
              <span className="w-[50px] text-center">Count</span>
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
    <div className="flex-1 overflow-auto bg-muted/20">
      {/* ============ DESKTOP CONTENT (md+) — unchanged ============ */}
      <div className="hidden md:block p-6">
        {/* Stats Strip — only on inbox */}
        {activeCategory === "inbox" && (
          <div className="flex items-stretch gap-3 mb-6">
            <div className="bg-card border border-border rounded-lg p-4 flex-1">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Overview</span>
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <p className="text-3xl font-semibold text-foreground tabular-nums">{stats.total}</p>
              <p className="text-xs text-muted-foreground mt-1">Total agreements</p>
            </div>
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

        {renderDesktopAgreements()}
      </div>

      {/* ============ MOBILE CONTENT (<md) — Drive-style ============ */}
      <div className="md:hidden px-3.5 pt-3 pb-28">
        {/* Sort bar + Grid/List toggle (like Drive) */}
        <div className="flex items-center justify-between mb-3">
          <button className="flex items-center gap-1.5 text-[13px] font-medium text-foreground">
            <ArrowDownUp className="w-3.5 h-3.5 text-muted-foreground" />
            {sidebarLabels[activeCategory]}
          </button>
          <div className="flex items-center gap-0.5 p-0.5 border border-border/60 rounded-lg bg-card/80">
            <button
              onClick={() => setMobileView("list")}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-100",
                mobileView === "list"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileView("grid")}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-100",
                mobileView === "grid"
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Empty state */}
        {filteredAgreements.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileText className="w-10 h-10 text-muted-foreground/30 mb-3" strokeWidth={1} />
            <p className="text-sm text-foreground mb-1">No agreements yet</p>
            <p className="text-xs text-muted-foreground mb-4">
              Tap + to create your first agreement.
            </p>
          </div>
        )}

        {/* Time-grouped sections (like Drive: "Earlier this week", "Last month", etc.) */}
        {timeGroups.map((group) => (
          <div key={group.label} className="mb-5">
            <h3 className="text-[13px] font-semibold text-foreground mb-2.5 px-0.5">
              {group.label}
            </h3>
            {mobileView === "grid"
              ? renderMobileGrid(group.items)
              : renderMobileList(group.items)
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgreementList;
