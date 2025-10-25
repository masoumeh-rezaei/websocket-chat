import React from "react";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: FieldError;
};

export const Input: React.FC<InputProps> = ({ error, className, ...props }) => {
    return (
        <div className="flex flex-col w-full">
            <input
                {...props}
                className={clsx(
                    "border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors",
                    error ? "border-red-500 focus:ring-red-500" : "border-gray-300",
                    className
                )}
            />
            {error && <span className="text-red-500 text-sm mt-1">{error.message}</span>}
        </div>
    );
};
