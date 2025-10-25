import { useState } from "react";

export function useAuthSubmit<T>(fn: (data: T) => Promise<void> | void) {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (data: T) => {
        setLoading(true);
        try {
            await fn(data);
        } finally {
            setLoading(false);
        }
    };
    return { loading, handleSubmit };
}
