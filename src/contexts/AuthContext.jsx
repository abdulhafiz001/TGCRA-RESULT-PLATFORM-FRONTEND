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
  
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userType') || null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    
    if (token && userType) {
      // Set user role based on stored type
      setUserRole(userType);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await API.post('/login', {
        username,
        password
      });
      
      const { token, user, role } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userType', role);
      
      setUser(user);
      setUserRole(role);
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const studentLogin = async (admissionNumber, password) => {
    try {
      const response = await API.post('/student/login', {
        admission_number: admissionNumber,
        password
      });
      
      const { token, student, role } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(student));
      localStorage.setItem('userType', role);
      
      setUser(student);
      setStudent(student);
      setUserRole(role);
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const teacherLogin = async (email, password) => {
    try {
      const response = await API.post('/login', {
        username: email,
        password
      });
      
      const { token, user, role } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userType', role);
      
      setUser(user);
      setUserRole(role);
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    
    setUser(null);
    setStudent(null);
    setUserRole(null);
  };

  const value = {
    user,
    student,
    userRole,
    loading,
    login,
    studentLogin,
    teacherLogin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 