import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  GraduationCap,
  Users,
  ChevronRight,
  Shield,
  Zap,
  Award,
  BookOpen,
  Calendar,
  TrendingUp,
  Star,
  CheckCircle,
  Globe,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { COLORS } from '../constants/colors';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const testimonials = [
    {
      name: "Mrs. Adebayo Kemi",
      role: "Parent",
      content: "TGCRA has provided exceptional education for my daughter. The digital platform makes it easy to track her progress.",
      rating: 5,
      avatar: "👩‍👧"
    },
    {
      name: "David Okonkwo",
      role: "Student",
      content: "The online result system is amazing! I can check my results anytime and track my academic progress easily.",
      rating: 5,
      avatar: "👨‍🎓"
    },
    {
      name: "Mr. Johnson Peters",
      role: "Teacher",
      content: "The result management system has streamlined our workflow. It's efficient and user-friendly for both teachers and students.",
      rating: 5,
      avatar: "👨‍🏫"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Advanced security measures protect your academic data with 99.9% uptime guarantee.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant result processing and real-time access for students and staff members.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "User Friendly",
      description: "Intuitive interface designed for users of all technical levels with mobile-first approach.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: BookOpen,
      title: "Comprehensive",
      description: "Complete academic management system covering all aspects of student performance tracking.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { number: "1,200+", label: "Students Enrolled", icon: Users, color: "from-red-500 to-pink-500" },
    { number: "24", label: "Active Classes", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
    { number: "85%", label: "Average Performance", icon: TrendingUp, color: "from-yellow-500 to-orange-500" },
    { number: "15+", label: "Years of Excellence", icon: Award, color: "from-green-500 to-emerald-500" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and School Name */}
            <div className="flex items-center group cursor-pointer">
              <img 
                src="/images/logo.png" 
                alt="TGCRA Logo" 
                className="h-10 w-10 mr-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                The Golden Crest Royal Academy
              </span>
              <span className="text-xl font-bold text-gray-900 sm:hidden">
                TGCRA
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex space-x-4">
              <div className="group">
                <Link
                  to="/auth/admin/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-100 group-hover:-translate-y-0.5"
                >
                  Admin Login
                </Link>
              </div>
              <div className="group">
                <Link
                  to="/auth/student/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white transition-all duration-200 hover:shadow-lg group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.primary.red} 0%, ${COLORS.primary.blue} 100%)`
                  }}
                >
                  Student Login
                </Link>
              </div>
            </div>

            {/* Tablet Navigation - Show both buttons */}
            <div className="hidden md:flex lg:hidden space-x-2">
              <Link
                to="/auth/admin/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-gray-100"
              >
                Admin
              </Link>
              <Link
                to="/auth/student/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary.red} 0%, ${COLORS.primary.blue} 100%)`
                }}
              >
                Student
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200 active:scale-95"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                to="/auth/admin/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Login
              </Link>
              <Link
                to="/auth/student/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white transition-all duration-200 hover:bg-gray-50"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primary.red} 0%, ${COLORS.primary.blue} 100%)`
                }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Student Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5"
          style={{ background: `linear-gradient(135deg, ${COLORS.primary.red} 0%, ${COLORS.primary.blue} 100%)` }}
        />
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-red-400 to-pink-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <img 
              src="/images/logo.png" 
              alt="TGCRA Logo" 
              className="h-32 w-32 mx-auto mb-6 transition-all duration-300 hover:scale-110 hover:rotate-6 cursor-pointer"
            />
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Welcome to The Golden Crest 
            <span
              className="block text-transparent bg-clip-text"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary.red} 0%, ${COLORS.primary.blue} 100%)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text'
              }}
            >
              Royal Academy
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Excellence in Education • Character Development • Academic Achievement
            <br />
            <span className="text-lg">
              Access your academic results securely and efficiently with our modern digital platform.
            </span>
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="group flex-1 sm:flex-none">
              <Link
                to="/auth/admin/login"
                className="w-full sm:w-auto px-10 py-5 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:shadow-2xl flex items-center justify-center group-hover:scale-105 group-hover:-translate-y-1"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.primary.red} 0%, ${COLORS.primary.blue} 100%)`,
                  boxShadow: `0 10px 30px rgba(220, 38, 38, 0.3)`
                }}
              >
                Staff Login
                <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="group flex-1 sm:flex-none">
              <Link
                to="/auth/student/login"
                className="w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-lg border-2 transition-all duration-300 hover:shadow-xl group-hover:scale-105 group-hover:-translate-y-1"
                style={{
                  borderColor: COLORS.primary.blue,
                  color: COLORS.primary.blue
                }}
              >
                Check Your Results
                <ArrowRight className="inline-block ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Our Digital Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Modern, secure, and user-friendly result management system designed for our school community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group transition-all duration-500 hover:-translate-y-4"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-r ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${COLORS.primary.red} 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, ${COLORS.primary.blue} 0%, transparent 50%)`
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Excellence in Numbers
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our achievements speak for themselves
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-gradient-to-r ${stat.color} shadow-lg`}>
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className={`text-5xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${COLORS.primary.red} 0%, transparent 50%),
                              radial-gradient(circle at 75% 75%, ${COLORS.primary.blue} 0%, transparent 50%)`
          }} />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Join TGCRA Family?
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Experience excellence in education with our modern facilities and dedicated staff.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="group flex-1 sm:flex-none">
              <Link
                to="/auth/student/login"
                className="w-full sm:w-auto px-10 py-5 rounded-2xl text-white font-bold text-lg transition-all duration-300 hover:shadow-2xl flex items-center justify-center group-hover:scale-105 group-hover:-translate-y-1"
                style={{ 
                  background: `linear-gradient(135deg, ${COLORS.primary.red} 0%, ${COLORS.primary.blue} 100%)`,
                  boxShadow: `0 10px 30px rgba(220, 38, 38, 0.3)`
                }}
              >
                Access Student Portal
                <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="group flex-1 sm:flex-none">
              <button className="w-full sm:w-auto px-10 py-5 rounded-2xl font-bold text-lg border-2 transition-all duration-300 hover:shadow-xl group-hover:scale-105 group-hover:-translate-y-1"
                style={{
                  borderColor: COLORS.primary.blue,
                  color: COLORS.primary.blue
                }}>
                Learn More About Us
                <ExternalLink className="inline-block ml-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                <img 
                  src="/images/logo.png" 
                  alt="TGCRA Logo" 
                  className="h-10 w-10 mr-3"
                />
                <span className="text-2xl font-bold">TGCRA Secondary School</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Excellence in Education • Character Development • Academic Achievement
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3" style={{ color: COLORS.primary.red }} />
                  <span className="text-gray-400">Plot 12, Education Crescent, Victoria Island, Lagos</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" style={{ color: COLORS.primary.red }} />
                  <span className="text-gray-400">+234 123 456 7890</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" style={{ color: COLORS.primary.red }} />
                  <span className="text-gray-400">info@tgcra.edu.ng</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/auth/admin/login" className="hover:text-white transition-colors flex items-center group">
                  Admin Login
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link></li>
                <li><Link to="/auth/student/login" className="hover:text-white transition-colors flex items-center group">
                  Student Login
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  About Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  Admissions
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  Help Center
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  Downloads
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center group">
                  FAQs
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TGCRA Secondary School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
