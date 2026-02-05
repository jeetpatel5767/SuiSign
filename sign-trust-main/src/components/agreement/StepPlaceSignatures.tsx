import { useState } from "react";
import { Plus, Trash2, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Signer, SignatureField } from "@/types/agreement";

interface StepPlaceSignaturesProps {
  signers: Signer[];
  signatureFields: SignatureField[];
  setSignatureFields: (fields: SignatureField[]) => void;
}

const StepPlaceSignatures = ({
  signers,
  signatureFields,
  setSignatureFields,
}: StepPlaceSignaturesProps) => {
  const [selectedSigner, setSelectedSigner] = useState<string | null>(
    signers[0]?.id || null
  );
  const [isDragging, setIsDragging] = useState(false);

  const addSignatureField = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedSigner) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newField: SignatureField = {
      id: `field-${Date.now()}`,
      signerId: selectedSigner,
      x: Math.max(0, Math.min(85, x)),
      y: Math.max(0, Math.min(90, y)),
      width: 15,
      height: 8,
      page: 1,
    };

    setSignatureFields([...signatureFields, newField]);
  };

  const removeField = (fieldId: string) => {
    setSignatureFields(signatureFields.filter((f) => f.id !== fieldId));
  };

  const getSignerColor = (signerId: string) => {
    return signers.find((s) => s.id === signerId)?.color || "#3B82F6";
  };

  const getSignerLabel = (signerId: string) => {
    return signers.find((s) => s.id === signerId)?.role || "Unknown";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Place Signature Fields
        </h2>
        <p className="text-muted-foreground">
          Select a signer and click on the document to place signature fields.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Signer Selection */}
        <div className="space-y-3">
          <h3 className="font-medium text-foreground">Signers</h3>
          <div className="space-y-2">
            {signers.map((signer) => {
              const fieldCount = signatureFields.filter(
                (f) => f.signerId === signer.id
              ).length;

              return (
                <button
                  key={signer.id}
                  onClick={() => setSelectedSigner(signer.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                    selectedSigner === signer.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: signer.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {signer.role}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {signer.email}
                    </p>
                  </div>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                    {fieldCount}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-sm text-muted-foreground pt-4 border-t border-border">
            <p className="flex items-center gap-2 mb-2">
              <Move className="w-4 h-4" />
              Click on the document to add fields
            </p>
            <p>Each signer needs at least one signature field.</p>
          </div>
        </div>

        {/* Document Preview with Signature Fields */}
        <div className="lg:col-span-3">
          <div
            className="relative bg-white border border-border rounded-lg shadow-sm aspect-[8.5/11] cursor-crosshair overflow-hidden"
            onClick={addSignatureField}
          >
            {/* Mock PDF content */}
            <div className="absolute inset-0 p-8 pointer-events-none">
              <div className="space-y-4">
                <div className="h-8 bg-muted/30 rounded w-3/4" />
                <div className="h-4 bg-muted/20 rounded w-full" />
                <div className="h-4 bg-muted/20 rounded w-full" />
                <div className="h-4 bg-muted/20 rounded w-5/6" />
                <div className="h-4 bg-muted/20 rounded w-full mt-6" />
                <div className="h-4 bg-muted/20 rounded w-full" />
                <div className="h-4 bg-muted/20 rounded w-4/5" />
                <div className="h-4 bg-muted/20 rounded w-full mt-6" />
                <div className="h-4 bg-muted/20 rounded w-full" />
                <div className="h-4 bg-muted/20 rounded w-3/4" />
              </div>
            </div>

            {/* Signature Fields */}
            {signatureFields.map((field) => (
              <div
                key={field.id}
                className="absolute border-2 rounded-md flex items-center justify-between px-2 group"
                style={{
                  left: `${field.x}%`,
                  top: `${field.y}%`,
                  width: `${field.width}%`,
                  height: `${field.height}%`,
                  borderColor: getSignerColor(field.signerId),
                  backgroundColor: `${getSignerColor(field.signerId)}15`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <span
                  className="text-xs font-medium truncate"
                  style={{ color: getSignerColor(field.signerId) }}
                >
                  {getSignerLabel(field.signerId)}
                </span>
                <button
                  onClick={() => removeField(field.id)}
                  className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/20 rounded transition-opacity"
                >
                  <Trash2 className="w-3 h-3 text-destructive" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepPlaceSignatures;
