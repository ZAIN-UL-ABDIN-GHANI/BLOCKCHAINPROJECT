import { useEffect, useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FiRefreshCw, FiUsers, FiActivity, FiZap } from "react-icons/fi";
import { SiEthereum } from "react-icons/si";

import { useAccounts } from "../hooks/useAccounts";
import { useTransfer } from "../hooks/useTransfer";
import { sumBalances } from "../utils/formatCurrency";
import { shortenAddress } from "../utils/shortenAddress";

import AccountGrid from "../components/accounts/AccountGrid";
import TransferForm from "../components/transfer/TransferForm";
import Button from "../components/common/Button";

const StatCard = ({ icon: Icon, label, value, sub, accent = "brand" }) => {
  const colors = {
    brand: { bg: "bg-brand-50", border: "border-brand-100", icon: "text-brand-500", value: "text-brand-700" },
    green: { bg: "bg-emerald-50", border: "border-emerald-100", icon: "text-emerald-600", value: "text-emerald-700" },
    amber: { bg: "bg-amber-50", border: "border-amber-100", icon: "text-amber-600", value: "text-amber-700" },
  };
  const c = colors[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-5"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 ${c.bg} rounded-xl flex items-center justify-center border ${c.border}`}>
          <Icon className={`text-base ${c.icon}`} />
        </div>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</span>
      </div>
      <p className={`font-bold text-2xl font-mono ${c.value}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1 font-mono">{sub}</p>}
    </motion.div>
  );
};

const Dashboard = () => {
  const { accounts, loading, fetchAccounts, updateBalances } = useAccounts();
  const {
    form, errors, loading: transferLoading, lastTx,
    handleChange, handleSubmit, resetForm,
  } = useTransfer(accounts, updateBalances);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAccounts(true);
    setRefreshing(false);
  }, [fetchAccounts]);

  const totalEth = sumBalances(accounts);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Blockchain Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-0.5 font-mono">
            Local Ganache Network · Chain ID 1337
          </p>
        </motion.div>

        <Button
          variant="secondary"
          onClick={handleRefresh}
          loading={refreshing}
          className="self-start sm:self-auto"
        >
          <FiRefreshCw className={`text-sm ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={FiUsers}
          label="Total Accounts"
          value={accounts.length || "—"}
          accent="brand"
        />
        <StatCard
          icon={SiEthereum}
          label="Total ETH"
          value={`${totalEth.toFixed(2)} ETH`}
          accent="green"
        />
        <StatCard
          icon={FiActivity}
          label="Latest Tx"
          value={lastTx?.hash ? shortenAddress(lastTx.hash, 8) : "—"}
          sub={lastTx?.hash ? `Block #${lastTx.blockNumber}` : "No transactions yet"}
          accent="amber"
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accounts — 2/3 */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <FiZap className="text-brand-500" />
              Wallet Accounts
              {accounts.length > 0 && (
                <span className="badge badge-blue">{accounts.length}</span>
              )}
            </h2>
          </div>
          <AccountGrid accounts={accounts} loading={loading} />
        </div>

        {/* Transfer — 1/3 */}
        <div className="lg:col-span-1">
          <TransferForm
            form={form}
            errors={errors}
            loading={transferLoading}
            lastTx={lastTx}
            accounts={accounts}
            onFieldChange={handleChange}
            onSubmit={handleSubmit}
            onDismissTx={resetForm}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
