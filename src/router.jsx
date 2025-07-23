import { createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Layouts
import GuestLayout from './layouts/GuestLayout';
import AppLayout from './layouts/AppLayout';
import AdminLayout from './layouts/AdminLayout';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Context wrapper component
const ContextWrapper = ({ children }) => (
  <AuthProvider>
    <NotificationProvider>
      {children}
    </NotificationProvider>
  </AuthProvider>
);

// Pages
import Home from './pages/Home';
import StudentLogin from './pages/auth/StudentLogin';
import AdminLogin from './pages/auth/AdminLogin';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentResults from './pages/student/StudentResults';
import StudentProgress from './pages/student/StudentProgress';
import StudentSubjects from './pages/student/StudentSubjects';
import StudentAnalysis from './pages/student/StudentAnalysis';
import StudentProfile from './pages/student/StudentProfile';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import Students from './pages/admin/Students';
import AdminStudentResults from './pages/admin/StudentResults';
import AddStudent from './pages/admin/AddStudent';
import ManageScores from './pages/admin/ManageScores';
import Classes from './pages/admin/Classes';
import Results from './pages/admin/Results';
import Settings from './pages/admin/Settings';
import Profile from './pages/admin/Profile';

const router = createBrowserRouter([
  // Guest routes (public)
  {
    path: "/",
    element: (
      <ContextWrapper>
        <GuestLayout />
      </ContextWrapper>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },

  // Auth routes
  {
    path: "/auth",
    element: (
      <ContextWrapper>
        <GuestLayout />
      </ContextWrapper>
    ),
    children: [
      {
        path: '/auth/admin/login',
        element: <AdminLogin />,
      },
      {
        path: '/auth/student/login',
        element: <StudentLogin />,
      },
    ],
  },

  // Student routes (protected)
  {
    path: "/student",
    element: (
      <ContextWrapper>
        <ProtectedRoute allowedRoles={['student']}>
          <AppLayout />
        </ProtectedRoute>
      </ContextWrapper>
    ),
    children: [
      {
        path: 'dashboard',
        element: <StudentDashboard />,
      },
      {
        path: 'results',
        element: <StudentResults />,
      },
      {
        path: 'progress',
        element: <StudentProgress />,
      },
      {
        path: 'subjects',
        element: <StudentSubjects />,
      },
      {
        path: 'analysis',
        element: <StudentAnalysis />,
      },
      {
        path: 'timetable',
        element: <div>Student Timetable Page (Coming Soon)</div>,
      },
      {
        path: 'profile',
        element: <StudentProfile />,
      },
    ],
  },

  // Admin routes (protected) - includes teachers and principals
  {
    path: "/admin",
    element: (
      <ContextWrapper>
        <ProtectedRoute allowedRoles={['admin', 'teacher']}>
          <AdminLayout />
        </ProtectedRoute>
      </ContextWrapper>
    ),
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'students',
        element: <Students />,
      },
      {
        path: 'students/:studentId/results',
        element: <AdminStudentResults />,
      },
      {
        path: 'add-student',
        element: <AddStudent />,
      },
      {
        path: 'manage-scores',
        element: <ManageScores />,
      },
      {
        path: 'classes',
        element: <Classes />,
      },
      {
        path: 'results',
        element: <Results />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;
