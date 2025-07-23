import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  BookOpen, 
  FileText,
  TrendingUp,
  Award,
  Filter,
  Eye,
  Download,
  Calendar,
  ArrowLeft
} from 'lucide-react';
import { COLORS } from '../../constants/colors';

const Results = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedTerm, setSelectedTerm] = useState('current');
  const [selectedClass, setSelectedClass] = useState(null);

  // All classes with student results data
  const allClassesWithResults = useMemo(() => [
    // Primary Classes
    { 
      id: 'primary1', 
      name: 'Primary 1', 
      level: 'primary',
      classTeacher: 'Mrs. Adebayo',
      students: [
        { 
          id: 101, 
          name: 'Kemi Adeyemi', 
          admissionNumber: 'PRI/2024/001',
          average: 85.4,
          position: 1,
          grade: 'A',
          status: 'published'
        },
        { 
          id: 102, 
          name: 'Tolu Bakare', 
          admissionNumber: 'PRI/2024/002',
          average: 78.2,
          position: 5,
          grade: 'B',
          status: 'published'
        },
        { 
          id: 103, 
          name: 'Emeka Okafor', 
          admissionNumber: 'PRI/2024/003',
          average: 92.1,
          position: 1,
          grade: 'A',
          status: 'published'
        },
        { 
          id: 104, 
          name: 'Fatima Hassan', 
          admissionNumber: 'PRI/2024/004',
          average: 0,
          position: 0,
          grade: '',
          status: 'pending'
        },
      ]
    },
    { 
      id: 'primary2', 
      name: 'Primary 2', 
      level: 'primary',
      classTeacher: 'Mr. Chukwu',
      students: [
        { 
          id: 201, 
          name: 'Blessing Okoro', 
          admissionNumber: 'PRI/2024/021',
          average: 88.7,
          position: 2,
          grade: 'A',
          status: 'published'
        },
        { 
          id: 202, 
          name: 'Daniel Yusuf', 
          admissionNumber: 'PRI/2024/022',
          average: 74.5,
          position: 8,
          grade: 'B',
          status: 'published'
        },
      ]
    },
    { 
      id: 'primary3', 
      name: 'Primary 3', 
      level: 'primary',
      classTeacher: 'Mrs. Okafor',
      students: [
        { 
          id: 301, 
          name: 'Chioma Eze', 
          admissionNumber: 'PRI/2024/041',
          average: 91.3,
          position: 1,
          grade: 'A',
          status: 'published'
        },
      ]
    },

    // Junior Secondary Classes
    { 
      id: 'jss1a', 
      name: 'JSS 1A', 
      level: 'junior',
      classTeacher: 'Mrs. Egbuna',
      students: [
        { 
          id: 1, 
          name: 'John Doe', 
          admissionNumber: 'ADM/2024/001',
          average: 89.0,
          position: 3,
          grade: 'B2',
          status: 'published'
        },
        { 
          id: 2, 
          name: 'Jane Smith', 
          admissionNumber: 'ADM/2024/002',
          average: 82.0,
          position: 8,
          grade: 'B2',
          status: 'published'
        },
        { 
          id: 3, 
          name: 'Michael Johnson', 
          admissionNumber: 'ADM/2024/003',
          average: 95.0,
          position: 1,
          grade: 'A1',
          status: 'published'
        },
        { 
          id: 4, 
          name: 'Sarah Wilson', 
          admissionNumber: 'ADM/2024/004',
          average: 71.0,
          position: 15,
          grade: 'B3',
          status: 'published'
        },
        { 
          id: 5, 
          name: 'David Brown', 
          admissionNumber: 'ADM/2024/005',
          average: 0,
          position: 0,
          grade: '',
          status: 'pending'
        },
      ]
    },
    { 
      id: 'jss1b', 
      name: 'JSS 1B', 
      level: 'junior',
      classTeacher: 'Mr. Okonkwo',
      students: [
        { 
          id: 21, 
          name: 'Alex Thompson', 
          admissionNumber: 'ADM/2024/021',
          average: 60.0,
          position: 20,
          grade: 'C4',
          status: 'published'
        },
        { 
          id: 22, 
          name: 'Sophia Rodriguez', 
          admissionNumber: 'ADM/2024/022',
          average: 0,
          position: 0,
          grade: '',
          status: 'pending'
        },
      ]
    },
    { 
      id: 'jss2a', 
      name: 'JSS 2A', 
      level: 'junior',
      classTeacher: 'Mrs. Uche',
      students: [
        { 
          id: 41, 
          name: 'Ethan Martinez', 
          admissionNumber: 'ADM/2024/041',
          average: 87.5,
          position: 4,
          grade: 'B2',
          status: 'published'
        },
        { 
          id: 42, 
          name: 'Ava Anderson', 
          admissionNumber: 'ADM/2024/042',
          average: 93.2,
          position: 1,
          grade: 'A1',
          status: 'published'
        },
      ]
    },

    // Senior Secondary Classes
    { 
      id: 'ss1a', 
      name: 'SS 1A (Science)', 
      level: 'senior',
      classTeacher: 'Dr. Babatunde',
      students: [
        { 
          id: 121, 
          name: 'Alexander Thomas', 
          admissionNumber: 'ADM/2024/121',
          average: 88.5,
          position: 3,
          grade: 'B2',
          status: 'published'
        },
        { 
          id: 122, 
          name: 'Amelia Jackson', 
          admissionNumber: 'ADM/2024/122',
          average: 95.7,
          position: 1,
          grade: 'A1',
          status: 'published'
        },
      ]
    },
    { 
      id: 'ss2a', 
      name: 'SS 2A (Science)', 
      level: 'senior',
      classTeacher: 'Mr. Oduya',
      students: [
        { 
          id: 161, 
          name: 'Grayson Garcia', 
          admissionNumber: 'ADM/2024/161',
          average: 91.8,
          position: 2,
          grade: 'A1',
          status: 'published'
        },
      ]
    },
    { 
      id: 'ss3a', 
      name: 'SS 3A (Science)', 
      level: 'senior',
      classTeacher: 'Dr. Okoro',
      students: [
        { 
          id: 201, 
          name: 'Carter Lee', 
          admissionNumber: 'ADM/2024/201',
          average: 89.4,
          position: 3,
          grade: 'B2',
          status: 'published'
        },
        { 
          id: 202, 
          name: 'Penelope Walker', 
          admissionNumber: 'ADM/2024/202',
          average: 97.2,
          position: 1,
          grade: 'A1',
          status: 'published'
        },
      ]
    }
  ], []);

  // Filter classes based on search and level
  const filteredClasses = useMemo(() => {
    let filtered = allClassesWithResults;

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(cls => cls.level === selectedLevel);
    }

    if (searchTerm && !selectedClass) {
      filtered = filtered.filter(cls => 
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [allClassesWithResults, selectedLevel, searchTerm, selectedClass]);

  // Filter students in selected class
  const filteredStudents = useMemo(() => {
    if (!selectedClass) return [];
    
    let students = selectedClass.students;
    
    if (searchTerm) {
      students = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return students;
  }, [selectedClass, searchTerm]);

  const handleViewStudentResults = (studentId) => {
    navigate(`/admin/students/${studentId}/results`);
  };

  const handleSelectClass = (classItem) => {
    setSelectedClass(classItem);
    setSearchTerm(''); // Clear search when selecting class
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setSearchTerm('');
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'primary': return 'bg-green-100 text-green-800';
      case 'junior': return 'bg-blue-100 text-blue-800';
      case 'senior': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A')) return 'bg-green-100 text-green-800';
    if (grade.includes('B')) return 'bg-blue-100 text-blue-800';
    if (grade.includes('C')) return 'bg-yellow-100 text-yellow-800';
    if (grade.includes('D') || grade.includes('E')) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusColor = (status) => {
    return status === 'published' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  // Calculate statistics
  const totalStudents = allClassesWithResults.reduce((sum, cls) => sum + cls.students.length, 0);
  const publishedResults = allClassesWithResults.reduce((sum, cls) => 
    sum + cls.students.filter(s => s.status === 'published').length, 0
  );
  const pendingResults = totalStudents - publishedResults;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Results Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View and manage student results across all classes from Primary 1 to SS 3.
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="mr-2 h-4 w-4" />
            Export All Results
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm hover:shadow-lg transition-all"
            style={{ backgroundColor: COLORS.primary.red }}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Reports
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                  <dd className="text-lg font-medium text-gray-900">{totalStudents}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Published Results</dt>
                  <dd className="text-lg font-medium text-gray-900">{publishedResults}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-yellow-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending Results</dt>
                  <dd className="text-lg font-medium text-gray-900">{pendingResults}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Completion Rate</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {Math.round((publishedResults / totalStudents) * 100)}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={selectedClass ? "Search students..." : "Search classes or teachers..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.primary.red }}
              />
            </div>
          </div>
          <div className="flex space-x-3">
            {!selectedClass && (
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.primary.red }}
              >
                <option value="all">All Levels</option>
                <option value="primary">Primary Classes</option>
                <option value="junior">Junior Secondary</option>
                <option value="senior">Senior Secondary</option>
              </select>
            )}
            <select 
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': COLORS.primary.red }}
            >
              <option value="current">Current Term</option>
              <option value="first">First Term</option>
              <option value="second">Second Term</option>
              <option value="third">Third Term</option>
            </select>
          </div>
        </div>
      </div>

      {/* Class Selection or Student List */}
      {!selectedClass ? (
        /* Class Selection View */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map((classItem) => (
              <div 
                key={classItem.id} 
                className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleSelectClass(classItem)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
                        <p className="text-sm text-gray-600">{classItem.classTeacher}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(classItem.level)}`}>
                      {classItem.level.charAt(0).toUpperCase() + classItem.level.slice(1)}
                    </span>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">{classItem.students.length}</div>
                      <div className="text-sm text-gray-500">Students</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Published:</span>
                      <span className="font-medium text-green-600">
                        {classItem.students.filter(s => s.status === 'published').length}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-500">Pending:</span>
                      <span className="font-medium text-yellow-600">
                        {classItem.students.filter(s => s.status === 'pending').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredClasses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No classes found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Student List View for Selected Class */
        <div className="space-y-6">
          {/* Back Button and Class Header */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBackToClasses}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Classes
                </button>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedClass.name}</h3>
                    <p className="text-sm text-gray-600">Class Teacher: {selectedClass.classTeacher}</p>
                  </div>
                </div>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(selectedClass.level)}`}>
                {selectedClass.level.charAt(0).toUpperCase() + selectedClass.level.slice(1)}
              </span>
            </div>
          </div>

          {/* Students Results Table */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h4 className="text-lg font-medium text-gray-900">
                Students in {selectedClass.name} ({filteredStudents.length})
              </h4>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Average
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr 
                      key={student.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewStudentResults(student.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <Users className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.admissionNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {student.status === 'published' ? `${student.average}%` : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {student.status === 'published' && student.position > 0 ? `${student.position}` : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.grade ? (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeColor(student.grade)}`}>
                            {student.grade}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                          {student.status === 'published' ? 'Published' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewStudentResults(student.id);
                          }}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          disabled={student.status === 'pending'}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search criteria.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Results; 