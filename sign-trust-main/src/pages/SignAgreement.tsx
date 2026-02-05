import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  FileSignature, 
  ChevronLeft, 
  Pencil, 
  Type, 
  Upload, 
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockAgreements } from "@/data/mockAgreements";

type SignatureMethod = "draw" | "type" | "upload";

const SignAgreement = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [selectedMethod, setSelectedMethod] = useState<SignatureMethod>("draw");
  const [typedName, setTypedName] = useState("");
  const [uploadedSignature, setUploadedSignature] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const agreement = mockAgreements.find((a) => a.id === id);

  if (!agreement) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Agreement not found
          </h1>
          <Button onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedSignature(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const canSign = () => {
    switch (selectedMethod) {
      case "draw":
        return hasDrawn;
      case "type":
        return typedName.trim().length > 0;
      case "upload":
        return uploadedSignature !== null;
      default:
        return false;
    }
  };

  const handleComplete = () => {
    setIsSigned(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  if (isSigned) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Document Signed Successfully!
          </h1>
          <p className="text-muted-foreground mb-4">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

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
            <span className="font-semibold text-foreground">
              Sign: {agreement.name}
            </span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Document Preview */}
            <div className="lg:col-span-2">
              <h2 className="font-semibold text-foreground mb-4">
                Document Preview
              </h2>
              <div className="relative bg-white border border-border rounded-lg shadow-sm aspect-[8.5/11] overflow-hidden">
                {/* Mock PDF content */}
                <div className="absolute inset-0 p-8">
                  <div className="space-y-4">
                    <div className="h-8 bg-muted/30 rounded w-3/4" />
                    <div className="h-4 bg-muted/20 rounded w-full" />
                    <div className="h-4 bg-muted/20 rounded w-full" />
                    <div className="h-4 bg-muted/20 rounded w-5/6" />
                    <div className="h-4 bg-muted/20 rounded w-full mt-6" />
                    <div className="h-4 bg-muted/20 rounded w-full" />
                    <div className="h-4 bg-muted/20 rounded w-4/5" />
                  </div>
                </div>

                {/* Signature Field */}
                <div className="absolute bottom-20 left-8 right-8">
                  <div className="border-2 border-dashed border-primary rounded-lg p-4 bg-primary/5">
                    <p className="text-sm text-primary font-medium mb-2">
                      Your Signature
                    </p>
                    {selectedMethod === "draw" && hasDrawn && (
                      <div className="h-12 flex items-center">
                        <span className="text-muted-foreground italic">
                          [Signature placed]
                        </span>
                      </div>
                    )}
                    {selectedMethod === "type" && typedName && (
                      <div className="h-12 flex items-center">
                        <span
                          className="text-2xl italic"
                          style={{ fontFamily: "cursive" }}
                        >
                          {typedName}
                        </span>
                      </div>
                    )}
                    {selectedMethod === "upload" && uploadedSignature && (
                      <div className="h-12 flex items-center">
                        <img
                          src={uploadedSignature}
                          alt="Signature"
                          className="max-h-full"
                        />
                      </div>
                    )}
                    {!canSign() && (
                      <div className="h-12 flex items-center text-muted-foreground">
                        Complete your signature on the right →
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Panel */}
            <div className="space-y-6">
              <div>
                <h2 className="font-semibold text-foreground mb-2">
                  Create Your Signature
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose how you'd like to sign this document.
                </p>
              </div>

              {/* Method Tabs */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedMethod("draw")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedMethod === "draw"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Pencil className="w-4 h-4" />
                  Draw
                </button>
                <button
                  onClick={() => setSelectedMethod("type")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedMethod === "type"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Type className="w-4 h-4" />
                  Type
                </button>
                <button
                  onClick={() => setSelectedMethod("upload")}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedMethod === "upload"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload
                </button>
              </div>

              {/* Signature Input Area */}
              <div className="bg-card border border-border rounded-xl p-4">
                {selectedMethod === "draw" && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground">
                        Draw your signature below
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearCanvas}
                        className="h-8"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Clear
                      </Button>
                    </div>
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={120}
                      className="w-full border border-dashed border-border rounded-lg bg-white cursor-crosshair"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                    />
                  </div>
                )}

                {selectedMethod === "type" && (
                  <div>
                    <span className="text-sm text-muted-foreground block mb-3">
                      Type your full name
                    </span>
                    <Input
                      value={typedName}
                      onChange={(e) => setTypedName(e.target.value)}
                      placeholder="Your full name"
                      className="mb-4"
                    />
                    {typedName && (
                      <div className="border border-border rounded-lg p-4 bg-white">
                        <span className="text-sm text-muted-foreground block mb-2">
                          Preview:
                        </span>
                        <span
                          className="text-2xl italic"
                          style={{ fontFamily: "cursive" }}
                        >
                          {typedName}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {selectedMethod === "upload" && (
                  <div>
                    <span className="text-sm text-muted-foreground block mb-3">
                      Upload an image of your signature
                    </span>
                    {uploadedSignature ? (
                      <div className="border border-border rounded-lg p-4 bg-white">
                        <img
                          src={uploadedSignature}
                          alt="Uploaded signature"
                          className="max-h-20 mx-auto"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUploadedSignature(null)}
                          className="w-full mt-3"
                        >
                          Remove & upload another
                        </Button>
                      </div>
                    ) : (
                      <label className="block border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>

              {/* Complete Button */}
              <Button
                onClick={handleComplete}
                disabled={!canSign()}
                className="w-full"
                size="lg"
              >
                <Check className="w-4 h-4 mr-2" />
                Complete Signing
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By signing, you agree to the terms of this document.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignAgreement;
