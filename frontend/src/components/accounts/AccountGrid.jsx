import { memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AccountCard from "./AccountCard";
import { SkeletonCard } from "../common/Loader";

const AccountGrid = memo(({ accounts, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!accounts.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card p-12 text-center"
      >
        <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">
          ⟠
        </div>
        <p className="font-semibold text-slate-700">No accounts found</p>
        <p className="text-sm text-slate-400 mt-1">Ensure Ganache is running on port 7545.</p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {accounts.map((account, index) => (
          <AccountCard key={account.address} account={account} index={index} />
        ))}
      </div>
    </AnimatePresence>
  );
});

AccountGrid.displayName = "AccountGrid";
export default AccountGrid;
