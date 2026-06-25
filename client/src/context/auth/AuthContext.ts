import { createContext } from 'react';
import type { User } from '@/types/user';

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    updateAuthState: (userData: User) => void;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);