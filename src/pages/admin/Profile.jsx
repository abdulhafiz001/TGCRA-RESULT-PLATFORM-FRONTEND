import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Save, 
  Eye, 
  EyeOff, 
  BookOpen, 
  GraduationCap,
  Edit,
  X,
  Shield,
  Calendar,
  Key,
  Star,
  Briefcase,
  School,
  Clock,
  Award,
  FileText
} from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import API from '../../services/API';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { showError, showSuccess } = useNotification();
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    phone: '',
    address: '',
    date_of_birth: '',
    gender: '',
    qualification: '',
    department: '',
    date_joined: '',
    subjects: [],
    classes: [],
    is_form_teacher: false
  });

  const [editData, setEditData] = useState({ ...profileData });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        let response;
        
        console.log('Fetching profile for user role:', user?.role);
        
        if (user?.role === 'admin') {
          response = await API.getAdminProfile();
        } else if (user?.role === 'teacher') {
          response = await API.getTeacherProfile();
        } else if (user?.role === 'student') {
          response = await API.getStudentProfile();
        }

        console.log('Profile API response:', response);

        if (response?.data) {
          const data = response.data;
          console.log('Profile data received:', data);
          
          const profileInfo = {
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            middle_name: data.middle_name || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            date_of_birth: data.date_of_birth || '',
            gender: data.gender || '',
            qualification: data.qualification || '',
            department: data.department || '',
            date_joined: data.date_joined || data.created_at || '',
            subjects: data.subjects || [],
            classes: data.classes || [],
            is_form_teacher: data.is_form_teacher || false
          };
          
          console.log('Processed profile info:', profileInfo);
          
          setProfileData(profileInfo);
          setEditData(profileInfo);
        } else {
          console.log('No profile data in response');
          // Fallback to user data if no profile data
          const fallbackProfile = {
            first_name: user?.first_name || '',
            last_name: user?.last_name || '',
            middle_name: user?.middle_name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
            date_of_birth: user?.date_of_birth || '',
            gender: user?.gender || '',
            qualification: user?.qualification || '',
            department: user?.department || '',
            date_joined: user?.created_at || '',
            subjects: user?.subjects || [],
            classes: user?.classes || [],
            is_form_teacher: user?.is_form_teacher || false
          };
          
          setProfileData(fallbackProfile);
          setEditData(fallbackProfile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        showError('Failed to load profile data');
        
        // Fallback to user data on error
        const fallbackProfile = {
          first_name: user?.first_name || '',
          last_name: user?.last_name || '',
          middle_name: user?.middle_name || '',
          email: user?.email || '',
          phone: user?.phone || '',
          address: user?.address || '',
          date_of_birth: user?.date_of_birth || '',
          gender: user?.gender || '',
          qualification: user?.qualification || '',
          department: user?.department || '',
          date_joined: user?.created_at || '',
          subjects: user?.subjects || [],
          classes: user?.classes || [],
          is_form_teacher: user?.is_form_teacher || false
        };
        
        setProfileData(fallbackProfile);
        setEditData(fallbackProfile);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!editData.first_name?.trim()) {
      errors.push('First name is required');
    }
    
    if (!editData.last_name?.trim()) {
      errors.push('Last name is required');
    }
    
    if (!editData.email?.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    if (editData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(editData.phone.replace(/\s/g, ''))) {
      errors.push('Please enter a valid phone number');
    }
    
    return errors;
  };

  const handleSaveProfile = async () => {
    const validationErrors = validateForm();
    
    if (validationErrors.length > 0) {
      showError(validationErrors.join(', '));
      return;
    }
    
    setIsLoading(true);
    
    try {
      let response;
      const updateData = { ...editData };
      
      // Clean up the data before sending
      Object.keys(updateData).forEach(key => {
        if (typeof updateData[key] === 'string') {
          updateData[key] = updateData[key].trim();
        }
        if (updateData[key] === '') {
          updateData[key] = null;
        }
      });
      
      if (user?.role === 'admin') {
        response = await API.updateAdminProfile(updateData);
      } else if (user?.role === 'teacher') {
        response = await API.updateTeacherProfile(updateData);
      } else if (user?.role === 'student') {
        response = await API.updateStudentProfile(updateData);
      }

      if (response?.data) {
        setProfileData(updateData);
        setEditData(updateData);
        setIsEditing(false);
        showSuccess('Profile updated successfully!');
        
        if (updateUser) {
          updateUser({ ...user, ...updateData });
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const validatePassword = () => {
    const errors = [];
    
    if (!passwordData.current_password) {
      errors.push('Current password is required');
    }
    
    if (!passwordData.new_password) {
      errors.push('New password is required');
    } else if (passwordData.new_password.length < 8) {
      errors.push('New password must be at least 8 characters long');
    } else if (!/(?=.*[a-z])/.test(passwordData.new_password)) {
      errors.push('New password must contain at least one lowercase letter');
    } else if (!/(?=.*[A-Z])/.test(passwordData.new_password)) {
      errors.push('New password must contain at least one uppercase letter');
    } else if (!/(?=.*\d)/.test(passwordData.new_password)) {
      errors.push('New password must contain at least one number');
    }
    
    if (!passwordData.confirm_password) {
      errors.push('Confirm password is required');
    } else if (passwordData.new_password !== passwordData.confirm_password) {
      errors.push('New password and confirm password do not match');
    }
    
    return errors;
  };

  const handleChangePassword = async () => {
    const validationErrors = validatePassword();
    
    if (validationErrors.length > 0) {
      showError(validationErrors.join(', '));
      return;
    }

    setPasswordLoading(true);
    
    try {
      let response;
      if (user?.role === 'admin') {
        response = await API.changeAdminPassword(passwordData);
      } else if (user?.role === 'teacher') {
        response = await API.changeTeacherPassword(passwordData);
      } else if (user?.role === 'student') {
        response = await API.changeStudentPassword(passwordData);
      }

      if (response?.data) {
        setPasswordData({
          current_password: '',
          new_password: '',
          confirm_password: ''
        });
        setShowPasswords({
          current: false,
          new: false,
          confirm: false
        });
        setShowPasswordForm(false);
        showSuccess('Password changed successfully!');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      showError(error.response?.data?.message || 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  const getRoleLabel = (role) => {
    const labels = {
      'admin': 'Administrator',
      'teacher': 'Teacher',
      'student': 'Student',
      'principal': 'Principal'
    };
    return labels[role] || role;
  };

  const getRoleColor = (role) => {
    const colors = {
      'admin': 'from-purple-500 to-purple-600',
      'teacher': 'from-blue-500 to-blue-600',
      'student': 'from-green-500 to-green-600',
      'principal': 'from-red-500 to-red-600'
    };
    return colors[role] || 'from-gray-500 to-gray-600';
  };

  const getFullName = () => {
    const names = [profileData.first_name, profileData.middle_name, profileData.last_name].filter(Boolean);
    return names.join(' ') || 'Loading...';
  };

  const getInitials = () => {
    const first = profileData.first_name?.[0] || '';
    const last = profileData.last_name?.[0] || '';
    return (first + last).toUpperCase();
  };

  const getYearsOfService = () => {
    if (!profileData.date_joined) return 'N/A';
    const joined = new Date(profileData.date_joined);
    const now = new Date();
    const years = now.getFullYear() - joined.getFullYear();
    return `${years}+ years`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                My Profile
              </h1>
              <p className="text-xl text-gray-600">
                Manage your personal information and account settings
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Edit className="mr-2 h-5 w-5" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Column - Profile Card */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Profile Header */}
              <div className="relative h-40 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="relative">
                    <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white ring-4 ring-blue-100">
                      <span className="text-3xl font-bold text-gray-600">
                        {getInitials()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-6 pt-24">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {getFullName()}
                  </h2>
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getRoleColor(user.role)} shadow-lg`}>
                      <Shield className="mr-2 h-4 w-4" />
                      {getRoleLabel(user.role)}
                    </span>
                    {profileData.is_form_teacher && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                        <Star className="mr-1 h-3 w-3" />
                        Form Teacher
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="text-sm text-gray-600">Email</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 truncate ml-2 max-w-32">
                      {profileData.email || 'N/A'}
                    </span>
                  </div>
                  
                  {profileData.phone && (
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-green-600 mr-3" />
                        <span className="text-sm text-gray-600">Phone</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {profileData.phone}
                      </span>
                    </div>
                  )}

                  {profileData.department && (
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-purple-600 mr-3" />
                        <span className="text-sm text-gray-600">Department</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {profileData.department}
                      </span>
                    </div>
                  )}

                  {profileData.date_joined && (
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-orange-600 mr-3" />
                        <span className="text-sm text-gray-600">Joined</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(profileData.date_joined).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Change Password
                  </button>
                  
                  {isEditing && (
                    <div className="space-y-2">
                      <button
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                        className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={handleCancelEdit}
                        className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="xl:col-span-3 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <User className="mr-3 h-6 w-6 text-blue-600" />
                  Personal Information
                </h3>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.first_name}
                        onChange={(e) => handleEditChange('first_name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        placeholder="Enter first name"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg">{profileData.first_name || 'N/A'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.last_name}
                        onChange={(e) => handleEditChange('last_name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        placeholder="Enter last name"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg">{profileData.last_name || 'N/A'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Middle Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.middle_name}
                        onChange={(e) => handleEditChange('middle_name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        placeholder="Enter middle name"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg">{profileData.middle_name || 'N/A'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Gender
                    </label>
                    {isEditing ? (
                      <select
                        value={editData.gender}
                        onChange={(e) => handleEditChange('gender', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    ) : (
                      <p className="text-gray-900 font-medium text-lg capitalize">{profileData.gender || 'N/A'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Date of Birth
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editData.date_of_birth}
                        onChange={(e) => handleEditChange('date_of_birth', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg">
                        {profileData.date_of_birth ? new Date(profileData.date_of_birth).toLocaleDateString() : 'N/A'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => handleEditChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg">{profileData.phone || 'N/A'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => handleEditChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        placeholder="Enter email address"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg">{profileData.email || 'N/A'}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Address
                    </label>
                    {isEditing ? (
                      <textarea
                        value={editData.address}
                        onChange={(e) => handleEditChange('address', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                        placeholder="Enter address"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium text-lg">{profileData.address || 'N/A'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            {(profileData.qualification || profileData.department) && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-green-50">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <GraduationCap className="mr-3 h-6 w-6 text-green-600" />
                    Academic Information
                  </h3>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {profileData.qualification && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Qualifications
                        </label>
                        {isEditing ? (
                          <textarea
                            value={editData.qualification}
                            onChange={(e) => handleEditChange('qualification', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                            placeholder="Enter qualifications"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium text-lg">{profileData.qualification}</p>
                        )}
                      </div>
                    )}

                    {profileData.department && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Department
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editData.department}
                            onChange={(e) => handleEditChange('department', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                            placeholder="Enter department"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium text-lg">{profileData.department}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Subjects and Classes Information */}
            {(profileData.subjects?.length > 0 || profileData.classes?.length > 0) && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-purple-50">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <BookOpen className="mr-3 h-6 w-6 text-purple-600" />
                    Teaching Information
                  </h3>
                </div>
                
                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {profileData.subjects?.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Subjects ({profileData.subjects.length})
                        </label>
                        <div className="space-y-2">
                          {profileData.subjects.map((subject, index) => (
                            <div key={index} className="flex items-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                              <BookOpen className="h-4 w-4 text-purple-600 mr-2" />
                              <span className="text-gray-900 font-medium">{subject.name || subject}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {profileData.classes?.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Classes ({profileData.classes.length})
                        </label>
                        <div className="space-y-2">
                          {profileData.classes.map((cls, index) => (
                            <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <School className="h-4 w-4 text-blue-600 mr-2" />
                              <span className="text-gray-900 font-medium">{cls.name || cls}</span>
                              {cls.student_count && (
                                <span className="ml-auto text-sm text-gray-500">
                                  {cls.student_count} students
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Role</p>
                    <p className="text-lg font-semibold text-gray-900">{getRoleLabel(user.role)}</p>
                  </div>
                </div>
              </div>

              {profileData.subjects?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-green-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Subjects</p>
                      <p className="text-lg font-semibold text-gray-900">{profileData.subjects.length}</p>
                    </div>
                  </div>
                </div>
              )}

              {profileData.classes?.length > 0 && (
                <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-purple-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl">
                      <School className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Classes</p>
                      <p className="text-lg font-semibold text-gray-900">{profileData.classes.length}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-orange-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center">
                  <div className="p-3 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Service</p>
                    <p className="text-lg font-semibold text-gray-900">{getYearsOfService()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Profile Information */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-indigo-50">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Shield className="mr-3 h-6 w-6 text-indigo-600" />
                  Account Information
                </h3>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      User ID
                    </label>
                    <p className="text-gray-900 font-medium text-lg">{user?.id || 'N/A'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Account Status
                    </label>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Last Login
                    </label>
                    <p className="text-gray-900 font-medium text-lg">
                      {user?.last_login ? new Date(user.last_login).toLocaleString() : 'N/A'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Member Since
                    </label>
                    <p className="text-gray-900 font-medium text-lg">
                      {profileData.date_joined ? new Date(profileData.date_joined).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-yellow-50">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Key className="mr-3 h-6 w-6 text-yellow-600" />
                  Quick Actions
                </h3>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="flex items-center justify-center p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl hover:border-yellow-300 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <div className="text-center">
                      <Key className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Change Password</h4>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <div className="text-center">
                      <Edit className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Edit Profile</h4>
                      <p className="text-sm text-gray-600">Update your personal information</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-emerald-50">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Award className="mr-3 h-6 w-6 text-emerald-600" />
                  Profile Summary
                </h3>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-2xl font-bold text-emerald-600 mb-2">
                      {profileData.first_name && profileData.last_name ? '100%' : '0%'}
                    </div>
                    <p className="text-sm text-gray-600">Profile Complete</p>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      {profileData.phone ? 'Yes' : 'No'}
                    </div>
                    <p className="text-sm text-gray-600">Phone Added</p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      {profileData.address ? 'Yes' : 'No'}
                    </div>
                    <p className="text-sm text-gray-600">Address Added</p>
                  </div>
                </div>
              </div>
            </div>

        
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative mx-auto p-8 w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-red-50">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Lock className="mr-3 h-6 w-6 text-red-600" />
                  Change Password
                </h3>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordData.current_password}
                      onChange={(e) => handlePasswordChange('current_password', e.target.value)}
                      className="w-full pr-12 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => togglePasswordVisibility('current')}
                    >
                      {showPasswords.current ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordData.new_password}
                      onChange={(e) => handlePasswordChange('new_password', e.target.value)}
                      className="w-full pr-12 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => togglePasswordVisibility('new')}
                    >
                      {showPasswords.new ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordData.confirm_password}
                      onChange={(e) => handlePasswordChange('confirm_password', e.target.value)}
                      className="w-full pr-12 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 shadow-sm"
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => togglePasswordVisibility('confirm')}
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 px-8 py-6 bg-gradient-to-r from-gray-50 to-red-50">
                <button
                  onClick={() => setShowPasswordForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  disabled={passwordLoading || !passwordData.current_password || !passwordData.new_password || !passwordData.confirm_password}
                  className="px-8 py-3 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
