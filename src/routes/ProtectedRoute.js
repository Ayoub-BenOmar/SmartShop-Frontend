import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, role } = useSelector((state) => state.auth);

    console.log("ProtectedRoute Check:", { isAuthenticated, role, allowedRoles });

    if (!isAuthenticated) {
        console.warn("User not authenticated. Redirecting to /login");
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        console.warn(`User role ${role} not authorized. Allowed: ${allowedRoles}. Redirecting to /unauthorized`);
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;