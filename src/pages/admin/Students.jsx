import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  BookOpen,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  UserPlus,
  Download,
  Upload,
  FileText
} from 'lucide-react';
import { COLORS } from '../../constants/colors';
import API from '../../services/API';
import { useNotification } from '../../contexts/NotificationContext';
import { useAuth } from '../../contexts/AuthContext';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

const Students = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();
  const { userRole } = useAuth();
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [showFilters, setShowFilters] = useState(false);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, student: null });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  // Update class counts when students change
  useEffect(() => {
    if (students.length > 0 && classes.length > 0) {
      updateClassCounts();
    }
  }, [students]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      // Use appropriate API endpoint based on user role
      const response = userRole === 'teacher'
        ? await API.getTeacherStudents()
        : await API.getStudents();
      setStudents(response.data || []);
    } catch (error) {
      showError('Failed to load students');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      // Use appropriate API endpoint based on user role
      const response = userRole === 'teacher'
        ? await API.getTeacherClasses()
        : await API.getClasses();
      const classData = response.data || response || [];
      // Store raw class data first, counts will be updated later
      const allClasses = [
        { id: 'all', name: 'All Classes', count: 0, color: 'bg-gray-100 text-gray-800' },
        ...classData.map(cls => ({
          id: cls.id,
          name: cls.name,
          count: 0, // Will be updated when students are loaded
          color: getClassColor(cls.name)
        }))
      ];
      setClasses(allClasses);
    } catch (error) {
      showError('Failed to load classes');
      console.error('Error fetching classes:', error);
    }
  };

  const updateClassCounts = () => {
    setClasses(prevClasses =>
      prevClasses.map(cls => ({
        ...cls,
        count: cls.id === 'all'
          ? students.length
          : students.filter(s => s.class_id?.toString() === cls.id.toString()).length
      }))
    );
  };

  const getClassColor = (className) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-yellow-100 text-yellow-800',
      'bg-purple-100 text-purple-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800',
      'bg-pink-100 text-pink-800',
      'bg-orange-100 text-orange-800'
    ];
    const index = className.length % colors.length;
    return colors[index];
  };

  // Filter students based on selected class and search term
  const filteredStudents = useMemo(() => {
    if (!Array.isArray(students)) return [];

    return students.filter(student => {
      const matchesClass = selectedClass === 'all' || student.class_id?.toString() === selectedClass;
      const matchesSearch = student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.admission_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesClass && matchesSearch;
    });
  }, [selectedClass, searchTerm, students]);

  const handleDeleteStudent = useCallback(async () => {
    if (!deleteModal.student) return;

    setSubmitting(true);
    try {
      await API.deleteStudent(deleteModal.student.id);
      showSuccess('Student deleted successfully');
      setDeleteModal({ isOpen: false, student: null });
      fetchStudents(); // Refresh the list
    } catch (error) {
      showError('Failed to delete student');
      console.error('Error deleting student:', error);
    } finally {
      setSubmitting(false);
    }
  }, [deleteModal.student, showSuccess, showError]);

  const openDeleteModal = useCallback((student) => {
    setDeleteModal({ isOpen: true, student });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModal({ isOpen: false, student: null });
  }, []);

  const handleViewStudent = useCallback((student) => {
    navigate(`/admin/students/${student.id}/results`);
  }, [navigate]);

  const getClassColorForStudent = useCallback((className) => {
    const classItem = classes.find(c => c.name === className);
    return classItem ? classItem.color : 'bg-gray-100 text-gray-800';
  }, [classes]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: COLORS.primary.red }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Students Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and view all students in the school system.
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <button 
            onClick={() => navigate('/admin/add-student')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm hover:shadow-lg transition-all"
            style={{ backgroundColor: COLORS.primary.red }}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </button>
        </div>
      </div>

      {/* Statistics Cards - Compact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-lg font-semibold text-gray-900">{students.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-lg font-semibold text-gray-900">{students.filter(s => s.is_active).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <GraduationCap className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Classes</p>
              <p className="text-lg font-semibold text-gray-900">{classes.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <BookOpen className="w-5 h-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Filtered</p>
              <p className="text-lg font-semibold text-gray-900">{filteredStudents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Class Filter Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6 overflow-x-auto">
            {classes.map((classItem) => (
              <button
                key={classItem.id}
                onClick={() => setSelectedClass(classItem.id)}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                  ${selectedClass === classItem.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
                style={selectedClass === classItem.id ? { borderColor: COLORS.primary.red, color: COLORS.primary.red } : {}}
              >
                <Users className="mr-2 h-5 w-5" />
                {classItem.name}
                <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs ${classItem.color}`}>
                  {classItem.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students by name, admission number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': COLORS.primary.red }}
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </button>
              <div className="flex border border-gray-300 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm font-medium ${
                    viewMode === 'grid' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 text-sm font-medium ${
                    viewMode === 'table' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:border-transparent">
                  <option value="">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:border-transparent">
                  <option value="">All Subjects</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="english">English</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                </select>
                <input
                  type="date"
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                  placeholder="Date of Birth"
                />
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Students Content */}
        <div className="p-6">
          {viewMode === 'grid' ? (
            /* Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <div 
                  key={`student-${student.id}`} 
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleViewStudent(student)}
                >
                  <div className="p-6">
                    {/* Student Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          {student.avatar ? (
                            <img src={student.avatar} alt={`${student.first_name} ${student.last_name}`} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <Users className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {student.first_name} {student.last_name}
                          </h3>
                          <p className="text-sm text-gray-500">{student.admission_number}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1 flex-shrink-0">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewStudent(student);
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <FileText className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(student);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete student"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Student Info */}
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getClassColorForStudent(student.school_class?.name)}`}>
                          {student.school_class?.name || 'No Class'}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="mr-2 h-4 w-4" />
                        {student.email || 'No email'}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="mr-2 h-4 w-4" />
                        {student.phone || 'No phone'}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="mr-2 h-4 w-4" />
                        {student.date_of_birth || 'No DOB'}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="mr-2 h-4 w-4" />
                        {student.address || 'No address'}
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Subjects ({student.student_subjects?.length || 0})
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {student.student_subjects?.slice(0, 3).map((subject) => (
                          <span
                            key={subject.id}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700"
                          >
                            {subject.subject?.name}
                          </span>
                        ))}
                        {student.student_subjects?.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-600">
                            +{student.student_subjects.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table View */
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Class
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subjects
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr 
                      key={`student-row-${student.id}`} 
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => handleViewStudent(student)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            {student.avatar ? (
                              <img src={student.avatar} alt={`${student.first_name} ${student.last_name}`} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <Users className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {student.first_name} {student.last_name}
                            </div>
                            <div className="text-sm text-gray-500">{student.admission_number}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getClassColorForStudent(student.school_class?.name)}`}>
                          {student.school_class?.name || 'No Class'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.email || 'No email'}</div>
                        <div className="text-sm text-gray-500">{student.phone || 'No phone'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {student.student_subjects?.slice(0, 2).map((subject, index) => (
                            <span
                              key={`${student.id}-subject-${index}`}
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700"
                            >
                              {subject.subject?.name}
                            </span>
                          ))}
                          {student.student_subjects?.length > 2 && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-600">
                              +{student.student_subjects.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewStudent(student);
                            }}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            <FileText className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={(e) => e.stopPropagation()}
                            className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteModal(student);
                            }}
                            className="text-red-600 hover:text-red-900 transition-colors"
                            title="Delete student"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteStudent}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone and will remove all associated data including scores and records."
        itemName={deleteModal.student ? `${deleteModal.student.first_name} ${deleteModal.student.last_name}` : ''}
        isLoading={submitting}
      />
    </div>
  );
};

export default Students; 