import Image1 from "../assets/1.png";
import Image2 from "../assets/2.png";
import Image3 from "../assets/3.png";
import Image4 from "../assets/4.png";
import Image5 from "../assets/5.png";

export interface SolutionFeature {
    title: string;
    description: string;
}

export interface SolutionSection {
    id: number;
    title: string;
    description: string;
    image: string;
    features: SolutionFeature[];
}

export const contentSections: SolutionSection[] = [
    {
        id: 1,
        title: "Proposal Management",
        description:
            "Create, manage, and finalize proposals with complete visibility and control. Sui Sign ensures every proposal version, approval, and signature is securely recorded and easy to track.",
        image: Image1,
        features: [
            {
                title: "Version Control",
                description: "Track changes and keep a clear revision history."
            },
            {
                title: "Approval Workflow",
                description: "Send proposals to the right people and collect signatures fast."
            }
        ]
    },
    {
        id: 2,
        title: "Document Collaboration",
        description:
            "Collaborate on documents in real time while maintaining integrity and accountability. Every contribution is transparent, traceable, and protected on-chain.",
        image: Image2,
        features: [
            {
                title: "Real-Time Editing",
                description: "Collaborate easily with real-time team updates."
            },
            {
                title: "Comments & Review",
                description: "Comment, review, and request edits in one place."
            }
        ]
    },
    {
        id: 3,
        title: "Military-Grade Security",
        description:
            "Protect sensitive documents with enterprise-level security backed by blockchain verification. Sui Sign ensures data remains confidential, tamper-proof, and trusted.",
        image: Image3,
        features: [
            {
                title: "End-to-End Encryption",
                description: "Protect documents and signatures with strong encryption."
            },
            {
                title: "On-Chain Integrity",
                description: "Ensure authenticity with tamper-proof blockchain records."
            }
        ]
    },
    {
        id: 4,
        title: "Signature Tracking",
        description:
            "Monitor every signature from request to completion with complete transparency. Know exactly who signed, when they signed, and what was agreed upon.",
        image: Image4,
        features: [
            {
                title: "Real-Time Status",
                description: "Monitor signature status with instant notifications."
            },
            {
                title: "Audit Trails",
                description: "Keep a permanent audit trail for compliance."
            }
        ]
    },
    {
        id: 5,
        title: "Team Communication",
        description:
            "Keep teams aligned throughout the signing process with clear, contextual communication. Reduce friction and ensure everyone stays informed.",
        image: Image5,
        features: [
            {
                title: "In-Context Messaging",
                description: "Communicate directly inside documents to stay aligned."
            },
            {
                title: "Notification & Alerts",
                description: "Get instant alerts when actions are needed or done."
            }
        ]
    },
];
