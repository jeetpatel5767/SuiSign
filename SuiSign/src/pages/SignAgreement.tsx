import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FileSignature,
  ChevronLeft,
  Pencil,
  Type,
  Upload,
  Check,
  X,
  FileText,
  Users,
  Shield,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockAgreements } from "@/data/mockAgreements";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

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
        <div className="text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground mb-1">
              Agreement not found
            </h1>
            <p className="text-sm text-muted-foreground">
              This agreement may have been removed or the link is invalid.
            </p>
          </div>
          <Button onClick={() => navigate("/dashboard")} size="sm">
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

  const stopDrawing = () => setIsDrawing(false);

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
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  if (isSigned) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center space-y-5">
          {/* Animated success */}
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Check className="w-9 h-9 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Signed Successfully!
            </h1>
            <p className="text-sm text-muted-foreground">
              Redirecting to dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const methods: { id: SignatureMethod; icon: typeof Pencil; label: string }[] = [
    { id: "draw", icon: Pencil, label: "Draw" },
    { id: "type", icon: Type, label: "Type" },
    { id: "upload", icon: Upload, label: "Upload" },
  ];

  /* ====== Shared Signature Input Component ====== */
  const SignatureInput = () => (
    <div className="space-y-3">
      {selectedMethod === "draw" && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Draw your signature
            </span>
            {hasDrawn && (
              <button
                onClick={clearCanvas}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
          <canvas
            ref={canvasRef}
            width={300}
            height={140}
            className="w-full border border-dashed border-border rounded-xl bg-white dark:bg-white cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          <p className="text-xs text-muted-foreground/60 mt-1.5 text-center">
            Use your mouse or trackpad to draw
          </p>
        </div>
      )}

      {selectedMethod === "type" && (
        <div className="space-y-3">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block">
            Type your full name
          </span>
          <Input
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            placeholder="Your full legal name"
            className="h-11 text-base rounded-xl"
          />
          {typedName && (
            <div className="border border-border rounded-xl p-4 bg-white dark:bg-white">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-2">
                Preview
              </span>
              <span
                className="text-2xl text-slate-800 italic block"
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
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider block mb-2">
            Upload signature image
          </span>
          {uploadedSignature ? (
            <div className="border border-border rounded-xl p-4 bg-white dark:bg-white space-y-3">
              <img
                src={uploadedSignature}
                alt="Uploaded signature"
                className="max-h-20 mx-auto"
              />
              <button
                onClick={() => setUploadedSignature(null)}
                className="w-full text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center justify-center gap-1 py-1.5"
              >
                <X className="w-3 h-3" />
                Remove & upload another
              </button>
            </div>
          ) : (
            <label className="block border border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/3 transition-all">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
                <Upload className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-foreground font-medium mb-0.5">
                Click to upload image
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to 5MB
              </p>
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
  );

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
            <span className="text-sm font-semibold text-foreground">Sign Agreement</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <FileText className="w-3.5 h-3.5" />
          <span className="truncate max-w-[250px]">{agreement.name}</span>
        </div>
      </header>

      {/* ============ MOBILE HEADER (<md) — modern ============ */}
      <header className="flex md:hidden h-14 bg-card px-3 items-center gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors flex-shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[15px] font-bold text-foreground truncate">
            Sign Agreement
          </h1>
        </div>
      </header>

      {/* Progress bar */}
      <div className="h-[3px] md:h-0.5 bg-muted/50 md:bg-border">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/60 md:bg-primary transition-all duration-500 ease-out rounded-r-full md:rounded-none"
          style={{ width: canSign() ? "100%" : "30%" }}
        />
      </div>

      {/* ============ DESKTOP LAYOUT (md+) — sidebar + doc, unchanged ============ */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        <aside className="w-80 bg-card border-r border-border flex-shrink-0 flex flex-col">
          <div className="flex-1 overflow-auto">
            <div className="p-5 border-b border-border/50 space-y-4">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Agreement Details
              </span>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{agreement.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Updated {formatDistanceToNow(agreement.lastUpdated, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {agreement.signers.length} signers
                  </span>
                  {agreement.requireVerification && (
                    <span className="flex items-center gap-1 text-primary">
                      <Shield className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <h2 className="text-base font-semibold text-foreground mb-1">
                  Create Your Signature
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose how you'd like to sign this document.
                </p>
              </div>
              <div className="flex gap-1.5 bg-muted/50 p-1 rounded-lg">
                {methods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-all",
                        selectedMethod === method.id
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {method.label}
                    </button>
                  );
                })}
              </div>
              <SignatureInput />
            </div>
          </div>
          <div className="p-4 border-t border-border space-y-3">
            <Button
              onClick={handleComplete}
              disabled={!canSign()}
              className="w-full gap-2"
              size="lg"
            >
              <Check className="w-4 h-4" />
              Complete Signing
            </Button>
            <p className="text-[11px] text-center text-muted-foreground">
              By signing, you agree to the terms of this document.
            </p>
          </div>
        </aside>
        <main className="flex-1 overflow-auto bg-muted/20">
          <div className="max-w-4xl mx-auto px-10 py-10">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Document Preview
            </h2>
            <div className="relative bg-white dark:bg-white border border-border rounded-xl shadow-sm aspect-[8.5/11] overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-9 bg-slate-50 border-b border-slate-200 flex items-center px-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                </div>
                <span className="text-[10px] text-slate-400 ml-3">{agreement.name}</span>
              </div>
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
                </div>
              </div>
              <div className="absolute bottom-16 left-10 right-10 pointer-events-none">
                <div className="border-2 border-dashed border-primary rounded-xl p-4 bg-primary/5">
                  <p className="text-xs text-primary font-medium mb-2 uppercase tracking-wider">
                    Your Signature
                  </p>
                  {selectedMethod === "draw" && hasDrawn && (
                    <div className="h-12 flex items-center">
                      <span className="text-sm text-muted-foreground italic">[Signature placed]</span>
                    </div>
                  )}
                  {selectedMethod === "type" && typedName && (
                    <div className="h-12 flex items-center">
                      <span className="text-2xl text-slate-800 italic" style={{ fontFamily: "cursive" }}>{typedName}</span>
                    </div>
                  )}
                  {selectedMethod === "upload" && uploadedSignature && (
                    <div className="h-12 flex items-center">
                      <img src={uploadedSignature} alt="Signature" className="max-h-full" />
                    </div>
                  )}
                  {!canSign() && (
                    <div className="h-12 flex items-center text-sm text-muted-foreground">
                      ← Complete your signature on the left panel
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ============ MOBILE LAYOUT (<md) — modern stacked ============ */}
      <div className="flex md:hidden flex-1 overflow-auto bg-muted/20">
        <div className="w-full px-4 py-4 pb-32 space-y-4">
          {/* Agreement info — glass card */}
          <div className="bg-card border border-border/40 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-bold text-foreground truncate leading-tight">{agreement.name}</p>
                <div className="flex items-center gap-2.5 mt-1 text-[12px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {agreement.signers.length} signers
                  </span>
                  {agreement.requireVerification && (
                    <span className="flex items-center gap-1 text-primary font-medium">
                      <Shield className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                  <span>
                    {formatDistanceToNow(agreement.lastUpdated, { addSuffix: false })} ago
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Document preview — compact */}
          <div className="relative bg-white dark:bg-white border border-border/50 rounded-2xl shadow-sm aspect-[8.5/7] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-7 bg-slate-50/80 border-b border-slate-200/60 flex items-center px-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-slate-300/80" />
                <div className="w-2 h-2 rounded-full bg-slate-300/80" />
                <div className="w-2 h-2 rounded-full bg-slate-300/80" />
              </div>
              <span className="text-[9px] text-slate-400 ml-2 truncate">{agreement.name}</span>
            </div>
            <div className="absolute top-7 inset-x-0 bottom-0 p-4 pointer-events-none">
              <div className="space-y-1.5">
                <div className="h-3.5 bg-slate-100 rounded w-2/3" />
                <div className="h-px bg-slate-100 w-full mt-1 mb-1" />
                <div className="h-2 bg-slate-50 rounded w-full" />
                <div className="h-2 bg-slate-50 rounded w-full" />
                <div className="h-2 bg-slate-50 rounded w-5/6" />
                <div className="h-2 bg-slate-50 rounded w-full mt-2" />
                <div className="h-2 bg-slate-50 rounded w-4/5" />
              </div>
            </div>
            {/* Signature field overlay on doc */}
            <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
              <div className="border-2 border-dashed border-primary rounded-xl p-2.5 bg-primary/5">
                <p className="text-[9px] text-primary font-semibold uppercase tracking-wider mb-1">
                  Your Signature
                </p>
                {selectedMethod === "draw" && hasDrawn && (
                  <div className="h-6 flex items-center">
                    <span className="text-[11px] text-muted-foreground italic">[Signature placed]</span>
                  </div>
                )}
                {selectedMethod === "type" && typedName && (
                  <div className="h-6 flex items-center">
                    <span className="text-lg text-slate-800 italic" style={{ fontFamily: "cursive" }}>{typedName}</span>
                  </div>
                )}
                {selectedMethod === "upload" && uploadedSignature && (
                  <div className="h-6 flex items-center">
                    <img src={uploadedSignature} alt="Signature" className="max-h-full" />
                  </div>
                )}
                {!canSign() && (
                  <div className="h-6 flex items-center text-[11px] text-muted-foreground">
                    ↓ Create your signature below
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Signature creation — main card */}
          <div className="bg-card border border-border/40 rounded-2xl shadow-sm overflow-hidden">
            {/* Header with gradient accent */}
            <div className="relative px-4 pt-4 pb-3">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
              <h2 className="text-[16px] font-bold text-foreground">
                Create Your Signature
              </h2>
              <p className="text-[12px] text-muted-foreground mt-0.5">
                Choose how you'd like to sign
              </p>
            </div>

            {/* Method Tabs — pill style */}
            <div className="px-4 pb-3">
              <div className="flex gap-1 bg-muted/40 p-1 rounded-xl">
                {methods.map((method) => {
                  const Icon = method.icon;
                  const isActive = selectedMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200",
                        isActive
                          ? "bg-card text-foreground shadow-md"
                          : "text-muted-foreground"
                      )}
                    >
                      <Icon className={cn("w-3.5 h-3.5", isActive && "text-primary")} />
                      {method.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Signature input area */}
            <div className="px-4 pb-4">
              <SignatureInput />
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-center text-muted-foreground/70 px-6">
            By signing, you agree to the terms of this document
          </p>
        </div>
      </div>

      {/* ============ MOBILE BOTTOM ACTION BAR (<md) — frosted glass ============ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-card/80 backdrop-blur-xl border-t border-border/50 px-4 py-3">
          <button
            onClick={handleComplete}
            disabled={!canSign()}
            className={cn(
              "w-full h-12 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 transition-all duration-200",
              canSign()
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 active:scale-[0.98]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {canSign() ? (
              <>
                <Sparkles className="w-4 h-4" />
                Complete Signing
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Complete Signing
              </>
            )}
          </button>
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </div>
    </div>
  );
};

export default SignAgreement;
