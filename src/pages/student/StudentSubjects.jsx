import { useState } from 'react';
import { COLORS } from '../../constants/colors';

const StudentSubjects = () => {
  const [selectedTerm, setSelectedTerm] = useState('Second Term');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const studentInfo = {
    name: "Adebayo Sarah",
    class: "JSS 3A",
    session: "2023/2024"
  };

  const subjects = [
    {
      id: 1,
      name: 'Mathematics',
      color: 'from-blue-500 to-blue-600',
      icon: '🔢',
      description: 'Advanced algebra, geometry, and mathematical reasoning for junior secondary students.',
      progress: 85,
      grade: 'A',
      curriculum: [
        'Number Systems and Operations',
        'Algebraic Expressions',
        'Geometry and Mensuration',
        'Statistics and Probability',
        'Mathematical Reasoning'
      ],
      resources: [
        { type: 'Textbook', name: 'New General Mathematics JSS 3', status: 'Available' },
        { type: 'Workbook', name: 'Mathematics Practice Exercises', status: 'In Use' },
        { type: 'Online', name: 'Math Learning Portal', status: 'Active' }
      ]
    },
    {
      id: 2,
      name: 'English Language',
      color: 'from-green-500 to-green-600',
      icon: '📚',
      description: 'Comprehensive English language skills including literature, composition, and oral communication.',
      progress: 78,
      grade: 'B+',
      curriculum: [
        'Reading Comprehension',
        'Creative Writing',
        'Grammar and Vocabulary',
        'Literature Appreciation',
        'Oral Communication'
      ],
      resources: [
        { type: 'Textbook', name: 'Effective English JSS 3', status: 'Available' },
        { type: 'Literature', name: 'Selected African Stories', status: 'In Use' },
        { type: 'Online', name: 'English Language Lab', status: 'Active' }
      ]
    },
    {
      id: 3,
      name: 'Basic Science',
      color: 'from-purple-500 to-purple-600',
      icon: '🔬',
      description: 'Introduction to physics, chemistry, and biology concepts with hands-on laboratory experiences.',
      progress: 92,
      grade: 'A+',
      curriculum: [
        'Matter and Its Properties',
        'Energy and Motion',
        'Living Organisms',
        'Chemical Reactions',
        'Scientific Method'
      ],
      resources: [
        { type: 'Textbook', name: 'Basic Science for JSS 3', status: 'Available' },
        { type: 'Lab Manual', name: 'Science Experiments Guide', status: 'In Use' },
        { type: 'Online', name: 'Virtual Science Lab', status: 'Active' }
      ]
    },
    {
      id: 4,
      name: 'Social Studies',
      color: 'from-orange-500 to-orange-600',
      icon: '🌍',
      description: 'Study of human society, culture, history, and civic responsibility.',
      progress: 75,
      grade: 'B',
      curriculum: [
        'Nigerian History',
        'Geography and Environment',
        'Civic Education',
        'Cultural Studies',
        'Government and Politics'
      ],
      resources: [
        { type: 'Textbook', name: 'Social Studies JSS 3', status: 'Available' },
        { type: 'Atlas', name: 'Nigerian Atlas', status: 'In Use' },
        { type: 'Online', name: 'Cultural Heritage Portal', status: 'Active' }
      ]
    },
    {
      id: 5,
      name: 'Computer Studies',
      color: 'from-indigo-500 to-indigo-600',
      icon: '💻',
      description: 'Introduction to computer operations, programming basics, and digital literacy.',
      progress: 88,
      grade: 'A',
      curriculum: [
        'Computer Basics',
        'Microsoft Office Suite',
        'Internet and Email',
        'Programming Fundamentals',
        'Web Development Basics'
      ],
      resources: [
        { type: 'Textbook', name: 'Computer Studies JSS 3', status: 'Available' },
        { type: 'Software', name: 'Microsoft Office 365', status: 'Active' },
        { type: 'Online', name: 'Coding Practice Platform', status: 'Active' }
      ]
    },
    {
      id: 6,
      name: 'French Language',
      color: 'from-pink-500 to-pink-600',
      icon: '🇫🇷',
      description: 'French language learning including vocabulary, grammar, and cultural appreciation.',
      progress: 68,
      grade: 'C+',
      curriculum: [
        'Basic Vocabulary',
        'Grammar Fundamentals',
        'Conversational French',
        'French Culture',
        'Reading and Writing'
      ],
      resources: [
        { type: 'Textbook', name: 'Français pour Débutants', status: 'Available' },
        { type: 'Audio', name: 'French Pronunciation Guide', status: 'In Use' },
        { type: 'Online', name: 'French Learning App', status: 'Active' }
      ]
    }
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'text-green-800 bg-green-100 border-green-200';
      case 'A': return 'text-green-700 bg-green-50 border-green-200';
      case 'B+': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'B': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'C+': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'C': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted': return 'text-blue-700 bg-blue-100';
      case 'Graded': return 'text-green-700 bg-green-100';
      case 'Pending': return 'text-orange-700 bg-orange-100';
      case 'Available': return 'text-green-700 bg-green-100';
      case 'In Use': return 'text-blue-700 bg-blue-100';
      case 'Active': return 'text-purple-700 bg-purple-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const averageProgress = Math.round(subjects.reduce((sum, subject) => sum + subject.progress, 0) / subjects.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Subjects</h1>
              <p className="mt-1 text-lg text-gray-600">
                Academic curriculum and course management
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>First Term</option>
                <option>Second Term</option>
                <option>Third Term</option>
              </select>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Student Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                {studentInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="font-semibold text-gray-900">{studentInfo.name}</h3>
              <p className="text-sm text-gray-600">{studentInfo.class}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{subjects.length}</div>
              <p className="text-sm text-gray-600 mt-1">Total Subjects</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{averageProgress}%</div>
              <p className="text-sm text-gray-600 mt-1">Average Progress</p>
            </div>
          </div>
        </div>

        {/* Subjects Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {subjects.map((subject) => (
              <div key={subject.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className={`h-24 sm:h-32 bg-gradient-to-r ${subject.color} rounded-t-xl p-4 sm:p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 text-2xl sm:text-4xl opacity-20">{subject.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 pr-8">{subject.name}</h3>
                  <span className={`absolute bottom-2 left-2 sm:bottom-4 sm:left-6 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium border ${getGradeColor(subject.grade)} bg-white`}>
                    Grade: {subject.grade}
                  </span>
                </div>
                
                <div className="p-4 sm:p-6">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${subject.color} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-0">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${subject.color} rounded-lg flex items-center justify-center text-white text-lg sm:text-2xl flex-shrink-0`}>
                        {subject.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{subject.name}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2 sm:line-clamp-1">{subject.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:block sm:text-right">
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium border ${getGradeColor(subject.grade)}`}>
                        {subject.grade}
                      </span>
                      <div className="sm:mt-2">
                        <div className="flex items-center space-x-3 sm:justify-end">
                          <span className="text-sm text-gray-600 sm:hidden">Progress:</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`bg-gradient-to-r ${subject.color} h-2 rounded-full transition-all duration-500`}
                                style={{ width: `${subject.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 w-10 text-right">{subject.progress}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Active Courses</h3>
                <p className="text-2xl font-bold text-blue-600">{subjects.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Completed</h3>
                <p className="text-2xl font-bold text-green-600">{averageProgress}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Average Progress</h3>
                <p className="text-2xl font-bold text-orange-600">{averageProgress}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSubjects; 