import { useState } from 'react';
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
  Upload
} from 'lucide-react';
import { COLORS } from '../../constants/colors';

const Students = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - in real app this would come from API
  const classes = [
    { id: 'all', name: 'All Classes', count: 245, color: 'bg-gray-100 text-gray-800' },
    { id: 'jss1a', name: 'JSS 1A', count: 35, color: 'bg-blue-100 text-blue-800' },
    { id: 'jss1b', name: 'JSS 1B', count: 32, color: 'bg-blue-100 text-blue-800' },
    { id: 'jss2a', name: 'JSS 2A', count: 38, color: 'bg-green-100 text-green-800' },
    { id: 'jss2b', name: 'JSS 2B', count: 30, color: 'bg-green-100 text-green-800' },
    { id: 'jss3a', name: 'JSS 3A', count: 28, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'jss3b', name: 'JSS 3B', count: 31, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'ss1a', name: 'SS 1A', count: 29, color: 'bg-purple-100 text-purple-800' },
    { id: 'ss1b', name: 'SS 1B', count: 26, color: 'bg-purple-100 text-purple-800' },
    { id: 'ss2a', name: 'SS 2A', count: 24, color: 'bg-red-100 text-red-800' },
    { id: 'ss2b', name: 'SS 2B', count: 22, color: 'bg-red-100 text-red-800' },
    { id: 'ss3a', name: 'SS 3A', count: 20, color: 'bg-indigo-100 text-indigo-800' },
    { id: 'ss3b', name: 'SS 3B', count: 18, color: 'bg-indigo-100 text-indigo-800' },
  ];

  const students = [
    {
      id: 1,
      name: 'John Doe',
      admissionNumber: 'ADM/2024/001',
      class: 'JSS 1A',
      email: 'john.doe@student.com',
      phone: '+234 801 234 5678',
      dateOfBirth: '2008-05-15',
      gender: 'Male',
      address: '123 Main Street, Lagos',
      parentName: 'Mr. Doe',
      parentPhone: '+234 802 345 6789',
      parentEmail: 'parent.doe@email.com',
      subjects: ['Mathematics', 'English', 'Physics', 'Chemistry'],
      avatar: null,
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      admissionNumber: 'ADM/2024/002',
      class: 'JSS 1A',
      email: 'jane.smith@student.com',
      phone: '+234 803 456 7890',
      dateOfBirth: '2008-08-22',
      gender: 'Female',
      address: '456 Oak Avenue, Abuja',
      parentName: 'Mrs. Smith',
      parentPhone: '+234 804 567 8901',
      parentEmail: 'parent.smith@email.com',
      subjects: ['Mathematics', 'English', 'Biology', 'Geography'],
      avatar: null,
      status: 'active'
    },
    {
      id: 3,
      name: 'Michael Johnson',
      admissionNumber: 'ADM/2024/003',
      class: 'JSS 2A',
      email: 'michael.johnson@student.com',
      phone: '+234 805 678 9012',
      dateOfBirth: '2007-03-10',
      gender: 'Male',
      address: '789 Pine Road, Port Harcourt',
      parentName: 'Mr. Johnson',
      parentPhone: '+234 806 789 0123',
      parentEmail: 'parent.johnson@email.com',
      subjects: ['Mathematics', 'English', 'Physics', 'Computer Science'],
      avatar: null,
      status: 'active'
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      admissionNumber: 'ADM/2024/004',
      class: 'JSS 2A',
      email: 'sarah.wilson@student.com',
      phone: '+234 807 890 1234',
      dateOfBirth: '2007-11-05',
      gender: 'Female',
      address: '321 Elm Street, Kano',
      parentName: 'Mrs. Wilson',
      parentPhone: '+234 808 901 2345',
      parentEmail: 'parent.wilson@email.com',
      subjects: ['Mathematics', 'English', 'Chemistry', 'Biology'],
      avatar: null,
      status: 'active'
    },
    {
      id: 5,
      name: 'David Brown',
      admissionNumber: 'ADM/2024/005',
      class: 'SS 1A',
      email: 'david.brown@student.com',
      phone: '+234 809 012 3456',
      dateOfBirth: '2006-07-18',
      gender: 'Male',
      address: '654 Maple Drive, Ibadan',
      parentName: 'Mr. Brown',
      parentPhone: '+234 810 123 4567',
      parentEmail: 'parent.brown@email.com',
      subjects: ['Mathematics', 'English', 'Physics', 'Economics'],
      avatar: null,
      status: 'active'
    },
    {
      id: 6,
      name: 'Emily Davis',
      admissionNumber: 'ADM/2024/006',
      class: 'SS 1A',
      email: 'emily.davis@student.com',
      phone: '+234 811 234 5678',
      dateOfBirth: '2006-12-03',
      gender: 'Female',
      address: '987 Cedar Lane, Enugu',
      parentName: 'Mrs. Davis',
      parentPhone: '+234 812 345 6789',
      parentEmail: 'parent.davis@email.com',
      subjects: ['Mathematics', 'English', 'Literature', 'History'],
      avatar: null,
      status: 'active'
    },
    {
      id: 7,
      name: 'Alex Thompson',
      admissionNumber: 'ADM/2024/007',
      class: 'JSS 1B',
      email: 'alex.thompson@student.com',
      phone: '+234 813 456 7890',
      dateOfBirth: '2008-02-14',
      gender: 'Male',
      address: '555 Oak Street, Kaduna',
      parentName: 'Mr. Thompson',
      parentPhone: '+234 814 567 8901',
      parentEmail: 'parent.thompson@email.com',
      subjects: ['Mathematics', 'English', 'Geography', 'History'],
      avatar: null,
      status: 'active'
    },
    {
      id: 8,
      name: 'Sophia Rodriguez',
      admissionNumber: 'ADM/2024/008',
      class: 'JSS 1B',
      email: 'sophia.rodriguez@student.com',
      phone: '+234 815 678 9012',
      dateOfBirth: '2008-09-30',
      gender: 'Female',
      address: '777 Pine Avenue, Jos',
      parentName: 'Mrs. Rodriguez',
      parentPhone: '+234 816 789 0123',
      parentEmail: 'parent.rodriguez@email.com',
      subjects: ['Mathematics', 'English', 'Biology', 'Agricultural Science'],
      avatar: null,
      status: 'active'
    },
    {
      id: 9,
      name: 'James Wilson',
      admissionNumber: 'ADM/2024/009',
      class: 'JSS 2B',
      email: 'james.wilson@student.com',
      phone: '+234 817 890 1234',
      dateOfBirth: '2007-06-12',
      gender: 'Male',
      address: '888 Cedar Road, Sokoto',
      parentName: 'Mr. Wilson',
      parentPhone: '+234 818 901 2345',
      parentEmail: 'parent.wilson2@email.com',
      subjects: ['Mathematics', 'English', 'Physics', 'Computer Science'],
      avatar: null,
      status: 'active'
    },
    {
      id: 10,
      name: 'Olivia Garcia',
      admissionNumber: 'ADM/2024/010',
      class: 'JSS 2B',
      email: 'olivia.garcia@student.com',
      phone: '+234 819 012 3456',
      dateOfBirth: '2007-01-25',
      gender: 'Female',
      address: '999 Elm Drive, Maiduguri',
      parentName: 'Mrs. Garcia',
      parentPhone: '+234 820 123 4567',
      parentEmail: 'parent.garcia@email.com',
      subjects: ['Mathematics', 'English', 'Chemistry', 'Literature'],
      avatar: null,
      status: 'active'
    },
    {
      id: 11,
      name: 'Ethan Martinez',
      admissionNumber: 'ADM/2024/011',
      class: 'JSS 3A',
      email: 'ethan.martinez@student.com',
      phone: '+234 821 234 5678',
      dateOfBirth: '2006-04-08',
      gender: 'Male',
      address: '111 Maple Lane, Calabar',
      parentName: 'Mr. Martinez',
      parentPhone: '+234 822 345 6789',
      parentEmail: 'parent.martinez@email.com',
      subjects: ['Mathematics', 'English', 'Physics', 'Economics'],
      avatar: null,
      status: 'active'
    },
    {
      id: 12,
      name: 'Ava Anderson',
      admissionNumber: 'ADM/2024/012',
      class: 'JSS 3A',
      email: 'ava.anderson@student.com',
      phone: '+234 823 456 7890',
      dateOfBirth: '2006-11-17',
      gender: 'Female',
      address: '222 Oak Road, Uyo',
      parentName: 'Mrs. Anderson',
      parentPhone: '+234 824 567 8901',
      parentEmail: 'parent.anderson@email.com',
      subjects: ['Mathematics', 'English', 'Biology', 'Government'],
      avatar: null,
      status: 'active'
    }
  ];

  // Filter students based on selected class and search term
  const filteredStudents = students.filter(student => {
    const matchesClass = selectedClass === 'all' || student.class.toLowerCase().replace(/\s+/g, '') === selectedClass;
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleDeleteStudent = (studentId) => {
    // In real app, this would make an API call
    console.log('Delete student:', studentId);
  };

  const getClassColor = (className) => {
    const classItem = classes.find(c => c.name === className);
    return classItem ? classItem.color : 'bg-gray-100 text-gray-800';
  };

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
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white shadow-sm hover:shadow-lg transition-all"
            style={{ backgroundColor: COLORS.primary.red }}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                  <dd className="text-lg font-medium text-gray-900">{students.length}</dd>
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
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Students</dt>
                  <dd className="text-lg font-medium text-gray-900">{students.filter(s => s.status === 'active').length}</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Classes</dt>
                  <dd className="text-lg font-medium text-gray-900">{classes.length - 1}</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Subjects</dt>
                  <dd className="text-lg font-medium text-gray-900">13</dd>
                </dl>
              </div>
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
                <div key={student.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-6">
                    {/* Student Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          {student.avatar ? (
                            <img src={student.avatar} alt={student.name} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <Users className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
                          <p className="text-sm text-gray-500">{student.admissionNumber}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteStudent(student.id)}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Student Info */}
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getClassColor(student.class)}`}>
                          {student.class}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="mr-2 h-4 w-4" />
                        {student.email}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="mr-2 h-4 w-4" />
                        {student.phone}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="mr-2 h-4 w-4" />
                        {student.dateOfBirth}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="mr-2 h-4 w-4" />
                        {student.address}
                      </div>
                    </div>

                    {/* Subjects */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Subjects ({student.subjects.length})
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {student.subjects.slice(0, 3).map((subject) => (
                          <span
                            key={subject}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700"
                          >
                            {subject}
                          </span>
                        ))}
                        {student.subjects.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-600">
                            +{student.subjects.length - 3} more
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
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            {student.avatar ? (
                              <img src={student.avatar} alt={student.name} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <Users className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.admissionNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getClassColor(student.class)}`}>
                          {student.class}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.email}</div>
                        <div className="text-sm text-gray-500">{student.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {student.subjects.slice(0, 2).map((subject) => (
                            <span
                              key={subject}
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700"
                            >
                              {subject}
                            </span>
                          ))}
                          {student.subjects.length > 2 && (
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-50 text-gray-600">
                              +{student.subjects.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-indigo-600 hover:text-indigo-900">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteStudent(student.id)}
                            className="text-red-600 hover:text-red-900"
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
    </div>
  );
};

export default Students; 