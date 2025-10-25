"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// تایپ برای اطلاعات کاربر
interface User {
    id: string;
    name: string;
    email: string;
}

// تایپ برای Context
interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (userData: User, jwtToken: string) => {
        setUser(userData);
        setToken(jwtToken);
        // ذخیره توکن در localStorage برای persist کردن
        localStorage.setItem("authToken", jwtToken);
        localStorage.setItem("userData", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
    };

    const isAuthenticated = !!user && !!token;

    // Load from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("userData");
        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

// هوک برای استفاده آسان در کامپوننت‌ها
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
