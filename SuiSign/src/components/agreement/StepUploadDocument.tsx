import { Upload, FileText, X, CheckCircle, Info } from "lucide-react";
import { Input } from "@/components/ui/input";

interface StepUploadDocumentProps {
  documentName: string;
  setDocumentName: (name: string) => void;
  documentFile: File | null;
  setDocumentFile: (file: File | null) => void;
}

const StepUploadDocument = ({
  documentName,
  setDocumentName,
  documentFile,
  setDocumentFile,
}: StepUploadDocumentProps) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setDocumentFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentFile(file);
    }
  };

  return (
    <div className="space-y-10">
      {/* Section header — bigger, more commanding */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Upload & Name Your Document
        </h2>
        <p className="text-base text-muted-foreground max-w-lg">
          Start by giving your agreement a name and uploading the PDF that needs to be signed.
        </p>
      </div>

      {/* Agreement Name — full width, prominent */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground block">
          Agreement Name
        </label>
        <Input
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          placeholder="e.g., Series A Investment Agreement"
          className="h-11 text-base max-w-xl"
        />
        <p className="text-xs text-muted-foreground mt-1">
          This name will be visible to all signers in their email and signing page.
        </p>
      </div>

      {/* Upload Area — taller, more inviting */}
      <div>
        <label className="text-sm font-medium text-foreground block mb-2">
          Document File
        </label>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`border rounded-xl transition-all ${documentFile
              ? "border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/10 p-6"
              : "border-dashed border-border hover:border-primary/40 hover:bg-primary/3 cursor-pointer p-10"
            }`}
        >
          {documentFile ? (
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-foreground truncate">
                  {documentFile.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(documentFile.size / 1024 / 1024).toFixed(2)} MB · PDF Document
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDocumentFile(null);
                }}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                <Upload className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-base text-foreground font-medium mb-1">
                  Drag and drop your PDF here
                </p>
                <p className="text-sm text-muted-foreground">
                  or{" "}
                  <label className="text-primary font-medium hover:underline cursor-pointer">
                    browse from your computer
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </p>
              </div>
              <p className="text-xs text-muted-foreground/70">
                PDF format · Max 25MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Progress checklist — bottom */}
      <div className="flex items-center gap-6 pt-2">
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className={`w-4 h-4 ${documentName.trim() ? "text-emerald-500" : "text-border"}`} />
          <span className={documentName.trim() ? "text-foreground" : "text-muted-foreground"}>
            Name entered
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CheckCircle className={`w-4 h-4 ${documentFile ? "text-emerald-500" : "text-border"}`} />
          <span className={documentFile ? "text-foreground" : "text-muted-foreground"}>
            Document uploaded
          </span>
        </div>
      </div>
    </div>
  );
};

export default StepUploadDocument;
