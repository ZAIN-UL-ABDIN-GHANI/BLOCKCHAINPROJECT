import { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ToastProvider from "./components/common/ToastProvider";
import { blockchainApi } from "./api/blockchainApi";

const App = () => {
  const [networkStatus, setNetworkStatus] = useState(false);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await blockchainApi.getHealth();
        setNetworkStatus(true);
      } catch {
        setNetworkStatus(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ToastProvider />
      <div className="min-h-screen">
        <Navbar networkStatus={networkStatus} />
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </div>
    </>
  );
};

export default App;
