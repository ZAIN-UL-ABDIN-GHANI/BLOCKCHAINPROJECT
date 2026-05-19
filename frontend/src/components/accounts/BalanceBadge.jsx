import { memo } from "react";

const BalanceBadge = memo(({ balance }) => {
  const value = parseFloat(balance);
  const isHigh = value > 90;
  const isMid = value > 50;

  return (
    <span className={`badge font-mono font-semibold ${
      isHigh ? "badge-green"
        : isMid ? "badge-blue"
        : "badge-amber"
    }`}>
      ◈ {parseFloat(balance).toFixed(4)} ETH
    </span>
  );
});

BalanceBadge.displayName = "BalanceBadge";
export default BalanceBadge;
