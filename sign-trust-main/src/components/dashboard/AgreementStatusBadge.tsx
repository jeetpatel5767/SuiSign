import { cn } from "@/lib/utils";
import { AgreementStatus } from "@/types/agreement";

const statusConfig: Record<AgreementStatus, { label: string; className: string }> = {
  draft: {
    label: "Draft",
    className: "bg-muted text-muted-foreground",
  },
  waiting_for_signatures: {
    label: "Waiting for Signatures",
    className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  action_required: {
    label: "Action Required",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  expired: {
    label: "Expired",
    className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
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
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};

export default AgreementStatusBadge;
