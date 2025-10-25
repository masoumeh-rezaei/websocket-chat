export interface User {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    createdAt: string;
}

export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}
