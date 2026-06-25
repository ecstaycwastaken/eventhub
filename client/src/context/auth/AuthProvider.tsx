import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { useHttp } from '@/hooks/useHttp';
import type { User } from '@/types/user';
import type { AuthResponse } from '@/types/response';
import { Spinner } from '@/components/ui/spinner';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Keeps app from flashing login screen
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

    const { sendRequest } = useHttp<AuthResponse>();

    useEffect(() => {
        let isMounted = true;

        const checkAuthStatus = async () => {
            try {
                const response = await sendRequest({
                    url: '/api/v1/auth/me',
                    method: 'GET',
                });

                if (!isMounted) return;

                if (response && response.data) {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                if (!isMounted) return;
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        checkAuthStatus();

        return () => {
            isMounted = false;
        };
    }, [sendRequest]);

    const updateAuthState = useCallback((userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(async () => {
        setIsLoggingOut(true);
        try {
            await sendRequest({
                url: '/api/v1/auth/logout',
                method: 'POST',
            });
        } catch (e) {
            console.error("Failed to clear cookie on backend", e);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            setIsLoggingOut(false);
        }
    }, [sendRequest]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, updateAuthState, logout, loading: isLoggingOut }}>
            {!isLoading ? (
                <>
                    {children}
                    {isLoggingOut && (
                        <div className="fixed inset-0 z-9999 bg-[#FFFFFF]/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                            <Spinner size="lg" variant="primary" />
                            <p className="text-[#111111] font-medium animate-pulse">Logging out...</p>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex h-screen flex-col items-center justify-center bg-bg-page gap-4">
                    <Spinner size="lg" variant="primary" />
                    <p className="text-text-primary font-medium animate-pulse">Initializing app...</p>
                </div>
            )}
        </AuthContext.Provider>
    );
}

export default AuthProvider;