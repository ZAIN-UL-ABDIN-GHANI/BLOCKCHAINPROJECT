import { Toaster } from "react-hot-toast";

const ToastProvider = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 4000,
      style: {
        background: "#fff",
        color: "#1e293b",
        border: "1px solid #e2e8f0",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        padding: "12px 16px",
      },
      success: {
        iconTheme: { primary: "#10b981", secondary: "#fff" },
      },
      error: {
        iconTheme: { primary: "#ef4444", secondary: "#fff" },
      },
      loading: {
        iconTheme: { primary: "#0e84e5", secondary: "#fff" },
      },
    }}
  />
);

export default ToastProvider;
