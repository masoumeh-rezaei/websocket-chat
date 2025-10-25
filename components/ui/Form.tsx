import React from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";

type FormProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    onSubmit: (data: T) => void;
    children: React.ReactNode;
};

export function Form<T extends FieldValues>({ form, onSubmit, children }: FormProps<T>) {
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md mx-auto">
            {children}
        </form>
    );
}
