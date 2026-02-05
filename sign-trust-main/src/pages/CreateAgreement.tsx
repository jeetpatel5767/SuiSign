import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileSignature, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import StepUploadDocument from "@/components/agreement/StepUploadDocument";
import StepAddSigners from "@/components/agreement/StepAddSigners";
import StepPlaceSignatures from "@/components/agreement/StepPlaceSignatures";
import StepReviewSettings from "@/components/agreement/StepReviewSettings";
import { Signer, SignatureField } from "@/types/agreement";

const steps = [
  { id: 1, title: "Upload & Name" },
  { id: 2, title: "Add Signers" },
  { id: 3, title: "Place Signatures" },
  { id: 4, title: "Review & Send" },
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

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSend = () => {
    // In a real app, this would save to a database
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <FileSignature className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Create Agreement</span>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentStep >= step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:block ${
                      currentStep >= step.id
                        ? "text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          {renderStep()}
        </div>
      </div>

      {/* Footer Actions */}
      <footer className="border-t border-border bg-card px-6 py-4">
        <div className="container mx-auto flex items-center justify-between max-w-4xl">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          {currentStep < 4 ? (
            <Button onClick={handleNext} disabled={!canProceed()}>
              Continue
            </Button>
          ) : (
            <Button onClick={handleSend} className="gap-2">
              Send for Signing
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default CreateAgreement;
