'use client'
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import React from "react";

export default function LoginPage() {
    const { login } = useAuth();

    const handleLogin = (userData: { id: string; name: string; email: string }, token: string) => {
        login(userData, token);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">ورود</h1>
                <LoginForm onSuccess={handleLogin} />
            </div>
        </div>
    );
}
