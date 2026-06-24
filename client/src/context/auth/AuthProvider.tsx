import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { useHttp } from '@/hooks/useHttp';
import type { User } from '@/types/user';
import type { AuthResponse } from '@/types/response';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Keeps app from flashing login screen

    const { sendRequest } = useHttp<AuthResponse>();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await sendRequest({
                    url: '/api/v1/auth/me',
                    method: 'GET',
                });

                if (response && response.data) {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, [sendRequest]);

    const updateAuthState = useCallback((userData: User) => {
        setUser(userData);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(async () => {
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
        }
    }, [sendRequest]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, updateAuthState, logout }}>
            {!isLoading ? children : <div className="flex h-screen items-center justify-center">Loading...</div>}
        </AuthContext.Provider>
    );
}

export default AuthProvider;