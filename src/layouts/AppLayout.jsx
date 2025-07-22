import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  User,
  Download,
  Calendar,
  Award,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Bell,
  Settings
} from 'lucide-react';
import { COLORS } from '../constants/colors';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/student/dashboard', icon: LayoutDashboard },
    { name: 'My Results', href: '/student/results', icon: FileText },
    { name: 'Profile', href: '/student/profile', icon: User },
    { name: 'Downloads', href: '/student/downloads', icon: Download },
    { name: 'Academic Calendar', href: '/student/calendar', icon: Calendar },
    { name: 'Achievements', href: '/student/achievements', icon: Award },
    { name: 'Settings', href: '/student/settings', icon: Settings },
  ];

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/student/login');
  };

  const isActive = (href) => location.pathname === href;

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 flex z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link to="/student/dashboard" className="flex items-center">
            <GraduationCap
              className="h-8 w-8 mr-2"
              style={{ color: COLORS.primary.blue }}
            />
            <span className="text-lg font-bold text-gray-900">TGCRA Student Portal</span>
          </Link>
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors
                  ${isActive(item.href)
                    ? 'text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
                style={isActive(item.href) ? { backgroundColor: COLORS.primary.blue } : {}}
              >
                <Icon
                  className={`mr-3 h-5 w-5 ${
                    isActive(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center mb-3">
            <div className="flex-shrink-0">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                style={{ backgroundColor: COLORS.primary.yellow }}
              >
                JS
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">John Student</p>
              <p className="text-xs text-gray-500">ADM/2024/001</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 text-gray-400" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset md:hidden"
            style={{ '--tw-ring-color': COLORS.primary.blue }}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1 flex">
              <h1 className="text-2xl font-semibold text-gray-900">
                Welcome back to TGCRA!
              </h1>
            </div>

            <div className="ml-4 flex items-center md:ml-6">
              <button
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ '--tw-ring-color': COLORS.primary.blue }}
              >
                <Bell className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;