import { useNavigate } from "react-router-dom";
import { Shield, MoreVertical, FileText as FileIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Agreement } from "@/types/agreement";
import { useAgreements } from "@/contexts/AgreementContext";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import AgreementStatusBadge from "./AgreementStatusBadge";
import { format, formatDistanceToNow } from "date-fns";
import { Clock, ArrowRight } from "lucide-react";

interface AgreementCardProps {
  agreement: Agreement;
}

const statusAccent: Record<string, string> = {
  draft: "border-l-slate-300",
  waiting_for_signatures: "border-l-amber-400",
  action_required: "border-l-blue-500",
  completed: "border-l-emerald-500",
  expired: "border-l-gray-300",
};

/* Mobile: status → icon background + text color */
const statusTheme: Record<string, { bg: string; iconBg: string; iconColor: string }> = {
  draft: { bg: "bg-slate-50", iconBg: "bg-slate-200/60", iconColor: "text-slate-500" },
  waiting_for_signatures: { bg: "bg-amber-50/60", iconBg: "bg-amber-200/50", iconColor: "text-amber-600" },
  action_required: { bg: "bg-blue-50/60", iconBg: "bg-blue-200/50", iconColor: "text-blue-600" },
  completed: { bg: "bg-emerald-50/60", iconBg: "bg-emerald-200/50", iconColor: "text-emerald-600" },
  expired: { bg: "bg-gray-50", iconBg: "bg-gray-200/60", iconColor: "text-gray-400" },
};

const AgreementCard = ({ agreement }: AgreementCardProps) => {
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

  const displaySigners = agreement.signers.slice(0, 3);
  const remaining = agreement.signers.length - 3;
  const theme = statusTheme[agreement.status];

  return (
    <>
      {/* ============ DESKTOP CARD (md+) — Original unchanged ============ */}
      <Card
        className={cn(
          "hidden md:block group cursor-pointer border-l-[3px] transition-all duration-150 relative",
          statusAccent[agreement.status],
          isSelected ? "bg-primary/5 ring-2 ring-primary/20" : "hover:shadow-soft"
        )}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {/* Selection Checkbox (Desktop) */}
        <div
          className={cn(
            "absolute top-3 left-3 z-10 transition-opacity",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
          data-checkbox
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleSelection(agreement.id)}
            className="h-4 w-4 border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
        </div>

        <CardContent className="p-4 pt-8">
          <div className="flex items-center justify-between mb-2.5">
            <AgreementStatusBadge status={agreement.status} />
            <div className="flex items-center gap-2">
              {agreement.requireVerification && (
                <span className="text-[10px] text-primary flex items-center gap-0.5 bg-primary/5 px-1.5 py-0.5 rounded">
                  <Shield className="w-3 h-3" />
                  Verified
                </span>
              )}
            </div>
          </div>

          <h3 className="text-[13px] font-medium text-foreground leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {agreement.name}
          </h3>

          <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-3">
            <span>Updated {formatDistanceToNow(agreement.lastUpdated, { addSuffix: false })} ago</span>
            {agreement.expiryDate && (
              <>
                <span className="text-border">·</span>
                <span className="flex items-center gap-0.5 text-amber-600">
                  <Clock className="w-3 h-3" />
                  Expires {format(agreement.expiryDate, "MMM d")}
                </span>
              </>
            )}
          </div>

          <div className="border-t border-border/50 pt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {displaySigners.map((signer, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-card flex items-center justify-center text-[9px] font-medium"
                      style={{ backgroundColor: signer.color + '20', color: signer.color }}
                      title={`${signer.role}: ${signer.email}`}
                    >
                      {signer.email.charAt(0).toUpperCase()}
                    </div>
                  ))}
                  {remaining > 0 && (
                    <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[9px] font-medium text-muted-foreground">
                      +{remaining}
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {agreement.signers.length} signer{agreement.signers.length !== 1 && 's'}
                </span>
              </div>
              {agreement.status === "action_required" && (
                <span className="text-[11px] text-primary font-medium flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Sign <ArrowRight className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ============ MOBILE CARD (<md) — Google Drive style ============ */}
      <div
        className={cn(
          "md:hidden group cursor-pointer bg-card border rounded-2xl overflow-hidden shadow-sm relative",
          isSelected ? "border-primary ring-1 ring-primary/20" : "border-border/60 active:scale-[0.97] transition-transform duration-100"
        )}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {/* Selection Checkbox (Mobile) */}
        <div
          className={cn(
            "absolute top-3 left-3 z-10 transition-opacity",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
          data-checkbox
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => toggleSelection(agreement.id)}
            className="h-4 w-4 border-primary bg-white data-[state=checked]:bg-primary"
          />
        </div>
        {/* Top row: icon + title + 3-dot menu (like Drive) */}
        <div className="flex items-start gap-2.5 px-3 pt-3 pb-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${theme.iconBg}`}>
            <FileIcon className={`w-4 h-4 ${theme.iconColor}`} strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h3 className="text-[13px] font-semibold text-foreground leading-tight line-clamp-2">
              {agreement.name}
            </h3>
          </div>
          <button
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted -mr-1 -mt-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Large preview / thumbnail area (like Drive) */}
        <div className={`mx-2.5 mb-2.5 rounded-xl ${theme.bg} h-28 relative overflow-hidden`}>
          {/* Document preview visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-[85%] space-y-2 px-4">
              {/* Fake document lines */}
              <div className="h-1.5 bg-foreground/[0.06] rounded-full w-[70%]" />
              <div className="h-1.5 bg-foreground/[0.06] rounded-full w-full" />
              <div className="h-1.5 bg-foreground/[0.06] rounded-full w-[85%]" />
              <div className="h-1.5 bg-foreground/[0.06] rounded-full w-[60%]" />
              <div className="h-1.5 bg-foreground/[0.06] rounded-full w-[90%]" />
            </div>
          </div>

          {/* Signer avatars overlay (bottom-right) */}
          {agreement.signers.length > 0 && (
            <div className="absolute bottom-2 right-2.5 flex -space-x-1.5">
              {agreement.signers.slice(0, 2).map((signer, i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-card/80 flex items-center justify-center text-[9px] font-semibold shadow-sm"
                  style={{ backgroundColor: signer.color + '25', color: signer.color }}
                >
                  {signer.email.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
          )}

          {/* Verified badge */}
          {agreement.requireVerification && (
            <div className="absolute top-2 right-2.5">
              <Shield className="w-3.5 h-3.5 text-primary/70" />
            </div>
          )}

          {/* Status accent bar at bottom */}
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${agreement.status === "draft" ? "bg-slate-300" :
            agreement.status === "waiting_for_signatures" ? "bg-amber-400" :
              agreement.status === "action_required" ? "bg-blue-500" :
                agreement.status === "completed" ? "bg-emerald-500" :
                  "bg-gray-300"
            }`} />
        </div>
      </div>
    </>
  );
};

export default AgreementCard;
