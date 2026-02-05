import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Add Signers
        </h2>
        <p className="text-muted-foreground">
          Add the people who need to sign this document. Each signer will
          receive an email notification.
        </p>
      </div>

      {/* Signers List */}
      <div className="space-y-4">
        {signers.map((signer, index) => (
          <div
            key={signer.id}
            className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl"
          >
            <div
              className="w-3 h-full min-h-[80px] rounded-full flex-shrink-0"
              style={{ backgroundColor: signer.color }}
            />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`role-${signer.id}`}>Role / Label</Label>
                <Input
                  id={`role-${signer.id}`}
                  value={signer.role}
                  onChange={(e) => updateSigner(signer.id, "role", e.target.value)}
                  placeholder="e.g., Founder, Investor, Witness"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`email-${signer.id}`}>Email Address</Label>
                <Input
                  id={`email-${signer.id}`}
                  type="email"
                  value={signer.email}
                  onChange={(e) => updateSigner(signer.id, "email", e.target.value)}
                  placeholder="signer@example.com"
                />
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSigner(signer.id)}
              disabled={signers.length === 1}
              className="flex-shrink-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button variant="outline" onClick={addSigner} className="gap-2">
        <Plus className="w-4 h-4" />
        Add Another Signer
      </Button>

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p>
          <strong>Tip:</strong> Each signer must have a unique email address.
          They will receive an invitation to sign the document once it's sent.
        </p>
      </div>
    </div>
  );
};

export default StepAddSigners;
