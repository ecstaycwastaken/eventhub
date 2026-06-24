import { useState, useCallback } from "react";
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

export interface ErrorMessage {
    message?: string;
    code?: string;
    suggestion?: string;
}

export function useHttp<T>() {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<ErrorMessage | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const sendRequest = useCallback(
        async (
            config: AxiosRequestConfig,
            fullUrl: boolean = false
        ): Promise<AxiosResponse<T> | undefined> => {
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
            };

            try {
                const response: AxiosResponse<T> = await axios(updatedConfig);
                setData(response.data);
                setError(null);
                return response;
            } catch (err) {
                console.log("Request Error:", err);
                if (axios.isAxiosError(err)) {
                    console.error("Axios Error Response:", err.response);
                    const errorMessage = err.response?.data?.error?.message || "An error occurred during the request.";
                    const errorCode = err.response?.data?.error?.code || "UNKNOWN_ERROR";
                    const suggestion = 
                        err.response?.data?.suggestion 
                        || err.response?.data?.error?.suggestion
                        || "Please try again later.";

                    setError({ message: errorMessage, code: errorCode, suggestion });
                }
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const reset = () => {
        setData(null);
        setError({ message: "", suggestion: "" });
        setLoading(false);
    };

    return { data, error, loading, sendRequest, reset };
}

export default useHttp;