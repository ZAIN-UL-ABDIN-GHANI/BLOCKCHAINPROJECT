import { memo } from "react";
import { motion } from "framer-motion";

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 text-red-600 font-medium rounded-xl px-6 py-3 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2",
};

const Button = memo(({ children, variant = "primary", loading, disabled, className = "", ...props }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </motion.button>
  );
});

Button.displayName = "Button";
export default Button;
