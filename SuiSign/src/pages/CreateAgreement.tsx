import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileSignature,
  ChevronLeft,
  Check,
  Upload,
  Users,
  PenTool,
  Send,
  ArrowRight,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StepUploadDocument from "@/components/agreement/StepUploadDocument";
import StepAddSigners from "@/components/agreement/StepAddSigners";
import StepPlaceSignatures from "@/components/agreement/StepPlaceSignatures";
import StepReviewSettings from "@/components/agreement/StepReviewSettings";
import { Signer, SignatureField } from "@/types/agreement";
import { cn } from "@/lib/utils";

const steps = [
  {
    id: 1,
    title: "Upload Document",
    description: "Upload a PDF and name your agreement",
    icon: Upload,
  },
  {
    id: 2,
    title: "Add Signers",
    description: "Invite people to sign the document",
    icon: Users,
  },
  {
    id: 3,
    title: "Place Fields",
    description: "Position signature fields on the document",
    icon: PenTool,
  },
  {
    id: 4,
    title: "Review & Send",
    description: "Review settings and send for signing",
    icon: Send,
  },
];

const CreateAgreement = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Form state
  const [documentName, setDocumentName] = useState("");
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [signers, setSigners] = useState<Signer[]>([
    { id: "s1", role: "Signer 1", email: "", color: "#3B82F6" },
    { id: "s2", role: "Signer 2", email: "", color: "#10B981" },
  ]);
  const [signatureFields, setSignatureFields] = useState<SignatureField[]>([]);
  const [requireVerification, setRequireVerification] = useState(false);
  const [expiryDate, setExpiryDate] = useState<Date | undefined>();

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return documentName.trim() !== "" && documentFile !== null;
      case 2:
        return signers.length > 0 && signers.every((s) => s.email.trim() !== "");
      case 3:
        return signatureFields.length >= signers.length;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "upcoming";
  };

  const getStepSummary = (stepId: number): string | null => {
    switch (stepId) {
      case 1:
        if (documentFile) return documentFile.name;
        return null;
      case 2:
        if (signers.some((s) => s.email)) {
          const filled = signers.filter((s) => s.email.trim() !== "").length;
          return `${filled} signer${filled !== 1 ? "s" : ""} added`;
        }
        return null;
      case 3:
        if (signatureFields.length > 0) return `${signatureFields.length} fields placed`;
        return null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSend = () => {
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepUploadDocument
            documentName={documentName}
            setDocumentName={setDocumentName}
            documentFile={documentFile}
            setDocumentFile={setDocumentFile}
          />
        );
      case 2:
        return <StepAddSigners signers={signers} setSigners={setSigners} />;
      case 3:
        return (
          <StepPlaceSignatures
            signers={signers}
            signatureFields={signatureFields}
            setSignatureFields={setSignatureFields}
          />
        );
      case 4:
        return (
          <StepReviewSettings
            documentName={documentName}
            signers={signers}
            signatureFields={signatureFields}
            requireVerification={requireVerification}
            setRequireVerification={setRequireVerification}
            expiryDate={expiryDate}
            setExpiryDate={setExpiryDate}
          />
        );
    }
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Slim header */}
      <header className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Dashboard
          </button>
          <div className="w-px h-5 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <FileSignature className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground">New Agreement</span>
          </div>
        </div>

        {/* Right side: live doc name preview */}
        {documentName && (
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <FileText className="w-3.5 h-3.5" />
            <span className="truncate max-w-[200px]">{documentName}</span>
          </div>
        )}
      </header>

      {/* Progress bar */}
      <div className="h-0.5 bg-border">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main layout: sidebar + content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Step Sidebar */}
        <aside className="w-64 bg-card border-r border-border flex-shrink-0 flex flex-col">
          <nav className="flex-1 p-4 pt-6 space-y-1">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const status = getStepStatus(step.id);
              const summary = getStepSummary(step.id);

              return (
                <div key={step.id}>
                  <button
                    onClick={() => {
                      if (step.id <= currentStep) setCurrentStep(step.id);
                    }}
                    className={cn(
                      "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-150",
                      status === "current"
                        ? "bg-primary/8"
                        : status === "completed"
                          ? "hover:bg-muted cursor-pointer"
                          : "opacity-50 cursor-default"
                    )}
                  >
                    {/* Step indicator */}
                    <div className={cn(
                      "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-medium mt-0.5 transition-colors",
                      status === "completed"
                        ? "bg-primary text-primary-foreground"
                        : status === "current"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    )}>
                      {status === "completed" ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Icon className="w-3.5 h-3.5" />
                      )}
                    </div>

                    {/* Step text */}
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-[13px] leading-tight",
                        status === "current" ? "font-medium text-primary" : "text-foreground"
                      )}>
                        {step.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                        {summary || step.description}
                      </p>
                    </div>
                  </button>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-0.5">
                      <div className={cn(
                        "w-px h-3",
                        status === "completed" ? "bg-primary/40" : "bg-border"
                      )} />
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Bottom: action buttons in sidebar */}
          <div className="p-4 border-t border-border space-y-2">
            {currentStep < 4 ? (
              <Button
                size="sm"
                onClick={handleNext}
                disabled={!canProceed()}
                className="w-full gap-1.5 text-[13px]"
              >
                Continue
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleSend}
                className="w-full gap-1.5 text-[13px]"
              >
                <Send className="w-3.5 h-3.5" />
                Send for Signing
              </Button>
            )}
            {currentStep > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="w-full text-[13px] text-muted-foreground"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                Previous Step
              </Button>
            )}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-auto bg-muted/20">
          <div className="max-w-4xl mx-auto px-10 py-10">
            {renderStep()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateAgreement;
