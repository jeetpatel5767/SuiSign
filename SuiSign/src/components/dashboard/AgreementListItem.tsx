import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight, FileText } from "lucide-react";
import { Agreement } from "@/types/agreement";
import { useAgreements } from "@/contexts/AgreementContext";
import { Checkbox } from "../ui/checkbox";
import AgreementStatusBadge from "./AgreementStatusBadge";
import { format, formatDistanceToNow } from "date-fns";

import { cn } from "@/lib/utils";

interface AgreementListItemProps {
  agreement: Agreement;
}

const statusDot: Record<string, string> = {
  draft: "bg-slate-400",
  waiting_for_signatures: "bg-amber-400",
  action_required: "bg-blue-500",
  completed: "bg-emerald-500",
  expired: "bg-gray-300",
};

const statusIconBg: Record<string, string> = {
  draft: "bg-slate-100 text-slate-500",
  waiting_for_signatures: "bg-amber-50 text-amber-500",
  action_required: "bg-blue-50 text-blue-500",
  completed: "bg-emerald-50 text-emerald-500",
  expired: "bg-gray-100 text-gray-400",
};

const AgreementListItem = ({ agreement }: AgreementListItemProps) => {
  const navigate = useNavigate();
  const { toggleSelection, selectedIds } = useAgreements();

  const isSelected = selectedIds.includes(agreement.id);

  const handleClick = (e: React.MouseEvent) => {
    // If we're clicking the checkbox container, it already handles it
    if ((e.target as HTMLElement).closest('[data-checkbox]')) return;

    toggleSelection(agreement.id);
  };

  const handleDoubleClick = () => {
    if (agreement.status === "action_required") {
      navigate(`/sign/${agreement.id}`);
    }
  };

  const firstSigner = agreement.signers[0];

  return (
    <div
      className={cn(
        "group flex items-center py-2.5 px-4 cursor-pointer transition-colors border-b border-border/40 last:border-b-0",
        isSelected ? "bg-primary/8 border-l-2 border-l-primary -ml-[2px]" : "hover:bg-primary/4"
      )}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {/* Checkbox — desktop & mobile */}
      <div
        className="mr-3 flex items-center"
        data-checkbox
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => toggleSelection(agreement.id)}
          className="h-4 w-4 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
      </div>

      {/* ============ DESKTOP ROW (md+) — unchanged ============ */}
      {/* Status dot — desktop */}
      <div className={cn(
        "hidden md:block w-2 h-2 rounded-full mr-3 flex-shrink-0",
        statusDot[agreement.status]
      )} />

      <span className="hidden md:block flex-1 min-w-0 text-[13px] text-foreground truncate group-hover:text-primary transition-colors">
        {agreement.name}
      </span>

      <span className="text-[12px] text-muted-foreground truncate max-w-[160px] hidden lg:block mr-4">
        {firstSigner ? firstSigner.email : "—"}
      </span>

      <span className="text-[12px] text-muted-foreground w-[50px] text-center flex-shrink-0 hidden md:block tabular-nums">
        {agreement.signers.length}
      </span>

      <div className="hidden md:block w-[110px] flex-shrink-0">
        <AgreementStatusBadge status={agreement.status} />
      </div>

      <div className="hidden md:flex w-[24px] flex-shrink-0 justify-center">
        {agreement.requireVerification && (
          <Shield className="w-3.5 h-3.5 text-primary" />
        )}
      </div>

      <span className="hidden md:block text-[12px] text-muted-foreground w-[80px] text-right flex-shrink-0 tabular-nums">
        {format(agreement.lastUpdated, "MMM d")}
      </span>

      <ArrowRight className="hidden md:block w-3.5 h-3.5 text-muted-foreground/30 ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />

      {/* ============ MOBILE ROW (<md) — Drive file row style ============ */}
      {/* File icon */}
      <div className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 ${statusIconBg[agreement.status]}`}>
        <FileText className="w-5 h-5" strokeWidth={1.5} />
      </div>
      <div className="flex md:hidden flex-1 min-w-0 flex-col gap-0.5">
        <span className="text-[14px] text-foreground truncate font-medium leading-snug">
          {agreement.name}
        </span>
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <AgreementStatusBadge status={agreement.status} />
          <span className="text-border">·</span>
          <span className="tabular-nums truncate">
            {formatDistanceToNow(agreement.lastUpdated, { addSuffix: false })} ago
          </span>
          {agreement.requireVerification && (
            <>
              <span className="text-border">·</span>
              <Shield className="w-3 h-3 text-primary flex-shrink-0" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgreementListItem;
