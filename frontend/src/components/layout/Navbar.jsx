import { memo } from "react";
import { motion } from "framer-motion";
import { SiEthereum } from "react-icons/si";
import { FiWifi, FiWifiOff } from "react-icons/fi";

const Navbar = memo(({ networkStatus }) => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200"
      style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.05)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center shadow-brand-sm">
              <SiEthereum className="text-white text-lg" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-slate-900 tracking-tight">BlockBridge</span>
             <span className="hidden sm:block text-xs text-slate-400 font-mono">
  Web3 Transaction Dashboard
</span>
            </div>
          </div>

          {/* Network Status */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-300 ${
              networkStatus
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-600"
            }`}>
              {networkStatus
                ? <FiWifi className="text-emerald-500" />
                : <FiWifiOff className="text-red-500" />
              }
              <span className="hidden sm:inline font-mono text-[11px]">Chain ID: 1337</span>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse-slow ${
                networkStatus ? "bg-emerald-500" : "bg-red-500"
              }`} />
              <span className="hidden sm:inline">
                {networkStatus ? "Connected" : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
});

Navbar.displayName = "Navbar";
export default Navbar;
