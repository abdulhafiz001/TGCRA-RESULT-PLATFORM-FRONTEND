import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  X,
  Home,
  FileText,
  BarChart3,
  BookOpen,
  GraduationCap,
  User,
  Calendar,
  LogOut
} from 'lucide-react';
import { COLORS } from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/student/dashboard', icon: Home },
  { name: 'My Results', href: '/student/results', icon: FileText },
  { name: 'Progress', href: '/student/progress', icon: BarChart3 },
  { name: 'Subjects', href: '/student/subjects', icon: BookOpen },
  { name: 'Analysis', href: '/student/analysis', icon: GraduationCap },
  { name: 'Timetable', href: '/student/timetable', icon: Calendar },
  { name: 'Profile', href: '/student/profile', icon: User },
];

const StudentSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth/student/login');
  };

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setIsOpen(false)} />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setIsOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <X className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="ml-2 text-lg font-bold text-gray-900">TGCRA</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive(item.href)
                        ? 'text-white bg-red-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center w-full">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                  {student?.first_name ? student.first_name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {student ? `${student.first_name} ${student.last_name}` : 'Student'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {student?.admission_number || 'Student'}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-1 min-h-0 border-r border-gray-200 bg-white shadow-lg">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="ml-2 text-lg font-bold text-gray-900">TGCRA</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive(item.href)
                    ? 'text-white bg-red-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                {student?.first_name ? student.first_name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-700">
                  {student ? `${student.first_name} ${student.last_name}` : 'Student'}
                </p>
                <p className="text-xs text-gray-500">
                  {student?.admission_number || 'Student'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSidebar; 