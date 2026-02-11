import { useNavigate } from "react-router-dom";
import { Shield, ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Agreement } from "@/types/agreement";
import AgreementStatusBadge from "./AgreementStatusBadge";
import { format, formatDistanceToNow } from "date-fns";

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

const AgreementCard = ({ agreement }: AgreementCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (agreement.status === "action_required") {
      navigate(`/sign/${agreement.id}`);
    }
  };

  // Show first 3 signer initials with their roles
  const displaySigners = agreement.signers.slice(0, 3);
  const remaining = agreement.signers.length - 3;

  return (
    <Card
      className={`group cursor-pointer border-l-[3px] ${statusAccent[agreement.status]} hover:shadow-soft transition-all duration-150`}
      onClick={handleClick}
    >
      <CardContent className="p-4">
        {/* Top: Status + Verification */}
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

        {/* Title */}
        <h3 className="text-[13px] font-medium text-foreground leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2">
          {agreement.name}
        </h3>

        {/* Meta: date + expiry */}
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

        {/* Divider */}
        <div className="border-t border-border/50 pt-3">
          {/* Signers */}
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

            {/* Action hint for actionable items */}
            {agreement.status === "action_required" && (
              <span className="text-[11px] text-primary font-medium flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                Sign <ArrowRight className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgreementCard;
