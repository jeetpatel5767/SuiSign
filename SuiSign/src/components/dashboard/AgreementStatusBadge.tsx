import { cn } from "@/lib/utils";
import { AgreementStatus } from "@/types/agreement";

const statusConfig: Record<AgreementStatus, { label: string; dot: string; text: string }> = {
  draft: {
    label: "Draft",
    dot: "bg-slate-400",
    text: "text-slate-500",
  },
  waiting_for_signatures: {
    label: "Pending",
    dot: "bg-amber-400",
    text: "text-amber-600",
  },
  action_required: {
    label: "Action Required",
    dot: "bg-blue-500",
    text: "text-blue-600",
  },
  completed: {
    label: "Completed",
    dot: "bg-emerald-500",
    text: "text-emerald-600",
  },
  expired: {
    label: "Expired",
    dot: "bg-gray-300",
    text: "text-gray-400",
  },
};

interface AgreementStatusBadgeProps {
  status: AgreementStatus;
  className?: string;
}

const AgreementStatusBadge = ({ status, className }: AgreementStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[11px] font-medium",
        config.text,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", config.dot)} />
      {config.label}
    </span>
  );
};

export default AgreementStatusBadge;
