import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight } from "lucide-react";
import { Agreement } from "@/types/agreement";
import AgreementStatusBadge from "./AgreementStatusBadge";
import { format } from "date-fns";

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

const AgreementListItem = ({ agreement }: AgreementListItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (agreement.status === "action_required") {
      navigate(`/sign/${agreement.id}`);
    }
  };

  const firstSigner = agreement.signers[0];

  return (
    <div
      className="group flex items-center py-2.5 px-4 hover:bg-primary/4 cursor-pointer transition-colors border-b border-border/40 last:border-b-0"
      onClick={handleClick}
    >
      {/* Status dot */}
      <div className={`w-2 h-2 rounded-full ${statusDot[agreement.status]} mr-3 flex-shrink-0`} />

      {/* Name */}
      <span className="flex-1 min-w-0 text-[13px] text-foreground truncate group-hover:text-primary transition-colors">
        {agreement.name}
      </span>

      {/* First signer */}
      <span className="text-[12px] text-muted-foreground truncate max-w-[160px] hidden lg:block mr-4">
        {firstSigner ? firstSigner.email : "—"}
      </span>

      {/* Signer count */}
      <span className="text-[12px] text-muted-foreground w-[50px] text-center flex-shrink-0 hidden md:block tabular-nums">
        {agreement.signers.length}
      </span>

      {/* Status */}
      <div className="w-[110px] flex-shrink-0">
        <AgreementStatusBadge status={agreement.status} />
      </div>

      {/* Verification */}
      <div className="w-[24px] flex-shrink-0 flex justify-center">
        {agreement.requireVerification && (
          <Shield className="w-3.5 h-3.5 text-primary" />
        )}
      </div>

      {/* Date */}
      <span className="text-[12px] text-muted-foreground w-[80px] text-right flex-shrink-0 tabular-nums">
        {format(agreement.lastUpdated, "MMM d")}
      </span>

      {/* Arrow on hover */}
      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/30 ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </div>
  );
};

export default AgreementListItem;
