import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to appropriate login page based on intended role
    if (allowedRoles.includes('student')) {
      return <Navigate to="/auth/student/login" state={{ from: location }} replace />;
    } else {
      return <Navigate to="/auth/admin/login" state={{ from: location }} replace />;
    }
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />;
    } else if (user.role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    } else if (user.role === 'student') {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute; 