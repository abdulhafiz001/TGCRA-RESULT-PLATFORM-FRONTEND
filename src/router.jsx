import { createBrowserRouter } from 'react-router-dom';

// Layouts
import GuestLayout from './layouts/GuestLayout';
import AppLayout from './layouts/AppLayout';

// Pages
import Home from './pages/Home';
import StudentLogin from './pages/auth/StudentLogin';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import StudentResults from './pages/student/StudentResults';
import StudentProgress from './pages/student/StudentProgress';
import StudentSubjects from './pages/student/StudentSubjects';
import StudentAnalysis from './pages/student/StudentAnalysis';
import StudentProfile from './pages/student/StudentProfile';

const router = createBrowserRouter([
  // Guest routes (public)
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/admin/login',
        element: <div>Admin Login Page (Coming Soon)</div>,
      },
      {
        path: '/student/login',
        element: <StudentLogin />,
      },
    ],
  },

  // Student routes (protected)
  {
    path: "/student",
    element: <AppLayout />,
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

  // Admin routes (placeholder)
  {
    path: "/admin",
    element: <div>Admin Routes (Coming Soon)</div>,
    children: [
      {
        path: 'dashboard',
        element: <div>Admin Dashboard (Coming Soon)</div>,
      },
    ],
  },
]);

export default router;