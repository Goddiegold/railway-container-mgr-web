
import { useState, useCallback } from "react";

type ApiFunction<T> = (...args: any[]) => Promise<T>;

export default function useAPI<T>(apiFn: ApiFunction<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const execute = useCallback(
        async (...args: Parameters<ApiFunction<T>>) => {
            setLoading(true);
            setError(null);
            try {
                const result = await apiFn(...args);
                setData(result);
                return result;
            } catch (err) {
                setError(err);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [apiFn]
    );

    return {
        execute,
        data,
        loading,
        error
    };
}