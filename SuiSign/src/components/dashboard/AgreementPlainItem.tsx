import { useNavigate } from "react-router-dom";
import { Shield, FileText } from "lucide-react";
import { Agreement } from "@/types/agreement";
import AgreementStatusBadge from "./AgreementStatusBadge";
import { format, formatDistanceToNow } from "date-fns";

interface AgreementPlainItemProps {
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

const AgreementPlainItem = ({ agreement }: AgreementPlainItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (agreement.status === "action_required") {
      navigate(`/sign/${agreement.id}`);
    }
  };

  const firstSigner = agreement.signers[0];

  return (
    <div
      className="group flex items-center py-2.5 px-4 hover:bg-primary/4 cursor-pointer transition-colors border-b border-border/40 last:border-0"
      onClick={handleClick}
    >
      {/* ============ DESKTOP ROW (md+) — unchanged ============ */}
      <div className={`hidden md:block w-2 h-2 rounded-full ${statusDot[agreement.status]} mr-3 flex-shrink-0`} />

      <span className="hidden md:block flex-1 min-w-0 text-[13px] text-foreground truncate group-hover:text-primary transition-colors">
        {agreement.name}
      </span>

      <div className="hidden md:block w-[110px] flex-shrink-0">
        <AgreementStatusBadge status={agreement.status} />
      </div>

      <span className="hidden md:block w-[50px] text-center text-[12px] text-muted-foreground flex-shrink-0 tabular-nums">
        {agreement.signers.length}
      </span>

      <div className="hidden md:flex w-[24px] flex-shrink-0 justify-center">
        {agreement.requireVerification && (
          <Shield className="w-3.5 h-3.5 text-primary" />
        )}
      </div>

      <span className="hidden md:block w-[90px] text-right text-[12px] text-muted-foreground flex-shrink-0 tabular-nums">
        {format(agreement.lastUpdated, "MMM d, yyyy")}
      </span>

      {/* ============ MOBILE ROW (<md) — Drive file row style ============ */}
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

export default AgreementPlainItem;
