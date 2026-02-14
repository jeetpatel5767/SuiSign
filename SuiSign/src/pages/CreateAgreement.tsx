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
  X,
  Sparkles,
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
    shortTitle: "Upload",
    description: "Upload a PDF and name your agreement",
    icon: Upload,
  },
  {
    id: 2,
    title: "Add Signers",
    shortTitle: "Signers",
    description: "Invite people to sign the document",
    icon: Users,
  },
  {
    id: 3,
    title: "Place Fields",
    shortTitle: "Fields",
    description: "Position signature fields on the document",
    icon: PenTool,
  },
  {
    id: 4,
    title: "Review & Send",
    shortTitle: "Send",
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
  const currentStepData = steps.find((s) => s.id === currentStep)!;
  const CurrentIcon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ============ DESKTOP HEADER (md+) — unchanged ============ */}
      <header className="hidden md:flex h-14 border-b border-border bg-card px-4 items-center justify-between">
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
        {documentName && (
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
            <FileText className="w-3.5 h-3.5" />
            <span className="truncate max-w-[200px]">{documentName}</span>
          </div>
        )}
      </header>

      {/* ============ MOBILE HEADER (<md) — modern gradient ============ */}
      <div className="md:hidden">
        {/* Top bar */}
        <header className="relative h-14 px-3 flex items-center gap-3 bg-card z-10">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors flex-shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0" />
          <button
            onClick={() => navigate("/dashboard")}
            className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Hero step banner — colorful, bold */}
        <div className="relative px-5 pb-5 pt-1 bg-card">
          {/* Progress bar — thin gradient */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-muted/50">
            <div
              className="h-full bg-gradient-to-r from-primary via-primary to-primary/60 transition-all duration-700 ease-out rounded-r-full"
              style={{ width: `${Math.max(5, ((currentStep) / steps.length) * 100)}%` }}
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Big animated step icon */}
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <CurrentIcon className="w-6 h-6 text-primary" />
              </div>
              {/* Step counter badge */}
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-sm shadow-primary/30">
                {currentStep}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-primary uppercase tracking-wider mb-0.5">
                Step {currentStep} of {steps.length}
              </p>
              <h1 className="text-[18px] font-bold text-foreground leading-tight">
                {currentStepData.title}
              </h1>
              <p className="text-[12px] text-muted-foreground mt-0.5 leading-snug">
                {currentStepData.description}
              </p>
            </div>
          </div>

          {/* Step pills — horizontal mini progress */}
          <div className="flex items-center gap-1.5 mt-4">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    if (step.id <= currentStep) setCurrentStep(step.id);
                  }}
                  className="flex-1 relative"
                >
                  <div
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-500",
                      status === "completed"
                        ? "bg-primary"
                        : status === "current"
                          ? "bg-primary shadow-sm shadow-primary/40"
                          : "bg-muted"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop progress bar */}
      <div className="hidden md:block h-0.5 bg-border">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main layout: sidebar + content */}
      <div className="flex-1 flex overflow-hidden">
        {/* ============ DESKTOP SIDEBAR (md+) — unchanged ============ */}
        <aside className="hidden md:flex w-64 bg-card border-r border-border flex-shrink-0 flex-col">
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
          {/* Desktop content padding */}
          <div className="hidden md:block max-w-4xl mx-auto px-10 py-10">
            {renderStep()}
          </div>
          {/* Mobile content — airy padding, extra bottom for action bar */}
          <div className="md:hidden px-4 py-5 pb-32">
            {renderStep()}
          </div>
        </main>
      </div>

      {/* ============ MOBILE BOTTOM ACTION BAR (<md) — frosted glass ============ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-card/80 backdrop-blur-xl border-t border-border/50 px-4 py-3">
          <div className="flex items-center gap-2.5">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="w-11 h-11 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors flex-shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={cn(
                  "flex-1 h-12 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-200",
                  canProceed()
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 active:scale-[0.98]"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                )}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSend}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform duration-100"
              >
                <Sparkles className="w-4 h-4" />
                Send for Signing
              </button>
            )}
          </div>
          {/* Safe area for phones with home indicator */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </div>
    </div>
  );
};

export default CreateAgreement;
