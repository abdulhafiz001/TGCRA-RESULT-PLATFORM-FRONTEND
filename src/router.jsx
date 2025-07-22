import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import AppLayout from "./layouts/AppLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import AdminLogin from "./pages/auth/AdminLogin";
import StudentLogin from "./pages/auth/StudentLogin";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminSettings from "./pages/admin/Settings";
import AddStudent from "./pages/admin/AddStudent";
import StudentDashboard from "./pages/student/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "admin/login",
        element: <AdminLogin />
      },
      {
        path: "student/login",
        element: <StudentLogin />
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />
      },
      {
        path: "students",
        element: <div>Students Management - Coming Soon</div>
      },
      {
        path: "add-student",
        element: <AddStudent />
      },
      {
        path: "classes",
        element: <div>Classes Management - Coming Soon</div>
      },
      {
        path: "results",
        element: <div>Results Management - Coming Soon</div>
      },
      {
        path: "settings",
        element: <AdminSettings />
      }
    ]
  },
  {
    path: "/student",
    element: <AppLayout />,
    children: [
      {
        path: "dashboard",
        element: <StudentDashboard />
      },
      {
        path: "results",
        element: <div>My Results - Coming Soon</div>
      },
      {
        path: "profile",
        element: <div>Profile - Coming Soon</div>
      },
      {
        path: "downloads",
        element: <div>Downloads - Coming Soon</div>
      },
      {
        path: "calendar",
        element: <div>Academic Calendar - Coming Soon</div>
      },
      {
        path: "achievements",
        element: <div>Achievements - Coming Soon</div>
      },
      {
        path: "settings",
        element: <div>Settings - Coming Soon</div>
      }
    ]
  }
]);

export default router;