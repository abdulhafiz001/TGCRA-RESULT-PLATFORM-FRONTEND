import { useState, useCallback, useMemo, useEffect } from 'react';
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
import API from '../../services/API';
import { useNotification } from '../../contexts/NotificationContext';

const ManageScores = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [scores, setScores] = useState({
    firstCA: '',
    secondCA: '',
    exam: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [teacherAssignments, setTeacherAssignments] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentScores, setStudentScores] = useState({});
  const [loading, setLoading] = useState(true);
  const { showError, showSuccess } = useNotification();

  // Get teacher's assigned classes and subjects
  useEffect(() => {
    fetchTeacherAssignments();
  }, []);

  const fetchTeacherAssignments = async () => {
    try {
      const response = await API.getMyAssignments();
      const assignments = response.data || response;

      setTeacherAssignments(assignments);

      // Extract unique classes and subjects
      const classesMap = new Map();
      const subjectsMap = new Map();

      assignments.forEach(assignment => {
        const classObj = assignment.schoolClass || assignment.school_class;
        const subjectObj = assignment.subject;

        if (classObj) {
          classesMap.set(classObj.id, {
            id: classObj.id,
            name: classObj.name
          });
        }

        if (subjectObj) {
          subjectsMap.set(subjectObj.id, {
            id: subjectObj.id,
            name: subjectObj.name
          });
        }
      });

      setAvailableClasses(Array.from(classesMap.values()));
      setAvailableSubjects(Array.from(subjectsMap.values()));

    } catch (error) {
      showError(error.message || 'Failed to load assignments');
      console.error('Error fetching teacher assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch students when both class and subject are selected
  useEffect(() => {
    if (selectedClass && selectedSubject) {
      fetchClassStudents();
    } else {
      setStudents([]);
    }
  }, [selectedClass, selectedSubject]);

  const fetchClassStudents = async () => {
    try {
      // Verify this teacher is assigned to this class-subject combination
      const isValidAssignment = teacherAssignments.some(assignment =>
        assignment.class_id == selectedClass && assignment.subject_id == selectedSubject
      );

      if (!isValidAssignment) {
        showError('You are not assigned to teach this subject in this class');
        return;
      }

      const studentsData = await API.getTeacherStudents({
        class_id: selectedClass,
        subject_id: selectedSubject
      });

      console.log('Students API response:', studentsData);

      // Handle paginated response - the actual students are in data.data for paginated responses
      let studentsList = [];
      if (studentsData.data && Array.isArray(studentsData.data.data)) {
        // Paginated response
        studentsList = studentsData.data.data;
      } else if (studentsData.data && Array.isArray(studentsData.data)) {
        // Direct array response
        studentsList = studentsData.data;
      } else if (Array.isArray(studentsData)) {
        // Direct array response
        studentsList = studentsData;
      }

      console.log('Processed students list:', studentsList);
      setStudents(studentsList);

      // Load scores for all students
      if (studentsList.length > 0 && currentSubject?.id) {
        loadStudentScores(studentsList);
      }
    } catch (error) {
      showError(error.message || 'Failed to load students');
    }
  };

  // Load scores for all students to show progress
  const loadStudentScores = async (studentsList) => {
    try {
      const scoresMap = {};

      // Load scores for each student
      const scorePromises = studentsList.map(async (student) => {
        try {
          const scoresResponse = await API.getStudentScores(student.id, {
            subject_id: currentSubject.id,
            term: 'First Term',
            academic_year: '2024/2025'
          });

          const scores = scoresResponse.data || scoresResponse || [];
          if (scores.length > 0) {
            const latestScore = scores[0];
            scoresMap[student.id] = {
              first_ca: latestScore.first_ca || 0,
              second_ca: latestScore.second_ca || 0,
              exam: latestScore.exam || 0,
              total: (latestScore.first_ca || 0) + (latestScore.second_ca || 0) + (latestScore.exam || 0)
            };
          }
        } catch (error) {
          console.error(`Error loading scores for student ${student.id}:`, error);
        }
      });

      await Promise.all(scorePromises);
      setStudentScores(scoresMap);
    } catch (error) {
      console.error('Error loading student scores:', error);
    }
  };



  // Get current subject info
  const currentSubject = useMemo(() => {
    if (!selectedSubject || !availableSubjects.length) return null;
    return availableSubjects.find(s => s.id == selectedSubject) || null;
  }, [availableSubjects, selectedSubject]);

  // Get current class info
  const currentClass = useMemo(() => {
    if (!selectedClass || !availableClasses.length) return null;
    return availableClasses.find(c => c.id == selectedClass) || null;
  }, [availableClasses, selectedClass]);

  // Filter students based on selected class and subject
  const filteredStudents = useMemo(() => {
    // Must have both class and subject selected
    if (!selectedClass || !selectedSubject) return [];

    // Ensure students is an array
    if (!Array.isArray(students)) return [];

    // Apply search filter if search term exists
    if (!searchTerm) return students;

    return students.filter(student =>
      `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.admission_number?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedClass, selectedSubject, searchTerm, students]);

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

  const handleStudentClick = useCallback(async (student) => {
    setSelectedStudent(student);

    // Load existing scores from backend
    if (currentSubject?.id) {
      try {
        const scoresResponse = await API.getStudentScores(student.id, {
          subject_id: currentSubject.id,
          term: 'First Term', // This should be configurable
          academic_year: '2024/2025' // This should be configurable
        });

        const existingScores = scoresResponse.data || scoresResponse || [];
        console.log('Existing scores for student:', existingScores);

        if (existingScores.length > 0) {
          const latestScore = existingScores[0]; // Get the most recent score
          setScores({
            firstCA: latestScore.first_ca?.toString() || '',
            secondCA: latestScore.second_ca?.toString() || '',
            exam: latestScore.exam?.toString() || ''
          });
        } else {
          setScores({ firstCA: '', secondCA: '', exam: '' });
        }
      } catch (error) {
        console.error('Error loading student scores:', error);
        setScores({ firstCA: '', secondCA: '', exam: '' });
      }
    } else {
      setScores({ firstCA: '', secondCA: '', exam: '' });
    }
  }, [currentSubject?.id]);

  const handleSaveScores = useCallback(async () => {
    if (!selectedStudent || !currentSubject || !selectedClass) return;

    setIsSaving(true);

    try {
      const scoreData = {
        student_id: selectedStudent.id,
        subject_id: currentSubject.id,
        class_id: selectedClass,
        first_ca: parseFloat(scores.firstCA) || 0,
        second_ca: parseFloat(scores.secondCA) || 0,
        exam: parseFloat(scores.exam) || 0,
        term: 'First Term', // This should be configurable
        academic_year: '2024/2025' // This should be configurable
      };

      await API.createScore(scoreData);

      showSuccess('Scores saved successfully!');
      setSelectedStudent(null);
      setScores({ firstCA: '', secondCA: '', exam: '' });

      // Refresh students data and scores
      fetchClassStudents();
    } catch (error) {
      showError(error.message || 'Failed to save scores');
    } finally {
      setIsSaving(false);
    }
  }, [selectedStudent, currentSubject, selectedClass, scores]);

  const getStudentCurrentScore = useCallback((student, subjectId) => {
    // This would need to be implemented based on the actual score data structure
    // For now, return null as we need to fetch scores separately
    return null;
  }, []);

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
            Manage Student Scores
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Enter and manage continuous assessment and examination scores for your assigned classes.
          </p>
        </div>
      </div>

      {/* Class and Subject Selection */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Select Class and Subject</h3>
          {currentClass && currentSubject && (
            <div className="flex space-x-2">
              <div className="bg-blue-50 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-blue-800">
                  Class: {currentClass.name}
                </span>
              </div>
              <div className="bg-green-50 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-green-800">
                  Subject: {currentSubject.name}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSubject(''); // Reset subject when class changes
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': COLORS.primary.red }}
            >
              <option value="">Choose a class...</option>
              {availableClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={!selectedClass}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              style={{ '--tw-ring-color': COLORS.primary.red }}
            >
              <option value="">Choose a subject...</option>
              {selectedClass && availableSubjects
                .filter(subject =>
                  teacherAssignments.some(assignment =>
                    assignment.class_id == selectedClass && assignment.subject_id == subject.id
                  )
                )
                .map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* No assignments message */}
      {!loading && teacherAssignments.length === 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
              <BookOpen className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No Assignments Found</h3>
            <p className="mt-1 text-sm text-gray-500">
              You don't have any class and subject assignments. Please contact the administrator to assign you to classes and subjects.
            </p>
          </div>
        </div>
      )}

      {/* No class selected message */}
      {!loading && teacherAssignments.length > 0 && (!selectedClass || !selectedSubject) && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Select Class and Subject</h3>
            <p className="mt-1 text-sm text-gray-500">
              Please select both a class and subject from the dropdowns above to view and manage student scores.
            </p>
          </div>
        </div>
      )}

      {/* Students List */}
      {selectedClass && selectedSubject && currentClass && currentSubject && (
        <div className="bg-white shadow rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">
                Students in {currentClass.name} - {currentSubject.name}
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
              {Array.isArray(filteredStudents) && filteredStudents.map((student) => {
                const studentScore = studentScores[student.id];
                const hasScores = studentScore && (studentScore.first_ca > 0 || studentScore.second_ca > 0 || studentScore.exam > 0);

                return (
                  <div
                    key={student.id}
                    className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                      hasScores ? 'border-green-200 bg-green-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleStudentClick(student)}
                  >
                                          <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {student.avatar ? (
                            <img src={student.avatar} alt={`${student.first_name} ${student.last_name}`} className="w-full h-full rounded-full object-cover" />
                          ) : (
                            <Users className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{`${student.first_name} ${student.last_name}`}</h4>
                          <p className="text-xs text-gray-500">{student.admission_number}</p>
                        </div>
                        {hasScores && (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>

                    {hasScores ? (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-gray-500">Progress</span>
                          <span className="text-xs font-medium text-green-700">{studentScore.total}/100</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center">
                            <div className="text-gray-500">1st CA</div>
                            <div className="font-medium text-green-700">{studentScore.first_ca}/20</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-500">2nd CA</div>
                            <div className="font-medium text-green-700">{studentScore.second_ca}/20</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-500">Exam</div>
                            <div className="font-medium text-green-700">{studentScore.exam}/60</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Calculator className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">No scores entered</p>
                        <p className="text-xs text-blue-600 mt-1">Click to add scores</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {(!Array.isArray(filteredStudents) || filteredStudents.length === 0) && (
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
                  <h3 className="text-lg font-semibold text-gray-900">{`${selectedStudent.first_name} ${selectedStudent.last_name}`}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedStudent.admission_number} • {currentSubject?.name}
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