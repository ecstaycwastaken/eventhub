import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';

function AuthGuard() {
    const { isAuthenticated } = useAuth()

    // if (isLoading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        return <Navigate to='/' replace />
    }

  return <Outlet />
}

export default AuthGuard