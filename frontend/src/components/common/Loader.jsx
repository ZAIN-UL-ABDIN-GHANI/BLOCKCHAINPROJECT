import { memo } from "react";

export const SkeletonCard = memo(() => (
  <div className="card p-5 space-y-3">
    <div className="flex items-center gap-3">
      <div className="skeleton w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
      </div>
    </div>
    <div className="skeleton h-8 w-full rounded-lg" />
    <div className="skeleton h-4 w-2/3 rounded" />
  </div>
));

export const Spinner = memo(({ size = "md", className = "" }) => {
  const sizes = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-10 h-10" };
  return (
    <div className={`${sizes[size]} border-2 border-brand-200 border-t-brand-500 rounded-full animate-spin ${className}`} />
  );
});

SkeletonCard.displayName = "SkeletonCard";
Spinner.displayName = "Spinner";

export default Spinner;
