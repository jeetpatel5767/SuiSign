import { useNavigate } from "react-router-dom";
import { Agreement } from "@/types/agreement";
import AgreementStatusBadge from "./AgreementStatusBadge";
import { formatDistanceToNow } from "date-fns";

interface AgreementPlainItemProps {
  agreement: Agreement;
}

const AgreementPlainItem = ({ agreement }: AgreementPlainItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (agreement.status === "action_required") {
      navigate(`/sign/${agreement.id}`);
    }
  };

  return (
    <div
      className="group flex items-center justify-between py-3 px-4 hover:bg-muted/50 rounded-md cursor-pointer transition-colors border-b border-border last:border-0"
      onClick={handleClick}
    >
      <div className="flex items-center gap-6 flex-1 min-w-0">
        <span className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
          {agreement.name}
        </span>
        <AgreementStatusBadge status={agreement.status} />
      </div>

      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <span>{agreement.signers.length} signers</span>
        <span className="min-w-[100px] text-right">
          {formatDistanceToNow(agreement.lastUpdated, { addSuffix: true })}
        </span>
      </div>
    </div>
  );
};

export default AgreementPlainItem;
