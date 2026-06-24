import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';

function AuthGuard({ type }: { type: 'user' | 'admin' }) {
    const { isAuthenticated, user } = useAuth()

    // if (isLoading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        if (type === 'admin') {
            return <Navigate to='/unauthorized' replace />
        }
        return <Navigate to='/' replace />
    }

    if (type === 'admin' && user?.role !== 'admin') {
        return <Navigate to='/unauthorized' replace />
    }

  return <Outlet />
}

export default AuthGuard