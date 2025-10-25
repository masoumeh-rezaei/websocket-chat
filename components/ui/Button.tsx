import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "outline" | "ghost";
    loading?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
                                                  variant = "primary",
                                                  loading,
                                                  children,
                                                  className,
                                                  ...props
                                              }) => {
    const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

    const styles = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
        ghost: "text-gray-600 hover:bg-gray-100",
    };

    return (
        <button
            disabled={loading || props.disabled}
            {...props}
            className={clsx(base, styles[variant], className, {
                "opacity-70 cursor-not-allowed": loading,
            })}
        >
            {loading ? "در حال انجام..." : children}
        </button>
    );
};
