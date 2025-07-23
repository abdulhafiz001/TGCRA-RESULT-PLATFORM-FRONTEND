import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X,
  Home,
  FileText,
  BarChart3,
  BookOpen,
  GraduationCap,
  User,
  Calendar,
  Bell
} from 'lucide-react';
import { COLORS } from '../../constants/colors';

const navigation = [
  { name: 'Dashboard', href: '/student/dashboard', icon: Home },
  { name: 'My Results', href: '/student/results', icon: FileText },
  { name: 'Progress', href: '/student/progress', icon: BarChart3 },
  { name: 'Subjects', href: '/student/subjects', icon: BookOpen },
  { name: 'Analysis', href: '/student/analysis', icon: GraduationCap },
  { name: 'Timetable', href: '/student/timetable', icon: Calendar },
  { name: 'Profile', href: '/student/profile', icon: User },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const StudentSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

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
                <div className="h-10 w-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  TGCRA Student
                </span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? 'text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                    style={{
                      backgroundColor: location.pathname === item.href ? COLORS.primary.red : 'transparent'
                    }}
                  >
                    <item.icon
                      className={classNames(
                        location.pathname === item.href ? 'text-white' : 'text-gray-400 group-hover:text-gray-500',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-30">
        <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white shadow-lg">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <div className="h-10 w-10 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">
                TGCRA Student
              </span>
            </div>
            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? 'text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                  )}
                  style={{
                    backgroundColor: location.pathname === item.href ? COLORS.primary.red : 'transparent'
                  }}
                >
                  <item.icon
                    className={classNames(
                      location.pathname === item.href ? 'text-white' : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div
                className="inline-block h-10 w-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: COLORS.primary.blue }}
              >
                <User className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Student Name
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  View profile
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSidebar; 