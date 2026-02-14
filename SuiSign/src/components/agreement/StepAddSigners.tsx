import { Plus, Trash2, Mail, UserCircle, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Signer } from "@/types/agreement";

const signerColors = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#EF4444",
];

interface StepAddSignersProps {
  signers: Signer[];
  setSigners: (signers: Signer[]) => void;
}

const StepAddSigners = ({ signers, setSigners }: StepAddSignersProps) => {
  const addSigner = () => {
    const newSigner: Signer = {
      id: `s${Date.now()}`,
      role: `Signer ${signers.length + 1}`,
      email: "",
      color: signerColors[signers.length % signerColors.length],
    };
    setSigners([...signers, newSigner]);
  };

  const removeSigner = (id: string) => {
    if (signers.length > 1) {
      setSigners(signers.filter((s) => s.id !== id));
    }
  };

  const updateSigner = (id: string, field: keyof Signer, value: string) => {
    setSigners(
      signers.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const filledCount = signers.filter((s) => s.email.trim() !== "").length;

  return (
    <div className="space-y-5 md:space-y-8">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1.5 md:mb-2">
            Add Signers
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-lg">
            Add the people who need to sign this document. Each signer will receive an email invitation.
          </p>
        </div>
        <span className="text-sm text-muted-foreground bg-muted px-3 py-1.5 rounded-lg tabular-nums flex-shrink-0">
          {filledCount} of {signers.length} ready
        </span>
      </div>

      {/* Signers List */}
      <div className="space-y-3">
        {signers.map((signer, index) => (
          <div
            key={signer.id}
            className="group bg-card border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-sm"
          >
            {/* Color accent top bar */}
            <div className="h-1" style={{ backgroundColor: signer.color }} />

            <div className="p-3 md:p-4 flex items-center gap-3 md:gap-4">
              {/* Drag handle — desktop only */}
              <GripVertical className="hidden md:block w-4 h-4 text-border flex-shrink-0" />

              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ backgroundColor: signer.color }}
              >
                {signer.email
                  ? signer.email.charAt(0).toUpperCase()
                  : (index + 1).toString()}
              </div>

              {/* Fields */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Role</label>
                  <Input
                    value={signer.role}
                    onChange={(e) => updateSigner(signer.id, "role", e.target.value)}
                    placeholder="e.g., Founder, Investor"
                    className="h-10 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1">Email</label>
                  <Input
                    type="email"
                    value={signer.email}
                    onChange={(e) => updateSigner(signer.id, "email", e.target.value)}
                    placeholder="signer@example.com"
                    className="h-10 text-sm"
                  />
                </div>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeSigner(signer.id)}
                disabled={signers.length === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-transparent group-hover:text-muted-foreground hover:!text-destructive hover:bg-destructive/10 transition-all disabled:opacity-0 disabled:pointer-events-none flex-shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add signer button */}
      <button
        onClick={addSigner}
        className="w-full flex items-center justify-center gap-2 py-3.5 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add another signer
      </button>

      <div className="flex items-start gap-3 text-sm text-muted-foreground bg-muted/40 rounded-xl px-4 py-3">
        <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-muted-foreground/60" />
        <p>
          Each signer receives an email invitation with a unique signing link. They can sign from any device — no account required.
        </p>
      </div>
    </div>
  );
};

export default StepAddSigners;
