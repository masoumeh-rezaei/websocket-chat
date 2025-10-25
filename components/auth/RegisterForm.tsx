"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormOutput } from "@/validation/authSchemas";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Form } from "../ui/Form";

interface RegisterFormProps {
    onSuccess?: (userData: { id: string; name: string; email: string }, token: string) => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
    const form = useForm<RegisterFormOutput>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    });

    const handleSubmit = (data: RegisterFormOutput) => {
        console.log("Register:", data);

        // مثال fake بعد ثبت‌نام
        const fakeUser = { id: "2", name: data.name, email: data.email };
        const fakeToken = "JWT_FAKE_TOKEN";

        if (onSuccess) onSuccess(fakeUser, fakeToken);
    };

    return (
        <Form form={form} onSubmit={handleSubmit}>
            <Input placeholder="نام" {...form.register("name")} error={form.formState.errors.name} />
            <Input type="email" placeholder="ایمیل" {...form.register("email")} error={form.formState.errors.email} />
            <Input type="password" placeholder="رمز عبور" {...form.register("password")} error={form.formState.errors.password} />
            <Input type="password" placeholder="تکرار رمز عبور" {...form.register("confirmPassword")} error={form.formState.errors.confirmPassword} />
            <Button type="submit" className="w-full">
                ثبت‌نام
            </Button>
        </Form>
    );
}
