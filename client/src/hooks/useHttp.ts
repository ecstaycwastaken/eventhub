import { useState, useCallback, useRef, useEffect } from "react";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export interface ErrorMessage {
    message?: string;
    code?: string;
    suggestion?: string;
    validationErrors?: Record<string, string[]>;
}

export function useHttp<T>() {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<ErrorMessage | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const sendRequest = useCallback(
        async (
            config: AxiosRequestConfig,
            fullUrl: boolean = false
        ): Promise<AxiosResponse<T> | undefined> => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            abortControllerRef.current = new AbortController();

            setLoading(true);
            setError(null);

            const { url, ...restConfig } = config;
            const serverUrl = import.meta.env.VITE_SERVER_URL;

            // Determine full URL
            const apiUrl: string = fullUrl ? (url as string) : `${serverUrl}${url}`;

            const updatedConfig: AxiosRequestConfig = {
                ...restConfig,
                url: apiUrl,
                withCredentials: true,
                signal: abortControllerRef.current.signal,
            };

            try {
                const response: AxiosResponse<T> = await axios(updatedConfig);
                setData(response.data);
                setError(null);
                setLoading(false);
                return response;
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Request canceled");
                    return;
                }
                console.log("Request Error:", err);
                if (axios.isAxiosError(err)) {
                    console.error("Axios Error Response:", err.response);
                    const responseData = err.response?.data;
                    
                    let errorMessage = responseData?.message || responseData?.error || "An error occurred during the request.";
                    const validationErrors = responseData?.errors;

                    if (validationErrors && Object.keys(validationErrors).length > 0 && !responseData?.message) {
                        errorMessage = Object.values(validationErrors).flat()[0] as string;
                    }

                    const suggestion = 
                        responseData?.suggestion 
                        || responseData?.error?.suggestion
                        || "Please try again later.";

                    setError({ message: errorMessage, suggestion, validationErrors });
                }
                setLoading(false);
            }
        },
        []
    );

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return { data, error, loading, sendRequest, reset };
}

export default useHttp;