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
      <div className="min-h-screen bg-background flex flex-col">
        <DashboardTopBar />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
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
