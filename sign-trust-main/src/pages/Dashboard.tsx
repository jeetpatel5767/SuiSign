import { AgreementProvider } from "@/contexts/AgreementContext";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AgreementList from "@/components/dashboard/AgreementList";

const Dashboard = () => {
  return (
    <AgreementProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <DashboardTopBar />
        <div className="flex flex-1 overflow-hidden">
          <DashboardSidebar />
          <AgreementList />
        </div>
      </div>
    </AgreementProvider>
  );
};

export default Dashboard;
