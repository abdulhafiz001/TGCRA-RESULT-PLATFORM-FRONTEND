import { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  FileText, 
  TrendingUp,
  Calendar,
  Award,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../../constants/colors';
import API from '../../services/API';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showError } = useNotification();
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await API.getTeacherDashboard();
      setDashboardData(response.data);
    } catch (error) {
      showError(error.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
   };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const stats = [
    {
      name: 'My Classes',
      value: dashboardData?.stats?.total_classes || '0',
      change: 'Active',
      changeType: 'neutral',
      icon: BookOpen,
      color: COLORS.primary.blue
    },
    {
      name: 'My Subjects',
      value: dashboardData?.stats?.total_subjects || '0',
      change: 'Teaching',
      changeType: 'neutral',
      icon: FileText,
      color: COLORS.primary.yellow
    },
    {
      name: 'My Students',
      value: dashboardData?.stats?.total_students || '0',
      change: 'Enrolled',
      changeType: 'neutral',
      icon: Users,
      color: COLORS.primary.red
    },
    {
      name: 'Recent Scores',
      value: dashboardData?.recent_scores?.length || '0',
      change: 'This week',
      changeType: 'neutral',
      icon: TrendingUp,
      color: COLORS.status.success
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const getChangeIcon = (type) => {
    switch (type) {
      case 'increase':
        return <TrendingUp className="h-4 w-4" />;
      case 'decrease':
        return <TrendingUp className="h-4 w-4 transform rotate-180" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Teacher Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.name}! Here's an overview of your classes and students.
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ '--tw-ring-color': COLORS.primary.red }}
          >
            <Calendar className="mr-2 h-4 w-4" />
            This Term
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon 
                      className="h-6 w-6" 
                      style={{ color: item.color }}
                    />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {item.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${getChangeColor(item.changeType)}`}>
                          {getChangeIcon(item.changeType)}
                          <span className="ml-1">{item.change}</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Classes */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              My Class Assignments
            </h3>
            {dashboardData?.assignments && dashboardData.assignments.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.assignments.slice(0, 5).map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {assignment.subject?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {assignment.school_class?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No assignments</h3>
                <p className="mt-1 text-sm text-gray-500">
                  You haven't been assigned to any classes yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Scores */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Score Entries
            </h3>
            {dashboardData?.recent_scores && dashboardData.recent_scores.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.recent_scores.map((score, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Award className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {score.student?.first_name} {score.student?.last_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {score.subject?.name} - {score.school_class?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {score.score}%
                      </p>
                      <p className="text-xs text-gray-500">
                        {score.assessment_type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No recent scores</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start recording student scores to see them here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <button 
              onClick={() => navigate('/admin/manage-scores')}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              style={{ '--tw-ring-color': COLORS.primary.red }}
            >
              <FileText className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Record Scores
              </span>
            </button>
            <button 
              onClick={() => navigate('/admin/students')}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              style={{ '--tw-ring-color': COLORS.primary.red }}
            >
              <Users className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                View Students
              </span>
            </button>
            <button 
              onClick={() => navigate('/admin/classes')}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              style={{ '--tw-ring-color': COLORS.primary.red }}
            >
              <BookOpen className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                My Classes
              </span>
            </button>
            <button 
              onClick={() => navigate('/admin/profile')}
              className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              style={{ '--tw-ring-color': COLORS.primary.red }}
            >
              <Users className="mx-auto h-8 w-8 text-gray-400" />
              <span className="mt-2 block text-sm font-medium text-gray-900">
                My Profile
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
