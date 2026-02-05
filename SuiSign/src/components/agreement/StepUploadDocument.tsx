import { Upload, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Upload & Name Your Document
        </h2>
        <p className="text-muted-foreground">
          Upload a PDF document and give it a name to get started.
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
          documentFile
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        }`}
      >
        {documentFile ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{documentFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(documentFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => setDocumentFile(null)}
              className="text-sm text-primary hover:underline"
            >
              Remove and upload a different file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">
                Drag and drop your PDF here
              </p>
              <p className="text-sm text-muted-foreground">or</p>
            </div>
            <label className="cursor-pointer">
              <span className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Browse Files
              </span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-muted-foreground">
              Supported format: PDF
            </p>
          </div>
        )}
      </div>

      {/* Agreement Name */}
      <div className="space-y-2">
        <Label htmlFor="documentName">Agreement Name</Label>
        <Input
          id="documentName"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          placeholder="e.g., Investment Agreement - Series A"
          className="max-w-lg"
        />
        <p className="text-sm text-muted-foreground">
          This name will be visible to all signers.
        </p>
      </div>
    </div>
  );
};

export default StepUploadDocument;
