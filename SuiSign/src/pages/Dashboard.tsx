import { AgreementProvider } from "@/contexts/AgreementContext";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AgreementList from "@/components/dashboard/AgreementList";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <AgreementProvider>
      <div className="h-screen bg-background flex overflow-hidden">
        {/* Desktop Sidebar — now full height */}
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <DashboardTopBar />
          <AgreementList />
        </div>

        {/* Mobile FAB — Google Drive style floating "+" button */}
        <button
          onClick={() => navigate("/create-agreement")}
          className="fixed right-4 bottom-20 z-50 md:hidden w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg hover:shadow-xl active:scale-95 transition-all duration-150 flex items-center justify-center"
          aria-label="Create Agreement"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </AgreementProvider>
  );
};

export default Dashboard;
