import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiExternalLink, FiX } from "react-icons/fi";
import { shortenAddress } from "../../utils/shortenAddress";
import { copyToClipboard } from "../../utils/copyToClipboard";
import toast from "react-hot-toast";

const Row = ({ label, value, mono = true }) => (
  <div className="flex items-center justify-between gap-3 py-1.5">
    <span className="text-xs text-slate-400 shrink-0">{label}</span>
    <span className={`text-xs text-slate-700 font-medium ${mono ? "font-mono" : ""} text-right break-all`}>
      {value}
    </span>
  </div>
);

const TransactionStatus = memo(({ tx, onDismiss }) => {
  if (!tx) return null;

  const handleCopyHash = async () => {
    await copyToClipboard(tx.hash);
    toast.success("Transaction hash copied!");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 4, scale: 0.98 }}
        className="mt-4 overflow-hidden"
      >
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <FiCheckCircle className="text-emerald-600 text-sm" />
              </div>
              <span className="text-sm font-semibold text-emerald-700">Transaction Confirmed</span>
            </div>
            <button
              onClick={onDismiss}
              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-emerald-100 text-emerald-500 transition-colors"
            >
              <FiX className="text-sm" />
            </button>
          </div>

          <div className="bg-white/70 rounded-lg px-3 py-1 divide-y divide-emerald-100">
            <div className="flex items-center justify-between gap-3 py-1.5">
              <span className="text-xs text-slate-400 shrink-0">Hash</span>
              <button
                onClick={handleCopyHash}
                className="font-mono text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors font-medium"
              >
                {shortenAddress(tx.hash, 8)}
                <FiExternalLink className="text-xs" />
              </button>
            </div>
            <Row label="Amount" value={`${tx.amount} ETH`} />
            <Row label="Block" value={`#${tx.blockNumber}`} />
            <Row label="Gas Used" value={tx.gasUsed} />
            <div className="flex items-center justify-between gap-3 py-1.5">
              <span className="text-xs text-slate-400">Status</span>
              <span className="badge badge-green capitalize">{tx.status}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

TransactionStatus.displayName = "TransactionStatus";
export default TransactionStatus;
