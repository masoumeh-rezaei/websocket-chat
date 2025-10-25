import React from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md animate-fadeIn">
                <h1 className="text-2xl font-bold mb-6 text-center text-indigo-600">ثبت‌نام</h1>
                <RegisterForm />
            </div>
        </div>
    );
}
