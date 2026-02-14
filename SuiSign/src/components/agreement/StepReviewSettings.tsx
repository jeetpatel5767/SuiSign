import { FileText, Shield, Calendar, Lock, Clock, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Signer, SignatureField } from "@/types/agreement";
import { format } from "date-fns";

interface StepReviewSettingsProps {
  documentName: string;
  signers: Signer[];
  signatureFields: SignatureField[];
  requireVerification: boolean;
  setRequireVerification: (value: boolean) => void;
  expiryDate: Date | undefined;
  setExpiryDate: (date: Date | undefined) => void;
}

const StepReviewSettings = ({
  documentName,
  signers,
  signatureFields,
  requireVerification,
  setRequireVerification,
  expiryDate,
  setExpiryDate,
}: StepReviewSettingsProps) => {
  const getFieldCount = (signerId: string) => {
    return signatureFields.filter((f) => f.signerId === signerId).length;
  };

  return (
    <div className="space-y-5 md:space-y-8">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1.5 md:mb-2">
          Review & Send
        </h2>
        <p className="text-sm md:text-base text-muted-foreground max-w-lg">
          Double-check everything before sending your agreement for signing.
        </p>
      </div>

      {/* Three stat cards in a row */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="bg-card border border-border rounded-xl p-3 md:p-5 text-center">
          <p className="text-2xl md:text-3xl font-semibold text-foreground tabular-nums">{signers.length}</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">Signers</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 md:p-5 text-center">
          <p className="text-2xl md:text-3xl font-semibold text-foreground tabular-nums">{signatureFields.length}</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">Fields</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-3 md:p-5 text-center">
          <p className="text-2xl md:text-3xl font-semibold text-foreground tabular-nums">1</p>
          <p className="text-xs md:text-sm text-muted-foreground mt-1">Page</p>
        </div>
      </div>

      {/* Document + Signers — two column */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Document card */}
        <div className="md:col-span-2 bg-card border border-border rounded-xl p-5 space-y-4">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Document
          </span>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{documentName}</p>
              <p className="text-xs text-muted-foreground">PDF · Ready to send</p>
            </div>
          </div>
        </div>

        {/* Signers card */}
        <div className="md:col-span-3 bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-border/50 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Signers
            </span>
            <span className="text-xs text-muted-foreground">Fields</span>
          </div>
          {signers.map((signer, i) => (
            <div
              key={signer.id}
              className={`flex items-center justify-between px-5 py-3 ${i < signers.length - 1 ? "border-b border-border/30" : ""
                }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: signer.color }}
                >
                  {signer.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{signer.role}</p>
                  <p className="text-xs text-muted-foreground">{signer.email}</p>
                </div>
              </div>
              <span className="text-sm tabular-nums text-muted-foreground">
                {getFieldCount(signer.id)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-3">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Settings
        </span>

        {/* Identity Verification */}
        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${requireVerification ? "bg-primary/10" : "bg-muted"
              }`}>
              <Lock className={`w-5 h-5 ${requireVerification ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div>
              <Label htmlFor="verification" className="text-sm font-medium text-foreground cursor-pointer">
                Identity Verification
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Signers must verify their identity before signing
              </p>
            </div>
          </div>
          <Switch
            id="verification"
            checked={requireVerification}
            onCheckedChange={setRequireVerification}
          />
        </div>

        {/* Expiry Date */}
        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${expiryDate ? "bg-amber-100 dark:bg-amber-900/30" : "bg-muted"
              }`}>
              <Clock className={`w-5 h-5 ${expiryDate ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"}`} />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground">
                Expiry Date
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                {expiryDate ? format(expiryDate, "MMMM d, yyyy") : "No deadline set (optional)"}
              </p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="text-sm h-9">
                <Calendar className="w-4 h-4 mr-2" />
                {expiryDate ? "Change" : "Set date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={expiryDate}
                onSelect={setExpiryDate}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Ready banner */}
      <div className="flex items-center gap-4 px-5 py-4 bg-emerald-50 dark:bg-emerald-900/15 border border-emerald-200/50 dark:border-emerald-800/30 rounded-xl">
        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
          <Send className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
            Ready to send
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            All {signers.length} signers will receive an email with their unique signing link.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepReviewSettings;
