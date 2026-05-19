import { memo } from "react";

const DashboardLayout = memo(({ children }) => (
  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {children}
  </main>
));

DashboardLayout.displayName = "DashboardLayout";
export default DashboardLayout;
