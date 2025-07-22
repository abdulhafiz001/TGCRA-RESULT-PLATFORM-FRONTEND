import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  ChevronRight,
  Shield,
  Zap
} from 'lucide-react';
import { COLORS, GRADIENTS } from '../constants/colors';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <GraduationCap
                className="h-8 w-8 mr-2"
                style={{ color: COLORS.primary.red }}
              />
              <span className="text-xl font-bold text-gray-900">
                TGCRA Secondary School
              </span>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/admin/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Admin Login
              </Link>
              <Link
                to="/student/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary.red} 0%, ${COLORS.primary.blue} 100%)`
                }}
              >
                Student Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: GRADIENTS.hero }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to TGCRA
              <span
                className="block text-transparent bg-clip-text"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary.red} 0%, ${COLORS.primary.blue} 100%)`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text'
                }}
              >
                Secondary School
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Access your academic results securely and efficiently.
              Our digital platform makes it easy for students to check their performance and for staff to manage academic records.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admin/login"
                className="px-8 py-4 rounded-lg text-white font-semibold text-lg transition-all duration-200 hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: COLORS.primary.red }}
              >
                Staff Login
                <ChevronRight className="inline-block ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/student/login"
                className="px-8 py-4 rounded-lg font-semibold text-lg border-2 transition-all duration-200 hover:shadow-lg"
                style={{
                  borderColor: COLORS.primary.blue,
                  color: COLORS.primary.blue
                }}
              >
                Check Your Results
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Digital Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Modern, secure, and user-friendly result management system designed for our school community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: `${COLORS.primary.red}20` }}
              >
                <Shield style={{ color: COLORS.primary.red }} className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Secure & Reliable
              </h3>
              <p className="text-gray-600">
                Your academic data and results are protected with advanced security measures and always accessible when you need them.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: `${COLORS.primary.blue}20` }}
              >
                <Zap style={{ color: COLORS.primary.blue }} className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Quick result processing and instant access for students and school staff.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
                style={{ backgroundColor: `${COLORS.primary.yellow}20` }}
              >
                <Users style={{ color: COLORS.primary.yellow }} className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                User Friendly
              </h3>
              <p className="text-gray-600">
                Intuitive interface designed for teachers, school staff, and students of all tech levels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: COLORS.primary.red }}
              >
                1,200+
              </div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: COLORS.primary.blue }}
              >
                24
              </div>
              <div className="text-gray-600">Active Classes</div>
            </div>
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: COLORS.primary.yellow }}
              >
                85%
              </div>
              <div className="text-gray-600">Average Performance</div>
            </div>
            <div>
              <div
                className="text-4xl font-bold mb-2"
                style={{ color: COLORS.primary.red }}
              >
                15+
              </div>
              <div className="text-gray-600">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <GraduationCap
                  className="h-8 w-8 mr-2"
                  style={{ color: COLORS.primary.red }}
                />
                <span className="text-xl font-bold">TGCRA Secondary School</span>
              </div>
              <p className="text-gray-400 mb-4">
                Excellence in Education • Character Development • Academic Achievement
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/admin/login" className="hover:text-white transition-colors">Admin Login</Link></li>
                <li><Link to="/student/login" className="hover:text-white transition-colors">Student Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TGCRA Secondary School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;