export type AgreementStatus =
  | "draft"
  | "waiting_for_signatures"
  | "action_required"
  | "completed"
  | "expired"
  | "deleted";

export interface Signer {
  id: string;
  role: string;
  email: string;
  color: string;
}

export interface SignatureField {
  id: string;
  signerId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  page: number;
}

export interface Agreement {
  id: string;
  name: string;
  status: AgreementStatus;
  signers: Signer[];
  signatureFields: SignatureField[];
  lastUpdated: Date;
  requireVerification: boolean;
  expiryDate?: Date;
  documentUrl?: string;
}

export type ViewMode = "grid" | "list" | "plain";

export type SidebarCategory =
  | "inbox"
  | "sent"
  | "drafts"
  | "action_required"
  | "completed"
  | "expired"
  | "trash";
