import { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  BookOpen, 
  GraduationCap,
  ChevronDown,
  ChevronUp,
  UserPlus,
  Download,
  Filter
} from 'lucide-react';
import { COLORS } from '../../constants/colors';

const Classes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClasses, setExpandedClasses] = useState({});
  const [selectedLevel, setSelectedLevel] = useState('all');

  // Comprehensive class structure from Primary 1 to SS3
  const allClasses = useMemo(() => [
    // Primary Classes
    { 
      id: 'primary1', 
      name: 'Primary 1', 
      level: 'primary',
      classTeacher: 'Mrs. Adebayo',
      studentCount: 28,
      students: [
        { id: 101, name: 'Kemi Adeyemi', admissionNumber: 'PRI/2024/001', age: 6 },
        { id: 102, name: 'Tolu Bakare', admissionNumber: 'PRI/2024/002', age: 6 },
        { id: 103, name: 'Emeka Okafor', admissionNumber: 'PRI/2024/003', age: 7 },
        { id: 104, name: 'Fatima Hassan', admissionNumber: 'PRI/2024/004', age: 6 },
        { id: 105, name: 'Samuel Ogun', admissionNumber: 'PRI/2024/005', age: 7 },
      ]
    },
    { 
      id: 'primary2', 
      name: 'Primary 2', 
      level: 'primary',
      classTeacher: 'Mr. Chukwu',
      studentCount: 30,
      students: [
        { id: 201, name: 'Blessing Okoro', admissionNumber: 'PRI/2024/021', age: 7 },
        { id: 202, name: 'Daniel Yusuf', admissionNumber: 'PRI/2024/022', age: 8 },
        { id: 203, name: 'Grace Nwosu', admissionNumber: 'PRI/2024/023', age: 7 },
        { id: 204, name: 'Ibrahim Musa', admissionNumber: 'PRI/2024/024', age: 8 },
      ]
    },
    { 
      id: 'primary3', 
      name: 'Primary 3', 
      level: 'primary',
      classTeacher: 'Mrs. Okafor',
      studentCount: 32,
      students: [
        { id: 301, name: 'Chioma Eze', admissionNumber: 'PRI/2024/041', age: 8 },
        { id: 302, name: 'Yusuf Abdullahi', admissionNumber: 'PRI/2024/042', age: 9 },
        { id: 303, name: 'Adunni Shola', admissionNumber: 'PRI/2024/043', age: 8 },
      ]
    },
    { 
      id: 'primary4', 
      name: 'Primary 4', 
      level: 'primary',
      classTeacher: 'Mr. Aminu',
      studentCount: 29,
      students: [
        { id: 401, name: 'Victor Okoro', admissionNumber: 'PRI/2024/061', age: 9 },
        { id: 402, name: 'Amina Garba', admissionNumber: 'PRI/2024/062', age: 10 },
        { id: 403, name: 'Peter Nnamdi', admissionNumber: 'PRI/2024/063', age: 9 },
      ]
    },
    { 
      id: 'primary5', 
      name: 'Primary 5', 
      level: 'primary',
      classTeacher: 'Mrs. Bello',
      studentCount: 31,
      students: [
        { id: 501, name: 'Sandra Igwe', admissionNumber: 'PRI/2024/081', age: 10 },
        { id: 502, name: 'Usman Danjuma', admissionNumber: 'PRI/2024/082', age: 11 },
        { id: 503, name: 'Joy Adaora', admissionNumber: 'PRI/2024/083', age: 10 },
      ]
    },
    { 
      id: 'primary6', 
      name: 'Primary 6', 
      level: 'primary',
      classTeacher: 'Mr. Olumide',
      studentCount: 27,
      students: [
        { id: 601, name: 'Chinedu Okwu', admissionNumber: 'PRI/2024/101', age: 11 },
        { id: 602, name: 'Hauwa Muhammed', admissionNumber: 'PRI/2024/102', age: 12 },
        { id: 603, name: 'Tunde Adebayo', admissionNumber: 'PRI/2024/103', age: 11 },
      ]
    },
    
    // Junior Secondary Classes
    { 
      id: 'jss1a', 
      name: 'JSS 1A', 
      level: 'junior',
      classTeacher: 'Mrs. Egbuna',
      studentCount: 35,
      students: [
        { id: 1, name: 'John Doe', admissionNumber: 'ADM/2024/001', age: 12 },
        { id: 2, name: 'Jane Smith', admissionNumber: 'ADM/2024/002', age: 13 },
        { id: 3, name: 'Michael Johnson', admissionNumber: 'ADM/2024/003', age: 12 },
        { id: 4, name: 'Sarah Wilson', admissionNumber: 'ADM/2024/004', age: 13 },
        { id: 5, name: 'David Brown', admissionNumber: 'ADM/2024/005', age: 12 },
      ]
    },
    { 
      id: 'jss1b', 
      name: 'JSS 1B', 
      level: 'junior',
      classTeacher: 'Mr. Okonkwo',
      studentCount: 32,
      students: [
        { id: 21, name: 'Alex Thompson', admissionNumber: 'ADM/2024/021', age: 12 },
        { id: 22, name: 'Sophia Rodriguez', admissionNumber: 'ADM/2024/022', age: 13 },
        { id: 23, name: 'James Wilson', admissionNumber: 'ADM/2024/023', age: 12 },
        { id: 24, name: 'Olivia Garcia', admissionNumber: 'ADM/2024/024', age: 13 },
      ]
    },
    { 
      id: 'jss2a', 
      name: 'JSS 2A', 
      level: 'junior',
      classTeacher: 'Mrs. Uche',
      studentCount: 38,
      students: [
        { id: 41, name: 'Ethan Martinez', admissionNumber: 'ADM/2024/041', age: 13 },
        { id: 42, name: 'Ava Anderson', admissionNumber: 'ADM/2024/042', age: 14 },
        { id: 43, name: 'Noah Davis', admissionNumber: 'ADM/2024/043', age: 13 },
        { id: 44, name: 'Emma Williams', admissionNumber: 'ADM/2024/044', age: 14 },
      ]
    },
    { 
      id: 'jss2b', 
      name: 'JSS 2B', 
      level: 'junior',
      classTeacher: 'Mr. Aliyu',
      studentCount: 30,
      students: [
        { id: 61, name: 'Liam Johnson', admissionNumber: 'ADM/2024/061', age: 13 },
        { id: 62, name: 'Isabella Brown', admissionNumber: 'ADM/2024/062', age: 14 },
        { id: 63, name: 'Mason Jones', admissionNumber: 'ADM/2024/063', age: 13 },
      ]
    },
    { 
      id: 'jss3a', 
      name: 'JSS 3A', 
      level: 'junior',
      classTeacher: 'Mrs. Adamu',
      studentCount: 28,
      students: [
        { id: 81, name: 'William Garcia', admissionNumber: 'ADM/2024/081', age: 14 },
        { id: 82, name: 'Charlotte Miller', admissionNumber: 'ADM/2024/082', age: 15 },
        { id: 83, name: 'Benjamin Wilson', admissionNumber: 'ADM/2024/083', age: 14 },
      ]
    },
    { 
      id: 'jss3b', 
      name: 'JSS 3B', 
      level: 'junior',
      classTeacher: 'Mr. Yakubu',
      studentCount: 31,
      students: [
        { id: 101, name: 'Lucas Moore', admissionNumber: 'ADM/2024/101', age: 14 },
        { id: 102, name: 'Harper Taylor', admissionNumber: 'ADM/2024/102', age: 15 },
        { id: 103, name: 'Henry Anderson', admissionNumber: 'ADM/2024/103', age: 14 },
      ]
    },

    // Senior Secondary Classes
    { 
      id: 'ss1a', 
      name: 'SS 1A (Science)', 
      level: 'senior',
      classTeacher: 'Dr. Babatunde',
      studentCount: 29,
      students: [
        { id: 121, name: 'Alexander Thomas', admissionNumber: 'ADM/2024/121', age: 15 },
        { id: 122, name: 'Amelia Jackson', admissionNumber: 'ADM/2024/122', age: 16 },
        { id: 123, name: 'Sebastian White', admissionNumber: 'ADM/2024/123', age: 15 },
      ]
    },
    { 
      id: 'ss1b', 
      name: 'SS 1B (Arts)', 
      level: 'senior',
      classTeacher: 'Mrs. Ekanem',
      studentCount: 26,
      students: [
        { id: 141, name: 'Madison Harris', admissionNumber: 'ADM/2024/141', age: 15 },
        { id: 142, name: 'Jackson Martin', admissionNumber: 'ADM/2024/142', age: 16 },
        { id: 143, name: 'Aria Thompson', admissionNumber: 'ADM/2024/143', age: 15 },
      ]
    },
    { 
      id: 'ss2a', 
      name: 'SS 2A (Science)', 
      level: 'senior',
      classTeacher: 'Mr. Oduya',
      studentCount: 24,
      students: [
        { id: 161, name: 'Grayson Garcia', admissionNumber: 'ADM/2024/161', age: 16 },
        { id: 162, name: 'Chloe Martinez', admissionNumber: 'ADM/2024/162', age: 17 },
        { id: 163, name: 'Elijah Robinson', admissionNumber: 'ADM/2024/163', age: 16 },
      ]
    },
    { 
      id: 'ss2b', 
      name: 'SS 2B (Commercial)', 
      level: 'senior',
      classTeacher: 'Mrs. Ibrahim',
      studentCount: 22,
      students: [
        { id: 181, name: 'Layla Clark', admissionNumber: 'ADM/2024/181', age: 16 },
        { id: 182, name: 'Owen Rodriguez', admissionNumber: 'ADM/2024/182', age: 17 },
        { id: 183, name: 'Zoe Lewis', admissionNumber: 'ADM/2024/183', age: 16 },
      ]
    },
    { 
      id: 'ss3a', 
      name: 'SS 3A (Science)', 
      level: 'senior',
      classTeacher: 'Dr. Okoro',
      studentCount: 20,
      students: [
        { id: 201, name: 'Carter Lee', admissionNumber: 'ADM/2024/201', age: 17 },
        { id: 202, name: 'Penelope Walker', admissionNumber: 'ADM/2024/202', age: 18 },
        { id: 203, name: 'Wyatt Hall', admissionNumber: 'ADM/2024/203', age: 17 },
      ]
    },
    { 
      id: 'ss3b', 
      name: 'SS 3B (Arts)', 
      level: 'senior',
      classTeacher: 'Mrs. Ojo',
      studentCount: 18,
      students: [
        { id: 221, name: 'Luna Allen', admissionNumber: 'ADM/2024/221', age: 17 },
        { id: 222, name: 'Julian Young', admissionNumber: 'ADM/2024/222', age: 18 },
        { id: 223, name: 'Violet King', admissionNumber: 'ADM/2024/223', age: 17 },
      ]
    }
  ], []);

  // Filter classes based on search and level
  const filteredClasses = useMemo(() => {
    let filtered = allClasses;

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(cls => cls.level === selectedLevel);
    }

    if (searchTerm) {
      filtered = filtered.filter(cls => 
        cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.classTeacher.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [allClasses, selectedLevel, searchTerm]);

  const toggleClass = (classId) => {
    setExpandedClasses(prev => ({
      ...prev,
      [classId]: !prev[classId]
    }));
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'primary': return 'bg-green-100 text-green-800';
      case 'junior': return 'bg-blue-100 text-blue-800';
      case 'senior': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalStudents = allClasses.reduce((sum, cls) => sum + cls.studentCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Classes Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage all classes from Primary 1 to SS 3 and their students.
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm hover:shadow-lg transition-all"
            style={{ backgroundColor: COLORS.primary.red }}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Class
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Classes</dt>
                  <dd className="text-lg font-medium text-gray-900">{allClasses.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

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
                  <GraduationCap className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Primary Classes</dt>
                  <dd className="text-lg font-medium text-gray-900">6</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-purple-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Secondary Classes</dt>
                  <dd className="text-lg font-medium text-gray-900">10</dd>
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
                placeholder="Search classes or teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ '--tw-ring-color': COLORS.primary.red }}
              />
            </div>
          </div>
          <div className="flex space-x-3">
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
          </div>
        </div>
      </div>

      {/* Classes List */}
      <div className="space-y-4">
        {filteredClasses.map((classItem) => (
          <div key={classItem.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div 
              className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleClass(classItem.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{classItem.name}</h3>
                    <p className="text-sm text-gray-600">Class Teacher: {classItem.classTeacher}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(classItem.level)}`}>
                    {classItem.level.charAt(0).toUpperCase() + classItem.level.slice(1)}
                  </span>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-900">{classItem.studentCount}</div>
                    <div className="text-sm text-gray-500">Students</div>
                  </div>
                  {expandedClasses[classItem.id] ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded Student List */}
            {expandedClasses[classItem.id] && (
              <div className="border-t border-gray-200 bg-gray-50 p-6">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Students in {classItem.name}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classItem.students.map((student) => (
                    <div key={student.id} className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-gray-900">{student.name}</h5>
                          <p className="text-xs text-gray-500">{student.admissionNumber}</p>
                          <p className="text-xs text-gray-500">Age: {student.age}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {classItem.students.length < classItem.studentCount && (
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 flex items-center justify-center">
                      <span className="text-sm text-gray-500">
                        +{classItem.studentCount - classItem.students.length} more students
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
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
  );
};

export default Classes; 