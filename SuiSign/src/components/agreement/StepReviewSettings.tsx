import { FileText, Users, Shield, Calendar, CheckCircle } from "lucide-react";
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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Review & Settings
        </h2>
        <p className="text-muted-foreground">
          Review your agreement details and configure additional settings before
          sending.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">
                {documentName}
              </h3>
              <p className="text-sm text-muted-foreground">
                PDF Document • Ready to send
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Signers ({signers.length})
          </h4>
          <div className="space-y-3">
            {signers.map((signer) => (
              <div
                key={signer.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: signer.color }}
                  />
                  <div>
                    <p className="font-medium text-foreground">{signer.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {signer.email}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {getFieldCount(signer.id)} signature field
                  {getFieldCount(signer.id) !== 1 ? "s" : ""}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-6">
        <h3 className="font-semibold text-lg text-foreground">Settings</h3>

        {/* Identity Verification */}
        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Label
                htmlFor="verification"
                className="font-medium text-foreground"
              >
                Require Identity Verification
              </Label>
              <p className="text-sm text-muted-foreground">
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
        <div className="p-4 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <Label className="font-medium text-foreground">
                Expiry Date (Optional)
              </Label>
              <p className="text-sm text-muted-foreground">
                Set a deadline for signatures
              </p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                {expiryDate ? format(expiryDate, "PPP") : "Select expiry date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
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

      {/* Ready to Send */}
      <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
        <p className="text-sm text-green-700 dark:text-green-300">
          Your agreement is ready to be sent. All signers will receive an email
          notification.
        </p>
      </div>
    </div>
  );
};

export default StepReviewSettings;
