import { Agreement } from "@/types/agreement";

export const mockAgreements: Agreement[] = [
  {
    id: "1",
    name: "Investment Agreement - Series A",
    status: "waiting_for_signatures",
    signers: [
      { id: "s1", role: "Founder", email: "alice@startup.com", color: "#3B82F6" },
      { id: "s2", role: "Investor", email: "bob@vc.com", color: "#10B981" },
    ],
    signatureFields: [],
    lastUpdated: new Date(2026, 1, 3),
    requireVerification: true,
  },
  {
    id: "2",
    name: "NDA - Client Partnership",
    status: "action_required",
    signers: [
      { id: "s1", role: "Company Rep", email: "you@company.com", color: "#3B82F6" },
      { id: "s2", role: "Client", email: "client@partner.com", color: "#F59E0B" },
    ],
    signatureFields: [],
    lastUpdated: new Date(2026, 1, 2),
    requireVerification: false,
  },
  {
    id: "3",
    name: "Employment Contract - John Doe",
    status: "completed",
    signers: [
      { id: "s1", role: "HR Manager", email: "hr@company.com", color: "#3B82F6" },
      { id: "s2", role: "Employee", email: "john@email.com", color: "#8B5CF6" },
    ],
    signatureFields: [],
    lastUpdated: new Date(2026, 1, 1),
    requireVerification: true,
  },
  {
    id: "4",
    name: "Service Agreement - Q1 2026",
    status: "draft",
    signers: [
      { id: "s1", role: "Provider", email: "provider@service.com", color: "#3B82F6" },
    ],
    signatureFields: [],
    lastUpdated: new Date(2026, 0, 30),
    requireVerification: false,
  },
  {
    id: "5",
    name: "Lease Renewal - Office Space",
    status: "expired",
    signers: [
      { id: "s1", role: "Tenant", email: "you@company.com", color: "#3B82F6" },
      { id: "s2", role: "Landlord", email: "landlord@property.com", color: "#EF4444" },
    ],
    signatureFields: [],
    lastUpdated: new Date(2026, 0, 15),
    requireVerification: true,
    expiryDate: new Date(2026, 0, 31),
  },
  {
    id: "6",
    name: "Consulting Agreement - Project Alpha",
    status: "waiting_for_signatures",
    signers: [
      { id: "s1", role: "Consultant", email: "consultant@pro.com", color: "#3B82F6" },
      { id: "s2", role: "Client", email: "client@alpha.com", color: "#EC4899" },
      { id: "s3", role: "Witness", email: "witness@legal.com", color: "#06B6D4" },
    ],
    signatureFields: [],
    lastUpdated: new Date(2026, 1, 4),
    requireVerification: true,
  },
];
