import { useState, useCallback, useMemo } from 'react';
import { 
  Users, 
  Search, 
  BookOpen, 
  Calculator,
  Save,
  X,
  Award,
  TrendingUp,
  FileText
} from 'lucide-react';
import { COLORS } from '../../constants/colors';

const ManageScores = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [scores, setScores] = useState({
    firstCA: '',
    secondCA: '',
    exam: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  
  // Teacher's assigned subject (would come from authentication/API)
  const teacherSubject = useMemo(() => ({
    id: 'mathematics',
    name: 'Mathematics'
  }), []);

  // Mock data - classes assigned to the teacher
  const assignedClasses = useMemo(() => [
    { id: 'jss1a', name: 'JSS 1A', studentCount: 35 },
    { id: 'jss2a', name: 'JSS 2A', studentCount: 38 },
    { id: 'ss1a', name: 'SS 1A', studentCount: 29 },
  ], []);



  // Mock students data
  const students = useMemo(() => [
    {
      id: 1,
      name: 'John Doe',
      admissionNumber: 'ADM/2024/001',
      class: 'JSS 1A',
      avatar: null,
      currentScores: {
        mathematics: { firstCA: 18, secondCA: 16, exam: 55, total: 89, grade: 'B2' },
        english: { firstCA: 15, secondCA: 17, exam: 48, total: 80, grade: 'B2' }
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      admissionNumber: 'ADM/2024/002',
      class: 'JSS 1A',
      avatar: null,
      currentScores: {
        mathematics: { firstCA: 16, secondCA: 14, exam: 52, total: 82, grade: 'B2' }
      }
    },
    {
      id: 3,
      name: 'Michael Johnson',
      admissionNumber: 'ADM/2024/003',
      class: 'JSS 2A',
      avatar: null,
      currentScores: {
        mathematics: { firstCA: 19, secondCA: 18, exam: 58, total: 95, grade: 'A1' }
      }
    },
    {
      id: 4,
      name: 'Sarah Wilson',
      admissionNumber: 'ADM/2024/004',
      class: 'JSS 2A',
      avatar: null,
      currentScores: {
        mathematics: { firstCA: 14, secondCA: 15, exam: 42, total: 71, grade: 'B3' }
      }
    },
    {
      id: 5,
      name: 'David Brown',
      admissionNumber: 'ADM/2024/005',
      class: 'SS 1A',
      avatar: null,
      currentScores: {
        mathematics: { firstCA: 17, secondCA: 16, exam: 50, total: 83, grade: 'B2' }
      }
    },
    {
      id: 6,
      name: 'Emily Davis',
      admissionNumber: 'ADM/2024/006',
      class: 'JSS 1A',
      avatar: null,
      currentScores: {}
    },
    {
      id: 7,
      name: 'Alex Thompson',
      admissionNumber: 'ADM/2024/007',
      class: 'JSS 1A',
      avatar: null,
      currentScores: {
        mathematics: { firstCA: 12, secondCA: 13, exam: 35, total: 60, grade: 'C4' }
      }
    },
    {
      id: 8,
      name: 'Sophia Rodriguez',
      admissionNumber: 'ADM/2024/008',
      class: 'JSS 2A',
      avatar: null,
      currentScores: {}
    },
  ], []);

  // Filter students based on selected class
  const filteredStudents = useMemo(() => {
    if (!selectedClass) return [];
    
    const classStudents = students.filter(student => 
      student.class.toLowerCase().replace(/\s+/g, '') === selectedClass
    );

    if (!searchTerm) return classStudents;

    return classStudents.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedClass, searchTerm, students]);

  // Calculate grade and remark based on total score
  const calculateGradeAndRemark = useCallback((total) => {
    if (total >= 90) return { grade: 'A1', remark: 'Excellent' };
    if (total >= 80) return { grade: 'B2', remark: 'Very Good' };
    if (total >= 70) return { grade: 'B3', remark: 'Good' };
    if (total >= 60) return { grade: 'C4', remark: 'Credit' };
    if (total >= 50) return { grade: 'C5', remark: 'Credit' };
    if (total >= 45) return { grade: 'C6', remark: 'Credit' };
    if (total >= 40) return { grade: 'D7', remark: 'Pass' };
    if (total >= 35) return { grade: 'E8', remark: 'Pass' };
    return { grade: 'F9', remark: 'Fail' };
  }, []);

  // Calculate total, grade, and remark
  const calculatedResults = useMemo(() => {
    const firstCA = parseFloat(scores.firstCA) || 0;
    const secondCA = parseFloat(scores.secondCA) || 0;
    const exam = parseFloat(scores.exam) || 0;
    
    // Validate scores
    if (firstCA > 20 || secondCA > 20 || exam > 60) {
      return { total: 0, grade: '', remark: '', error: 'Invalid scores' };
    }
    
    const total = firstCA + secondCA + exam;
    const { grade, remark } = calculateGradeAndRemark(total);
    
    return { total, grade, remark, error: null };
  }, [scores, calculateGradeAndRemark]);

  const handleScoreChange = useCallback((field, value) => {
    setScores(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleStudentClick = useCallback((student) => {
    setSelectedStudent(student);
    
    // Load existing scores if any
    const existingScores = student.currentScores[teacherSubject.id];
    if (existingScores) {
      setScores({
        firstCA: existingScores.firstCA.toString(),
        secondCA: existingScores.secondCA.toString(),
        exam: existingScores.exam.toString()
      });
    } else {
      setScores({ firstCA: '', secondCA: '', exam: '' });
    }
  }, [teacherSubject.id]);

  const handleSaveScores = useCallback(async () => {
    if (!selectedStudent) return;
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Saving scores:', {
        studentId: selectedStudent.id,
        subject: teacherSubject.id,
        scores: {
          ...scores,
          ...calculatedResults
        }
      });
      
      setIsSaving(false);
      setSelectedStudent(null);
      setScores({ firstCA: '', secondCA: '', exam: '' });
      
      // Show success message (you can implement toast notifications)
      alert('Scores saved successfully!');
    }, 1500);
  }, [selectedStudent, teacherSubject.id, scores, calculatedResults]);

  const getStudentCurrentScore = useCallback((student, subject) => {
    return student.currentScores[subject];
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
            Manage Student Scores
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Enter and manage continuous assessment and examination scores for your assigned classes.
          </p>
        </div>
      </div>

      {/* Class Selection and Subject Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Manage Scores</h3>
          <div className="bg-blue-50 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-blue-800">Subject: {teacherSubject.name}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': COLORS.primary.red }}
            >
              <option value="">Select a class</option>
              {assignedClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} ({cls.studentCount} students)
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students List */}
      {selectedClass && (
        <div className="bg-white shadow rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Students in {assignedClasses.find(c => c.id === selectedClass)?.name} - {teacherSubject.name}
              </h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                    style={{ '--tw-ring-color': COLORS.primary.red }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((student) => {
                const currentScore = getStudentCurrentScore(student, teacherSubject.id);
                return (
                  <div
                    key={student.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleStudentClick(student)}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        {student.avatar ? (
                          <img src={student.avatar} alt={student.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <Users className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{student.name}</h4>
                        <p className="text-xs text-gray-500">{student.admissionNumber}</p>
                      </div>
                    </div>
                    
                    {currentScore ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">1st CA:</span>
                          <span className="font-medium">{currentScore.firstCA}/20</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">2nd CA:</span>
                          <span className="font-medium">{currentScore.secondCA}/20</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Exam:</span>
                          <span className="font-medium">{currentScore.exam}/60</span>
                        </div>
                        <div className="flex justify-between text-xs pt-2 border-t">
                          <span className="text-gray-500">Total:</span>
                          <span className="font-bold">{currentScore.total}/100</span>
                        </div>
                        <div className="flex justify-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            currentScore.grade.includes('A') ? 'bg-green-100 text-green-800' :
                            currentScore.grade.includes('B') ? 'bg-blue-100 text-blue-800' :
                            currentScore.grade.includes('C') ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {currentScore.grade}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Calculator className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">No scores entered</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No students found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Please select a class to view students.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Score Entry Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedStudent.admissionNumber} • {teacherSubject.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Score Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    1st Continuous Assessment (Max: 20)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={scores.firstCA}
                    onChange={(e) => handleScoreChange('firstCA', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter score (0-20)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    2nd Continuous Assessment (Max: 20)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={scores.secondCA}
                    onChange={(e) => handleScoreChange('secondCA', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter score (0-20)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Examination Score (Max: 60)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={scores.exam}
                    onChange={(e) => handleScoreChange('exam', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter score (0-60)"
                  />
                </div>
              </div>

              {/* Calculated Results */}
              {(scores.firstCA || scores.secondCA || scores.exam) && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Calculated Results</h4>
                  
                  {calculatedResults.error ? (
                    <div className="text-red-600 text-sm font-medium">{calculatedResults.error}</div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Total Score:</span>
                        <div className="font-bold text-lg text-gray-900">{calculatedResults.total}/100</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Grade:</span>
                        <div className={`font-bold text-lg ${
                          calculatedResults.grade.includes('A') ? 'text-green-600' :
                          calculatedResults.grade.includes('B') ? 'text-blue-600' :
                          calculatedResults.grade.includes('C') ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {calculatedResults.grade}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <span className="text-gray-500">Remark:</span>
                        <div className="font-medium text-gray-900">{calculatedResults.remark}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleSaveScores}
                disabled={isSaving || calculatedResults.error || (!scores.firstCA && !scores.secondCA && !scores.exam)}
                className="flex-1 inline-flex items-center justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: COLORS.primary.red }}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? 'Saving...' : 'Save Scores'}
              </button>
              <button
                onClick={() => setSelectedStudent(null)}
                className="flex-1 inline-flex items-center justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScores; 