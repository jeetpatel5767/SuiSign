import { useNavigate } from "react-router-dom";
import { FileText, Users, Shield, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Agreement } from "@/types/agreement";
import AgreementStatusBadge from "./AgreementStatusBadge";
import { formatDistanceToNow } from "date-fns";

interface AgreementCardProps {
  agreement: Agreement;
}

const AgreementCard = ({ agreement }: AgreementCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (agreement.status === "action_required") {
      navigate(`/sign/${agreement.id}`);
    }
  };

  return (
    <Card
      className="group cursor-pointer hover:shadow-elevated hover:-translate-y-0.5 transition-all duration-200"
      onClick={handleClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {agreement.name}
              </h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDistanceToNow(agreement.lastUpdated, { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AgreementStatusBadge status={agreement.status} />
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span>{agreement.signers.length} signers</span>
            </div>
          </div>
          {agreement.requireVerification && (
            <div className="flex items-center gap-1 text-xs text-primary">
              <Shield className="w-3.5 h-3.5" />
              <span>Verified</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgreementCard;
