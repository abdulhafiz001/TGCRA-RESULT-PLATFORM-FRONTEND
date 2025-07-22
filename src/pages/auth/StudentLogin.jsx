import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, User, Lock } from 'lucide-react';
import { COLORS, GRADIENTS } from '../../constants/colors';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    admissionNumber: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to student dashboard
      navigate('/student/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image/Branding */}
      <div 
        className="hidden lg:block lg:w-1/2 relative"
        style={{ background: GRADIENTS.accent }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h3 className="text-4xl font-bold mb-6">
              Check Your Results
            </h3>
            <p className="text-xl opacity-90 mb-8">
              Access your TGCRA Secondary School results and track your academic progress securely.
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-6 backdrop-blur-sm">
              <h4 className="font-semibold mb-4">Quick Access</h4>
              <ul className="text-sm space-y-2 opacity-90">
                <li>• View current term results</li>
                <li>• Download result slips</li>
                <li>• Track academic progress</li>
                <li>• Update profile information</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center mb-6">
              <GraduationCap 
                className="h-10 w-10 mr-3" 
                style={{ color: COLORS.primary.blue }}
              />
              <span className="text-2xl font-bold text-gray-900">
                TGCRA School
              </span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Student Login
            </h2>
            <p className="text-gray-600">
              Enter your credentials to view your results
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="admissionNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Admission Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="admissionNumber"
                    name="admissionNumber"
                    type="text"
                    required
                    value={formData.admissionNumber}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                    style={{ '--tw-ring-color': COLORS.primary.blue }}
                    placeholder="Enter your admission number"
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
                    style={{ '--tw-ring-color': COLORS.primary.blue }}
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
                  style={{ '--tw-ring-color': COLORS.primary.blue }}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm hover:underline" style={{ color: COLORS.primary.blue }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: COLORS.primary.blue }}
            >
              {isLoading ? 'Signing in...' : 'View My Results'}
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Are you an admin or teacher?{' '}
                <Link 
                  to="/admin/login" 
                  className="font-medium hover:underline"
                  style={{ color: COLORS.primary.red }}
                >
                  Admin Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
