import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft, Mail, Lock } from 'lucide-react';
import { COLORS, GRADIENTS } from '../../constants/colors';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showError, showSuccess } = useNotification();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login(formData.username, formData.password);

      // Show success message
      showSuccess(`Welcome back, ${response.user?.name || 'User'}!`);

      // Navigate based on user role
      if (response.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/admin/dashboard');
      }
    } catch (error) {
      showError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Back Button */}
          <div className="flex justify-start">
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <img 
                src="/images/logo.png" 
                alt="TGCRA Logo" 
                className="h-20 w-20 mx-auto mb-4"
              />
              <span className="text-2xl font-bold text-gray-900 block">
                The Golden Crest Royal Academy
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Staff Login
            </h2>
            <p className="text-gray-600">
              Sign in to manage school results and student records
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    style={{ '--tw-ring-color': COLORS.primary.red }}
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    style={{ '--tw-ring-color': COLORS.primary.red }}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 focus:ring-2"
                  style={{ '--tw-ring-color': COLORS.primary.red }}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm hover:underline" style={{ color: COLORS.primary.red }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: COLORS.primary.red }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Are you a student?{' '}
                <Link 
                  to="/auth/student/login" 
                  className="font-medium hover:underline"
                  style={{ color: COLORS.primary.blue }}
                >
                  Student Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div 
        className="hidden lg:block lg:w-1/2 relative"
        style={{ background: GRADIENTS.primary }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h3 className="text-4xl font-bold mb-6">
              Welcome Back!
            </h3>
            <p className="text-xl opacity-90 mb-8">
              Manage TGCRA Secondary School's academic records with ease and efficiency.
            </p>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">1,200+</div>
                <div className="text-sm opacity-80">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold">24</div>
                <div className="text-sm opacity-80">Classes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
