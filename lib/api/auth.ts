// ------------------------- TYPES -------------------------

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string; // اختیاری برای backend
}

import axios, { AxiosError } from "axios";

const API_BASE = "/api/auth";

// ---------------- LOGIN ----------------
export async function loginReq(data: LoginData): Promise<AuthResponse> {
    try {
        const res = await axios.post<AuthResponse>(`${API_BASE}/login`, data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        throw new Error(err.response?.data?.error ?? err.message);
    }
}

// ---------------- REGISTER ----------------
export async function registerReq(data: RegisterData): Promise<AuthResponse> {
    try {
        const res = await axios.post<AuthResponse>(`${API_BASE}/register`, data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<{ error: string }>;
        throw new Error(err.response?.data?.error ?? err.message);
    }
}
