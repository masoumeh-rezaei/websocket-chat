
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
    const { login } = useAuth();

    const handleLogin = (userData: { id: string; name: string; email: string }, token: string) => {
        login(userData, token);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
                <LoginForm onSuccess={handleLogin} />
            </div>
        </div>
    );
}
