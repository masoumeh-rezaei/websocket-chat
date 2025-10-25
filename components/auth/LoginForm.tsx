"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormOutput } from "@/validation/authSchemas";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Form } from "../ui/Form";

// تعریف Props
interface LoginFormProps {
    onSuccess?: (userData: { id: string; name: string; email: string }, token: string) => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
    const form = useForm<LoginFormOutput>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const handleSubmit = (data: LoginFormOutput) => {
        console.log("Login:", data);

        // مثال fake برای تست
        const fakeUser = { id: "1", name: "Masoume", email: data.email };
        const fakeToken = "JWT_FAKE_TOKEN";

        if (onSuccess) onSuccess(fakeUser, fakeToken);
    };

    return (
        <Form form={form} onSubmit={handleSubmit}>
            <Input
                type="email"
                placeholder="ایمیل"
                {...form.register("email")}
                error={form.formState.errors.email}
            />
            <Input
                type="password"
                placeholder="رمز عبور"
                {...form.register("password")}
                error={form.formState.errors.password}
            />
            <Button type="submit" className="w-full">
                ورود
            </Button>
        </Form>
    );
}
