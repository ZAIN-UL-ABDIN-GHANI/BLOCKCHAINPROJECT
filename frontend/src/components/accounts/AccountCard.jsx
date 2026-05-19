import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FiCopy, FiCheck } from "react-icons/fi";
import { SiEthereum } from "react-icons/si";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { shortenAddress } from "../../utils/shortenAddress";
import BalanceBadge from "./BalanceBadge";
import toast from "react-hot-toast";

const AccountCard = memo(({ account, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(account.address);
    if (success) {
      setCopied(true);
      toast.success("Address copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  }, [account.address]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileHover={{ y: -2 }}
      className="card card-hover p-5 group cursor-default"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center border border-brand-100 group-hover:bg-brand-100 transition-colors">
            <SiEthereum className="text-brand-500 text-base" />
          </div>
          <div>
            <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide">Account {index + 1}</p>
            <p className="font-mono text-xs text-slate-600 font-medium">{shortenAddress(account.address, 5)}</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 active:scale-90 ${
            copied
              ? "bg-emerald-50 text-emerald-500 border border-emerald-200"
              : "bg-slate-50 hover:bg-brand-50 text-slate-400 hover:text-brand-500 border border-slate-200 hover:border-brand-200"
          }`}
          title="Copy address"
        >
          {copied ? <FiCheck className="text-sm" /> : <FiCopy className="text-sm" />}
        </button>
      </div>

      {/* Full address */}
      <div
        className="font-mono text-[10px] text-slate-400 break-all leading-relaxed mb-3 bg-slate-50 rounded-lg px-2.5 py-2 border border-slate-100 cursor-pointer hover:bg-brand-50 hover:border-brand-100 transition-colors"
        onClick={handleCopy}
        title="Click to copy"
      >
        {account.address}
      </div>

      {/* Balance */}
      <BalanceBadge balance={account.balance} />
    </motion.div>
  );
});

AccountCard.displayName = "AccountCard";
export default AccountCard;
