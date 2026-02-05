import { useNavigate } from "react-router-dom";
import { FileText, Users, Shield, ChevronRight } from "lucide-react";
import { Agreement } from "@/types/agreement";
import AgreementStatusBadge from "./AgreementStatusBadge";
import { formatDistanceToNow } from "date-fns";

interface AgreementListItemProps {
  agreement: Agreement;
}

const AgreementListItem = ({ agreement }: AgreementListItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (agreement.status === "action_required") {
      navigate(`/sign/${agreement.id}`);
    }
  };

  return (
    <div
      className="group flex items-center gap-4 p-4 bg-card border border-border rounded-lg cursor-pointer hover:shadow-soft hover:border-primary/20 transition-all"
      onClick={handleClick}
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <FileText className="w-5 h-5 text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {agreement.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(agreement.lastUpdated, { addSuffix: true })}
        </p>
      </div>

      <AgreementStatusBadge status={agreement.status} />

      <div className="flex items-center gap-1.5 text-sm text-muted-foreground min-w-[80px]">
        <Users className="w-4 h-4" />
        <span>{agreement.signers.length} signers</span>
      </div>

      {agreement.requireVerification && (
        <div className="flex items-center gap-1 text-xs text-primary min-w-[70px]">
          <Shield className="w-4 h-4" />
          <span>Verified</span>
        </div>
      )}

      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
    </div>
  );
};

export default AgreementListItem;
