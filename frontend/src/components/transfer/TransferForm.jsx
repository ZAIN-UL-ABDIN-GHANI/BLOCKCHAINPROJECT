import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiArrowDown, FiEdit3, FiList, FiAlertCircle } from "react-icons/fi";
import { shortenAddress } from "../../utils/shortenAddress";
import Button from "../common/Button";
import Input from "../common/Input";
import TransactionStatus from "./TransactionStatus";

// ─── Ethereum address validator ────────────────────────────────────────────
const isValidEthAddress = (addr) => /^0x[0-9a-fA-F]{40}$/.test(addr);

// ─── Dropdown select field ──────────────────────────────────────────────────
const SelectField = memo(({ label, value, onChange, options, error, placeholder, exclude }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-sm font-medium text-slate-600">{label}</label>}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`input-field appearance-none cursor-pointer ${error ? "input-error" : ""}`}
    >
      <option value="">{placeholder}</option>
      {options
        .filter((opt) => opt.address !== exclude)
        .map((opt, i) => (
          <option key={opt.address} value={opt.address}>
            Acct {i + 1}: {shortenAddress(opt.address)} — {parseFloat(opt.balance).toFixed(4)} ETH
          </option>
        ))}
    </select>
    {error && (
      <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
        <FiAlertCircle className="shrink-0" /> {error}
      </p>
    )}
  </div>
));

// ─── Manual address input field ─────────────────────────────────────────────
const ManualAddressField = memo(({ label, value, onChange, error, placeholder, exclude }) => {
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    setTouched(true);
    onChange(e.target.value.trim());
  };

  // Live validation hint (shown while typing, before submit)
  const showInlineWarning =
    touched && value && !isValidEthAddress(value) && !error;
  const isDuplicate = touched && value && exclude && value.toLowerCase() === exclude.toLowerCase();

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-slate-600">{label}</label>}
      <input
        value={value}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
        spellCheck={false}
        className={`input-field font-mono text-[12px] ${
          error || isDuplicate ? "input-error" : showInlineWarning ? "border-amber-400 focus:border-amber-400 focus:ring-amber-100 bg-amber-50" : ""
        }`}
      />
      {/* Priority: submit errors > duplicate > live format warning */}
      {(error || isDuplicate) ? (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-0.5">
          <FiAlertCircle className="shrink-0" />
          {error || "Cannot be the same as the other address."}
        </p>
      ) : showInlineWarning ? (
        <p className="text-xs text-amber-600 flex items-center gap-1 mt-0.5">
          ⚠ Must be a valid Ethereum address (0x + 40 hex chars)
        </p>
      ) : value && isValidEthAddress(value) ? (
        <p className="text-xs text-emerald-600 flex items-center gap-1 mt-0.5">
          ✓ Valid address
        </p>
      ) : (
        <p className="text-xs text-slate-400 mt-0.5">
          Paste a full 0x… address
        </p>
      )}
    </div>
  );
});

// ─── Toggle pills ────────────────────────────────────────────────────────────
const ModePill = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
      active
        ? "bg-brand-500 text-white shadow-brand-sm"
        : "bg-slate-100 text-slate-500 hover:bg-brand-50 hover:text-brand-600"
    }`}
  >
    <Icon className="text-sm" /> {label}
  </button>
);

// ─── Main Form ───────────────────────────────────────────────────────────────
const TransferForm = memo(({ form, errors, loading, lastTx, accounts, onFieldChange, onSubmit, onDismissTx }) => {
  const [fromMode, setFromMode] = useState("select"); // "select" | "manual"
  const [toMode, setToMode] = useState("select");

  const switchFrom = useCallback((mode) => {
    setFromMode(mode);
    onFieldChange("from", "");
  }, [onFieldChange]);

  const switchTo = useCallback((mode) => {
    setToMode(mode);
    onFieldChange("to", "");
  }, [onFieldChange]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.15 }}
      className="card p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
        <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center shadow-brand-sm">
          <FiSend className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-slate-900">Transfer ETH</h2>
          <p className="text-xs text-slate-400">Send Ether between accounts</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* ── FROM ─────────────────────────────────────── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">From (Sender)</span>
            <div className="flex gap-1">
              <ModePill active={fromMode === "select"} onClick={() => switchFrom("select")} icon={FiList} label="Select" />
              <ModePill active={fromMode === "manual"} onClick={() => switchFrom("manual")} icon={FiEdit3} label="Paste" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {fromMode === "select" ? (
              <motion.div key="from-select" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                <SelectField
                  value={form.from}
                  onChange={(val) => onFieldChange("from", val)}
                  options={accounts}
                  exclude={toMode === "select" ? form.to : ""}
                  placeholder="Select sender account…"
                  error={errors.from}
                />
              </motion.div>
            ) : (
              <motion.div key="from-manual" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                <ManualAddressField
                  value={form.from}
                  onChange={(val) => onFieldChange("from", val)}
                  placeholder="0x0000000000000000000000000000000000000000"
                  error={errors.from}
                  exclude={form.to}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Arrow divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-100" />
          <div className="w-8 h-8 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center">
            <FiArrowDown className="text-brand-500 text-sm" />
          </div>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* ── TO ───────────────────────────────────────── */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">To (Receiver)</span>
            <div className="flex gap-1">
              <ModePill active={toMode === "select"} onClick={() => switchTo("select")} icon={FiList} label="Select" />
              <ModePill active={toMode === "manual"} onClick={() => switchTo("manual")} icon={FiEdit3} label="Paste" />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {toMode === "select" ? (
              <motion.div key="to-select" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                <SelectField
                  value={form.to}
                  onChange={(val) => onFieldChange("to", val)}
                  options={accounts}
                  exclude={fromMode === "select" ? form.from : ""}
                  placeholder="Select receiver account…"
                  error={errors.to}
                />
              </motion.div>
            ) : (
              <motion.div key="to-manual" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}>
                <ManualAddressField
                  value={form.to}
                  onChange={(val) => onFieldChange("to", val)}
                  placeholder="0x0000000000000000000000000000000000000000"
                  error={errors.to}
                  exclude={form.from}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Amount */}
        <div className="pt-1">
          <Input
            label="Amount (ETH)"
            type="number"
            min="0"
            step="0.001"
            placeholder="0.000"
            value={form.amount}
            onChange={(e) => onFieldChange("amount", e.target.value)}
            error={errors.amount}
            hint="Enter the amount of ETH to send"
            className="font-mono"
          />
        </div>

        {/* Submit */}
        <Button
          onClick={onSubmit}
          loading={loading}
          disabled={loading || !accounts.length}
          className="w-full mt-1"
        >
          <FiSend className="text-sm" />
          {loading ? "Processing…" : "Send ETH"}
        </Button>
      </div>

      {/* Transaction receipt */}
      <TransactionStatus tx={lastTx} onDismiss={onDismissTx} />
    </motion.div>
  );
});

SelectField.displayName = "SelectField";
ManualAddressField.displayName = "ManualAddressField";
TransferForm.displayName = "TransferForm";
export default TransferForm;
