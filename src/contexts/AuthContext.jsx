import { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/API';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem('user');
      return null;
    }
  });
  
  const [student, setStudent] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error('Error parsing student from localStorage:', error);
      localStorage.removeItem('user');
      return null;
    }
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        if (parsedUser.role === 'student') {
          setStudent(parsedUser);
        }
        
        // If user is a teacher, refresh their form teacher status
        if (parsedUser.role === 'teacher') {
          refreshUserData();
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await API.login(username, password);
      
      const { token, user, role } = response.data;
      
      // Check if teacher is a form teacher
      if (user.role === 'teacher') {
        try {
          const formTeacherResponse = await API.checkFormTeacherStatus();
          user.is_form_teacher = formTeacherResponse.data?.is_form_teacher || false;
          console.log('Form teacher status set during login:', user.is_form_teacher);
        } catch (error) {
          console.error('Error checking form teacher status during login:', error);
          user.is_form_teacher = false;
        }
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setUser(user);
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const studentLogin = async (admissionNumber, password) => {
    try {
      const response = await API.studentLogin(admissionNumber, password);
      
      const { token, student, role } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(student));
      
      setUser(student);
      setStudent(student);
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setUser(null);
    setStudent(null);
  };

  const refreshFormTeacherStatus = async () => {
    if (user?.role === 'teacher') {
      try {
        const response = await API.checkFormTeacherStatus();
        const formTeacherStatus = response.data?.is_form_teacher || false;
        const updatedUser = { ...user, is_form_teacher: formTeacherStatus };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        console.log('Form teacher status updated:', formTeacherStatus);
        return formTeacherStatus;
      } catch (error) {
        console.error('Error refreshing form teacher status:', error);
        return false;
      }
    }
    return false;
  };

  const refreshUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('❌ No token found, cannot refresh user data');
        return false;
      }
      
      console.log('🔄 Refreshing user data...');
      console.log('🔄 Current user before refresh:', user);
      
      // Get current user data from backend
      const response = await API.getCurrentUser();
      console.log('🔄 Raw API response:', response);
      console.log('🔄 Response data:', response.data);
      console.log('🔄 Response data.user:', response.data?.user);
      
      const updatedUser = response.data?.user || response.data;
      console.log('🔄 Extracted updated user:', updatedUser);
      console.log('🔄 Updated user is_form_teacher:', updatedUser?.is_form_teacher);
      console.log('🔄 Updated user role:', updatedUser?.role);
      
      // Update localStorage and state
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      console.log('✅ User data refreshed from backend:', updatedUser);
      console.log('✅ User state updated, new user:', updatedUser);
      return updatedUser; // Return the updated user object
    } catch (error) {
      console.error('❌ Error refreshing user data:', error);
      return false;
    }
  };

  const getCurrentUserWithFreshStatus = async () => {
    console.log('🔍 getCurrentUserWithFreshStatus called');
    console.log('🔍 Current user:', user);
    console.log('🔍 User role:', user?.role);
    console.log('🔍 Current user is_form_teacher:', user?.is_form_teacher);
    
    if (user?.role === 'teacher') {
      try {
        console.log('🔍 User is a teacher, refreshing data...');
        const updatedUser = await refreshUserData();
        console.log('🔍 Updated user returned:', updatedUser);
        console.log('🔍 Updated user is_form_teacher:', updatedUser?.is_form_teacher);
        return updatedUser;
      } catch (error) {
        console.error('❌ Error getting fresh user status:', error);
        return user; // Return current user if refresh fails
      }
    }
    
    console.log('🔍 User is not a teacher, returning current user:', user);
    return user;
  };

  const value = {
    user,
    student,
    loading,
    login,
    studentLogin,
    logout,
    refreshFormTeacherStatus,
    refreshUserData,
    getCurrentUserWithFreshStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 