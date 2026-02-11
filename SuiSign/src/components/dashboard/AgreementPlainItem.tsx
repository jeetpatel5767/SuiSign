import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";
import { Agreement } from "@/types/agreement";
import AgreementStatusBadge from "./AgreementStatusBadge";
import { format } from "date-fns";

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

const AgreementPlainItem = ({ agreement }: AgreementPlainItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (agreement.status === "action_required") {
      navigate(`/sign/${agreement.id}`);
    }
  };

  return (
    <div
      className="group flex items-center py-2.5 px-4 hover:bg-primary/4 cursor-pointer transition-colors border-b border-border/40 last:border-0"
      onClick={handleClick}
    >
      {/* Status dot */}
      <div className={`w-2 h-2 rounded-full ${statusDot[agreement.status]} mr-3 flex-shrink-0`} />

      {/* Name */}
      <span className="flex-1 min-w-0 text-[13px] text-foreground truncate group-hover:text-primary transition-colors">
        {agreement.name}
      </span>

      {/* Status */}
      <div className="w-[110px] flex-shrink-0">
        <AgreementStatusBadge status={agreement.status} />
      </div>

      {/* Signers */}
      <span className="w-[50px] text-center text-[12px] text-muted-foreground flex-shrink-0 tabular-nums">
        {agreement.signers.length}
      </span>

      {/* Verification */}
      <div className="w-[24px] flex-shrink-0 flex justify-center">
        {agreement.requireVerification && (
          <Shield className="w-3.5 h-3.5 text-primary" />
        )}
      </div>

      {/* Date */}
      <span className="w-[90px] text-right text-[12px] text-muted-foreground flex-shrink-0 tabular-nums">
        {format(agreement.lastUpdated, "MMM d, yyyy")}
      </span>
    </div>
  );
};

export default AgreementPlainItem;
