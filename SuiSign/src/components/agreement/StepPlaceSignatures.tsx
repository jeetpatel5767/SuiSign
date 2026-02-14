import { useState } from "react";
import { Trash2, MousePointer2, CheckCircle } from "lucide-react";
import { Signer, SignatureField } from "@/types/agreement";
import { cn } from "@/lib/utils";

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

  const signersWithFields = new Set(signatureFields.map((f) => f.signerId));
  const allSignersHaveFields = signers.every((s) => signersWithFields.has(s.id));

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1.5 md:mb-2">
            Place Signature Fields
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg">
            Select a signer, then click on the document to place their signature field.
          </p>
        </div>
        <span className={cn(
          "text-sm px-3 py-1.5 rounded-lg tabular-nums flex-shrink-0 mt-1",
          allSignersHaveFields
            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
            : "bg-muted text-muted-foreground"
        )}>
          {signatureFields.length} field{signatureFields.length !== 1 ? "s" : ""} placed
        </span>
      </div>

      {/* Signer selection — horizontal cards above the doc */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {signers.map((signer) => {
          const fieldCount = signatureFields.filter(
            (f) => f.signerId === signer.id
          ).length;
          const isSelected = selectedSigner === signer.id;
          const hasField = fieldCount > 0;

          return (
            <button
              key={signer.id}
              onClick={() => setSelectedSigner(signer.id)}
              className={cn(
                "flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-left transition-all flex-shrink-0",
                isSelected
                  ? "border-primary/40 bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/25 bg-card"
              )}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: signer.color }}
              >
                {signer.email.charAt(0).toUpperCase() || "?"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate leading-tight">
                  {signer.role}
                </p>
                <p className="text-xs text-muted-foreground truncate">{signer.email}</p>
              </div>
              {hasField ? (
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 ml-1" />
              ) : (
                <span className="text-xs text-amber-500 flex-shrink-0 ml-1 whitespace-nowrap">
                  Needs field
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Document Preview — full width, slightly shorter on mobile */}
      <div
        className="relative bg-white dark:bg-white border border-border rounded-xl shadow-sm aspect-[8.5/9] md:aspect-[8.5/11] cursor-crosshair overflow-hidden"
        onClick={addSignatureField}
      >
        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 h-9 bg-slate-50 border-b border-slate-200 flex items-center px-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          </div>
          <span className="text-[10px] text-slate-400 ml-3">Document Preview</span>
        </div>

        {/* Mock PDF content */}
        <div className="absolute top-9 inset-x-0 bottom-0 p-10 pointer-events-none">
          <div className="space-y-3">
            <div className="h-6 bg-slate-100 rounded w-2/3" />
            <div className="h-px bg-slate-100 w-full mt-3 mb-3" />
            <div className="h-3 bg-slate-50 rounded w-full" />
            <div className="h-3 bg-slate-50 rounded w-full" />
            <div className="h-3 bg-slate-50 rounded w-5/6" />
            <div className="h-3 bg-slate-50 rounded w-full mt-5" />
            <div className="h-3 bg-slate-50 rounded w-full" />
            <div className="h-3 bg-slate-50 rounded w-4/5" />
            <div className="h-3 bg-slate-50 rounded w-full mt-5" />
            <div className="h-3 bg-slate-50 rounded w-full" />
            <div className="h-3 bg-slate-50 rounded w-3/4" />
            <div className="h-3 bg-slate-50 rounded w-full mt-5" />
            <div className="h-3 bg-slate-50 rounded w-2/3" />
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
              backgroundColor: `${getSignerColor(field.signerId)}12`,
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
              className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-destructive/10 rounded transition-opacity"
            >
              <Trash2 className="w-3 h-3 text-destructive" />
            </button>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <MousePointer2 className="w-4 h-4" />
        <p>Click anywhere on the document to add a signature field for the selected signer.</p>
      </div>
    </div>
  );
};

export default StepPlaceSignatures;
