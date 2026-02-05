import React, { createContext, useContext, useState, ReactNode } from "react";
import { Agreement, ViewMode, SidebarCategory } from "@/types/agreement";
import { mockAgreements } from "@/data/mockAgreements";

interface AgreementContextType {
  agreements: Agreement[];
  setAgreements: React.Dispatch<React.SetStateAction<Agreement[]>>;
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
  activeCategory: SidebarCategory;
  setActiveCategory: React.Dispatch<React.SetStateAction<SidebarCategory>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredAgreements: Agreement[];
  addAgreement: (agreement: Agreement) => void;
  updateAgreement: (id: string, updates: Partial<Agreement>) => void;
}

const AgreementContext = createContext<AgreementContextType | undefined>(undefined);

export const useAgreements = () => {
  const context = useContext(AgreementContext);
  if (!context) {
    throw new Error("useAgreements must be used within AgreementProvider");
  }
  return context;
};

export const AgreementProvider = ({ children }: { children: ReactNode }) => {
  const [agreements, setAgreements] = useState<Agreement[]>(mockAgreements);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [activeCategory, setActiveCategory] = useState<SidebarCategory>("inbox");
  const [searchQuery, setSearchQuery] = useState("");

  const filterByCategory = (agreement: Agreement): boolean => {
    switch (activeCategory) {
      case "inbox":
        return true;
      case "sent":
        return agreement.status === "waiting_for_signatures";
      case "drafts":
        return agreement.status === "draft";
      case "action_required":
        return agreement.status === "action_required";
      case "completed":
        return agreement.status === "completed";
      case "expired":
        return agreement.status === "expired";
      case "trash":
        return false;
      default:
        return true;
    }
  };

  const filteredAgreements = agreements
    .filter(filterByCategory)
    .filter((agreement) =>
      agreement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agreement.signers.some((s) => 
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  const addAgreement = (agreement: Agreement) => {
    setAgreements((prev) => [agreement, ...prev]);
  };

  const updateAgreement = (id: string, updates: Partial<Agreement>) => {
    setAgreements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  return (
    <AgreementContext.Provider
      value={{
        agreements,
        setAgreements,
        viewMode,
        setViewMode,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        filteredAgreements,
        addAgreement,
        updateAgreement,
      }}
    >
      {children}
    </AgreementContext.Provider>
  );
};
